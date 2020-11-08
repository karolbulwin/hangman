import { Injectable } from '@angular/core';

import { LetterStatusEnum } from '../enum/letter-status.enum';
import { ILetter, LetterModel } from '../models/letter.model';

@Injectable()
export class AlphabetService {
  private readonly letters = [
    'A',
    'Ą',
    'B',
    'C',
    'Ć',
    'D',
    'E',
    'Ę',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'Ł',
    'M',
    'N',
    'Ń',
    'O',
    'Ó',
    'P',
    'Q',
    'R',
    'S',
    'Ś',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'Ź',
    'Ż'
  ];

  constructor() {}

  getAllLetters(): ILetter[] {
    return this.letters.map((letter, index) => new LetterModel({ id: index + 1, value: letter }));
  }

  changeLetterStatus(letters: ILetter[], selectedLetter: ILetter, word: string): ILetter[] {
    const newLetters = JSON.parse(JSON.stringify(letters));

    return newLetters.map((letter: ILetter) => {
      if (selectedLetter.id === letter.id) {
        return { ...letter, status: this.getStatus(letter, word) };
      }
      return letter;
    });
  }

  private getStatus(letter: ILetter, word: string): string {
    if (this.isSeletedLetterInTheWord(letter, word)) {
      return LetterStatusEnum.CORRECT;
    }
    return LetterStatusEnum.WRONG;
  }

  private isSeletedLetterInTheWord(letter: ILetter, word: string): boolean {
    return word.toUpperCase().indexOf(letter.value) > -1;
  }
}
