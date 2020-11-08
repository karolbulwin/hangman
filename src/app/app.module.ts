import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { WordComponent } from './word/word.component';
import { HangmanComponent } from './hangman/hangman.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { GameOverModalComponent } from './game-over-modal/game-over-modal.component';
import { GameStatusComponent } from './game-status/game-status.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    HangmanComponent,
    AlphabetComponent,
    GameOverModalComponent,
    GameStatusComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, CoreModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
