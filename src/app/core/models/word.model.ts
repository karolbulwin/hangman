export interface IWord {
  id: number;
  value: string;
}

export class WordrModel implements IWord {
  id: number;
  value: string;

  constructor(obj?: IWord) {
    this.id = (obj && obj.id) || null;
    this.value = (obj && obj.value) || null;
  }
}
