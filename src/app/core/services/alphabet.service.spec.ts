import { TestBed } from '@angular/core/testing';
import { LetterStatusEnum } from '../enum/letter-status.enum';

import { AlphabetService } from './alphabet.service';

describe('AlphabetService', () => {
  let service: AlphabetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlphabetService]
    });
    service = TestBed.inject(AlphabetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomFiveWords method', () => {
    it('should return 35 words', () => {
      const letters = service.getAllLetters();

      expect(letters.length).toEqual(35);
    });
  });

  describe('changeLetterStatus method', () => {
    it('should change letter status to WRONG', () => {
      const letters = service.getAllLetters();
      const selectedLetter = letters[4];
      const word = 'Wykrzyknik';

      const newLetters = service.changeLetterStatus(letters, selectedLetter, word);

      expect(newLetters[4].status).toEqual(LetterStatusEnum.WRONG);
    });

    it('should change letter status to CORRECT', () => {
      const letters = service.getAllLetters();
      const selectedLetter = letters[11];
      const word = 'Wykrzyknik';

      const newLetters = service.changeLetterStatus(letters, selectedLetter, word);

      expect(newLetters[11].status).toEqual(LetterStatusEnum.CORRECT);
    });
  });
});
