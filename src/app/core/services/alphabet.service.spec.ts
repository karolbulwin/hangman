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
      let letters = service.getAllLetters();

      expect(letters.length).toEqual(35);
    });
  });

  describe('changeLetterStatus method', () => {
    it('should change letter status to WRONG', () => {
      let letters = service.getAllLetters();
      let selectedLetter = letters[4];
      let word = 'Wykrzyknik';

      let newLetters = service.changeLetterStatus(letters, selectedLetter, word);

      expect(newLetters[4].status).toEqual(LetterStatusEnum.WRONG);
    });

    it('should change letter status to CORRECT', () => {
      let letters = service.getAllLetters();
      let selectedLetter = letters[11];
      let word = 'Wykrzyknik';

      let newLetters = service.changeLetterStatus(letters, selectedLetter, word);

      expect(newLetters[11].status).toEqual(LetterStatusEnum.CORRECT);
    });
  });
});
