import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable, Subscription, timer } from 'rxjs';

import { AlphabetService } from './core/services/alphabet.service';
import { AnswersService } from './core/services/answers.service';
import { GameOverModalComponent } from './game-over-modal/game-over-modal.component';

import { environment } from 'src/environments/environment';
import { LetterStatusEnum } from './core/enum/letter-status.enum';
import { IAnswersDataRequest } from './core/models/answers-data-request.model';
import { ILetter } from './core/models/letter.model';
import { IWord } from './core/models/word.model';
import { IGameOverModalData } from './core/models/game-over-modal-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  LetterStatusEnum = LetterStatusEnum;
  title = 'Hangman';
  word: string;
  words: IWord[];
  letters: ILetter[];
  imgSrc: string;
  gameTime: number;
  loading: boolean;

  private _stage: number = 1;
  private _maxStage: number = 5;
  chances: number = 6;

  private wordCatched: string;
  private wordsCatched: IWord[];
  private lettersCatched: ILetter[];
  private imgNr: number = 1;
  private timerSubscrition: Subscription;
  private preCatchImgsSub: Subscription;

  get maxStage(): number {
    return this._maxStage;
  }
  get stage(): number {
    return this._stage;
  }
  set stage(value: number) {
    this._stage = value;
  }

  constructor(
    private _answersService: AnswersService,
    private _alphabetService: AlphabetService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.preCatchImgs();
    this.newGame();
  }

  private newGame(): void {
    this.stage = 1;
    this.chances = 6;
    this.imgNr = 1;
    this.updateImgSrc();
    this.getAlphabet();
    this.getAnswers();

    if (this.timerSubscrition) {
      this.timerSubscrition.unsubscribe();
    }
    this.timerSubscrition = timer(1000, 1000).subscribe((sec) => {
      this.gameTime = sec;
    });
  }

  private preCatchImgs() {
    this.loading = true;
    const arrObs = [];
    for (let i = 1; i < 8; i++) {
      const obs = new Observable((subscriber) => {
        const img = new Image();
        img.src = `${environment.API_URL}assets/img/hangman_${i}k.png`;
        img.onerror = () => {
          subscriber.next();
          subscriber.complete();
        };
        img.onload = () => {
          subscriber.next();
          subscriber.complete();
        };
      });
      arrObs.push(obs);
    }

    const observalbe = forkJoin(arrObs);
    this.preCatchImgsSub = observalbe.subscribe(
      () => {},
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  private getAnswers(): void {
    if (!this.words) {
      this.loading = true;
      this._answersService.getAll().subscribe(
        (answersDataRequest: IAnswersDataRequest) => {
          if (answersDataRequest) {
            this.wordsCatched = JSON.parse(JSON.stringify(answersDataRequest.words));
            this.setGameWords();
          }
        },
        (error) => {
          this.loading = false;
          if (error.message) {
            this._snackBar.open(error.message, null, {
              duration: 4000,
              horizontalPosition: 'right'
            });
          }
        }
      );
    } else {
      this.setGameWords();
    }
  }

  private getAlphabet(): void {
    if (!this.letters) {
      this.letters = this._alphabetService.getAllLetters();
      this.lettersCatched = JSON.parse(JSON.stringify(this.letters));
    } else {
      this.letters = JSON.parse(JSON.stringify(this.lettersCatched));
    }
  }

  private setGameWords(): void {
    this.words = this._answersService.getRandomFiveWords(this.wordsCatched);
    this.setGameWord();
  }

  private setGameWord(): void {
    this.word = this.words[this.stage - 1].value;
    this.word = this.hideCharacters(this.word);
  }

  private hideCharacters(word: string): string {
    this.wordCatched = word;
    return word.replace(/./g, '-');
  }

  public onLetterSelected(letter: ILetter) {
    this.letters = this._alphabetService.changeLetterStatus(this.letters, letter, this.wordCatched);
    this.word = this.updateWord(letter.value, this.word);
    this.checkIfPlayerWon();
  }

  private updateWord(letter: string, word: string): string {
    let newWord = word;
    const wordCatched = this.wordCatched.toUpperCase();

    if (wordCatched.indexOf(letter) > -1) {
      for (let i = 0; i < word.length; i++) {
        if (wordCatched.charAt(i) === letter) {
          newWord = newWord.substring(0, i) + letter + newWord.substring(i + 1);
        }
      }
    } else {
      this.checkIfPlayerLost();
    }
    return newWord;
  }

  private checkIfPlayerLost(): void {
    if (this.chances > 0) {
      this.imgNr++;
      this.chances--;
      this.updateImgSrc();
      if (this.chances === 0) {
        this.timerSubscrition.unsubscribe();
        const modalData = {
          title: 'PRZEGRANA',
          msg: `Chesz spróbować jeszcze raz?`,
          imgSrc: `${environment.API_URL}assets/gif/lose.gif`
        };
        this.gameOver(modalData);
      }
    }
  }

  private checkIfPlayerWon(): void {
    if (this.word.indexOf('-') < 0) {
      if (this.stage < this.maxStage) {
        this.imgNr = 1;
        this.chances = 6;
        this.stage++;
        this.updateImgSrc();
        this.setGameWord();
        this.getAlphabet();
      } else {
        this.timerSubscrition.unsubscribe();
        const modalData = {
          title: 'WYGRANA!',
          msg: `Gratulacje! Twój czas: ${this.getTime()}`,
          imgSrc: `${environment.API_URL}assets/gif/win.gif`
        };
        this.gameOver(modalData);
      }
    }
  }

  private updateImgSrc(): void {
    this.imgSrc = `${environment.API_URL}assets/img/hangman_${this.imgNr}k.png`;
  }

  private gameOver(modalData: IGameOverModalData): void {
    this._dialog
      .open(GameOverModalComponent, {
        width: '728px',
        disableClose: true,
        autoFocus: false,
        data: { ...modalData }
      })
      .afterClosed()
      .subscribe(() => {
        this.newGame();
      });
  }

  private getTime(): string {
    let minutes = 0;
    let seconds = 0;
    let time: string;
    this.gameTime++;

    minutes = Math.floor(this.gameTime / 60);
    seconds = Math.floor(this.gameTime % 60);

    if (minutes) {
      time = `${minutes}m:${seconds}s`;
    } else {
      time = `${seconds}s`;
    }
    return time;
  }

  ngOnDestroy(): void {
    if (this.timerSubscrition) {
      this.timerSubscrition.unsubscribe();
    }
    if (this.preCatchImgsSub) {
      this.preCatchImgsSub.unsubscribe();
    }
  }
}
