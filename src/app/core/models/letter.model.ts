import { LetterStatusEnum } from '../enum/letter-status.enum';

export interface ILetter {
  id: number;
  value: string;
  status?: string;
}

export class LetterModel implements ILetter {
  id: number;
  value: string;
  status?: string;

  constructor(obj?: ILetter) {
    this.id = (obj && obj.id) || null;
    this.value = (obj && obj.value) || null;
    this.status = (obj && obj.status) || LetterStatusEnum.NEUTRAL;
  }
}
