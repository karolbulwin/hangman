import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameStatusComponent {
  @Input() stage: number;
  @Input() maxStage: number;
}
