import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HangmanComponent {
  @Input() imgSrc: string;
}
