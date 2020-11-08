import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent implements OnInit {
  @Input() word: string;

  constructor() {}

  ngOnInit(): void {}
}
