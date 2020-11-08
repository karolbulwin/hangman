import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IAnswersDataRequest, AnswersDataRequestModel } from '../models/answers-data-request.model';
import { IWord } from '../models/word.model';

@Injectable()
export class AnswersService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<IAnswersDataRequest> {
    return this.http
      .get(`${environment.API_URL}assets/data/answers.json`)
      .pipe(map((response: IAnswersDataRequest) => new AnswersDataRequestModel(response)));
  }

  getRandomFiveWords(words: IWord[]): IWord[] {
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }
}
