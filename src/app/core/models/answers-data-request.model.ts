import { IWord, WordrModel } from './word.model';

export interface IAnswersDataRequest {
  words: IWord[];
}

export class AnswersDataRequestModel implements IAnswersDataRequest {
  words: IWord[];

  constructor(obj?: IAnswersDataRequest) {
    this.words = obj && obj.words ? obj.words.map((word: IWord) => new WordrModel(word)) : [];
  }
}
