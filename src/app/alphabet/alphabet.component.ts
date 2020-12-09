import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { LetterStatusEnum } from '../core/enum/letter-status.enum';
import { ILetter } from '../core/models/letter.model';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetComponent {
  LetterStatusEnum = LetterStatusEnum;
  @Input() letters: ILetter[];
  @Output() letterSelected: EventEmitter<ILetter> = new EventEmitter();

  onSelect(letter: ILetter): void {
    this.letterSelected.emit(letter);
  }
}
