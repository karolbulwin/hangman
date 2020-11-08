import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersService } from './services/answers.service';
import { AlphabetService } from './services/alphabet.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AnswersService, AlphabetService]
})
export class CoreModule {}
