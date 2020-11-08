import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexModule } from '@angular/flex-layout';

import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [SpinnerComponent, FlexModule, MatButtonModule, MatDialogModule, MatSnackBarModule]
})
export class SharedModule {}
