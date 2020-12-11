import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IGameOverModalData } from '../core/models/game-over-modal-data.model';

@Component({
  selector: 'app-game-over-modal',
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverModalComponent implements OnInit {
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IGameOverModalData) {}

  ngOnInit(): void {
    this.loading = true;
  }

  onImgLoad(): void {
    this.loading = false;
  }

  onImgError(): void {
    this.loading = false;
  }
}
