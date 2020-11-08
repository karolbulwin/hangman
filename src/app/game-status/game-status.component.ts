import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameStatusComponent implements OnInit {
  @Input() stage: number;
  @Input() maxStage: number;

  constructor() {}

  ngOnInit(): void {}
}
