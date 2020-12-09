import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

import { AlphabetService } from './core/services/alphabet.service';
import { AnswersService } from './core/services/answers.service';
import { GameOverModalComponent } from './game-over-modal/game-over-modal.component';
import { GameStatusComponent } from './game-status/game-status.component';
import { WordComponent } from './word/word.component';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { LetterStatusEnum } from './core/enum/letter-status.enum';
import { IAnswersDataRequest } from './core/models/answers-data-request.model';
import { ILetter } from './core/models/letter.model';
import { IWord } from './core/models/word.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let answers: IAnswersDataRequest;
  let letters: ILetter[];
  let randomWords: IWord[];

  let mockAnswersService;
  let mockAlphabetService;
  let mockSnackbar;
  @Component({
    selector: 'app-hangman',
    template: '<div></div>'
  })
  class FakeHangmanComponent {
    @Input() imgSrc: string;
  }

  @Component({
    selector: 'app-alphabet',
    template: '<div></div>'
  })
  class FakeAlphabetComponent {
    @Input() letters: ILetter[];
    @Output() letterSelected: EventEmitter<ILetter> = new EventEmitter();
  }

  @Component({
    selector: 'app-spinner',
    template: '<div></div>'
  })
  class FakeSpinnerComponent {}

  beforeEach(async () => {
    mockAnswersService = jasmine.createSpyObj(['getAll', 'getRandomFiveWords']);
    mockAlphabetService = jasmine.createSpyObj(['getAllLetters', 'changeLetterStatus']);
    mockSnackbar = jasmine.createSpyObj(['open']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameStatusComponent,
        WordComponent,
        FakeHangmanComponent,
        FakeAlphabetComponent,
        FakeSpinnerComponent,
        GameOverModalComponent
      ],
      imports: [NoopAnimationsModule, MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: AnswersService, useValue: mockAnswersService },
        { provide: AlphabetService, useValue: mockAlphabetService },
        { provide: MatSnackBar, useValue: mockSnackbar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    answers = {
      words: [
        {
          id: 1,
          value: 'Stwierdzenie'
        },
        {
          id: 2,
          value: 'Znajomy'
        },
        {
          id: 3,
          value: 'Dorożkarz'
        },
        {
          id: 4,
          value: 'Wykrzyknik'
        },
        {
          id: 5,
          value: 'Błękitny'
        },
        {
          id: 6,
          value: 'Stragan'
        },
        {
          id: 7,
          value: 'Prostokąt'
        },
        {
          id: 8,
          value: 'Płomienie'
        },
        {
          id: 9,
          value: 'Ciemność'
        },
        {
          id: 10,
          value: 'Niedźwiedź'
        }
      ]
    };

    letters = [
      { id: 1, value: 'A', status: LetterStatusEnum.NEUTRAL },
      { id: 2, value: 'B', status: LetterStatusEnum.NEUTRAL },
      { id: 3, value: 'C', status: LetterStatusEnum.NEUTRAL },
      { id: 4, value: 'D', status: LetterStatusEnum.NEUTRAL },
      { id: 5, value: 'E', status: LetterStatusEnum.NEUTRAL },
      { id: 6, value: 'F', status: LetterStatusEnum.NEUTRAL },
      { id: 7, value: 'G', status: LetterStatusEnum.NEUTRAL }
    ];
    randomWords = [
      {
        id: 2,
        value: 'Znajomy'
      },
      {
        id: 6,
        value: 'Stragan'
      },
      {
        id: 3,
        value: 'Dorożkarz'
      },
      {
        id: 16,
        value: 'Wyciągać'
      },
      {
        id: 23,
        value: 'Oddychać'
      }
    ];

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockAnswersService.getAll.and.returnValue(of(answers));
    mockAnswersService.getRandomFiveWords.and.returnValue(randomWords);
    mockAlphabetService.getAllLetters.and.returnValue(letters);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Hangman'`, () => {
    expect(component.title).toEqual('Hangman');
  });

  it('should call ngOnInit then start newGame', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.letters.length).toBe(letters.length);
    expect(component.words).toBe(randomWords);
    expect(component.imgSrc).toBe(`${environment.API_URL}assets/img/hangman_1k.png`);
  });

  it('should call ngOnInit then start newGame and throw error then display it in snackbar', () => {
    mockAnswersService.getAll.and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: new Error(),
          status: 404,
          statusText: 'Not Found',
          url: `${environment.API_URL}assets/data/answers.json`
        })
      )
    );
    fixture.detectChanges();

    expect(mockSnackbar.open).toHaveBeenCalledWith(
      'Http failure response for ' +
        `${environment.API_URL}assets/data/answers.json` +
        ': ' +
        '404 Not Found',
      null,
      {
        duration: 4000,
        horizontalPosition: 'right'
      }
    );
  });

  describe('GameStatusComponet', () => {
    it('should render with correct initial status "Etap: 1/5"', () => {
      fixture.detectChanges();

      const gameStatusComponentDE = fixture.debugElement.queryAll(
        By.directive(GameStatusComponent)
      );
      expect(gameStatusComponentDE.length).toEqual(1);
      expect(gameStatusComponentDE[0].nativeElement.textContent).toContain('Etap: 1/5');
    });

    it('should render with correct status "Etap: 5/5"', () => {
      fixture.detectChanges();

      component.stage = 5;
      fixture.detectChanges();

      const gameStatusComponentDE = fixture.debugElement.queryAll(
        By.directive(GameStatusComponent)
      );
      expect(gameStatusComponentDE.length).toEqual(1);
      expect(gameStatusComponentDE[0].nativeElement.textContent).toContain('Etap: 5/5');
    });
  });

  describe('WordComponent', () => {
    it('should render hiden word', () => {
      fixture.detectChanges();

      const wordComponentComponentDE = fixture.debugElement.queryAll(By.directive(WordComponent));
      expect(wordComponentComponentDE.length).toEqual(1);
      expect(wordComponentComponentDE[0].nativeElement.textContent).toEqual(component.word);
    });

    it('should render hiden word with selected letter', () => {
      fixture.detectChanges();

      component.onLetterSelected(letters[0]);
      fixture.detectChanges();

      const wordComponentComponentDE = fixture.debugElement.queryAll(By.directive(WordComponent));
      expect(wordComponentComponentDE.length).toEqual(1);
      expect(wordComponentComponentDE[0].nativeElement.textContent).toEqual('--A----');
    });
  });

  it('should change stage from 1 to 2', () => {
    fixture.detectChanges();

    component.word = 'Zn-jomy';
    component.onLetterSelected(letters[0]);
    fixture.detectChanges();

    expect(component.stage).toEqual(2);
  });

  it('should change stage from 2 to 1 then start new game', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    dialogRefSpyObj.componentInstance = { body: '' };
    fixture.detectChanges();

    component.onLetterSelected(letters[1]);
    component.onLetterSelected(letters[2]);
    component.onLetterSelected(letters[3]);
    component.onLetterSelected(letters[4]);
    component.onLetterSelected(letters[5]);
    component.onLetterSelected(letters[6]);
    fixture.detectChanges();

    expect(dialogSpy).toHaveBeenCalledWith(GameOverModalComponent, {
      width: '728px',
      disableClose: true,
      autoFocus: false,
      data: {
        title: 'PRZEGRANA',
        msg: `Chesz spróbować jeszcze raz?`,
        imgSrc: `${environment.API_URL}assets/gif/lose.gif`
      }
    });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.stage).toEqual(1);
  });

  it('should change stage from 1 to 5 then won game and start new one', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    dialogRefSpyObj.componentInstance = { body: '' };
    fixture.detectChanges();

    component.gameTime = 158;
    component.word = 'Zn-jomy';
    component.onLetterSelected(letters[0]);
    component.word = 'Str-g-n';
    component.onLetterSelected(letters[0]);
    component.word = 'Dorożk-rz';
    component.onLetterSelected(letters[0]);
    component.word = 'Wycią-ać';
    component.onLetterSelected(letters[6]);
    component.word = 'O--ychać';
    component.onLetterSelected(letters[3]);
    fixture.detectChanges();

    expect(dialogSpy).toHaveBeenCalledWith(GameOverModalComponent, {
      width: '728px',
      disableClose: true,
      autoFocus: false,
      data: {
        title: 'WYGRANA!',
        msg: `Gratulacje! Twój czas: 2m:39s`,
        imgSrc: `${environment.API_URL}assets/gif/win.gif`
      }
    });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.stage).toEqual(1);
  });

  describe('gameTime', () => {
    it('should be 32', fakeAsync(() => {
      fixture.detectChanges();

      tick(33000);
      discardPeriodicTasks();

      expect(component.gameTime).toBe(32);
    }));
  });

  it('should call ngOnDestroy method ', () => {
    spyOn(component, 'ngOnDestroy');
    fixture.detectChanges();

    component.ngOnDestroy();

    expect(component.ngOnDestroy).toHaveBeenCalled();
  });
});
