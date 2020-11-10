import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnswersService } from './answers.service';

import { environment } from 'src/environments/environment';
import { IWord } from '../models/word.model';
import { AnswersDataRequestModel, IAnswersDataRequest } from '../models/answers-data-request.model';

describe('AnswersService', () => {
  let service: AnswersService;
  let httpTestingController: HttpTestingController;
  let words: IWord[];

  beforeEach(() => {
    words = [
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
    ];

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnswersService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should call get with the correct URL', () => {
      const testData: IAnswersDataRequest = {
        words
      };

      service
        .getAll()
        .subscribe((data: IAnswersDataRequest) =>
          expect(data).toEqual(new AnswersDataRequestModel(testData))
        );

      const req = httpTestingController.expectOne(`${environment.API_URL}assets/data/answers.json`);
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('getRandomFiveWords method', () => {
    it('should return 5 random words', () => {
      let sorted: boolean;

      const fiveWords = service.getRandomFiveWords(words);
      for (let i = 0; i < fiveWords.length - 1; i++) {
        if (fiveWords[i].id + 1 !== fiveWords[i + 1].id) {
          sorted = true;
        }
      }

      expect(fiveWords.length).toEqual(5);
      expect(sorted).toBeTrue();
    });
  });
});
