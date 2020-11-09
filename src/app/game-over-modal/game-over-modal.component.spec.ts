import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GameOverModalComponent } from './game-over-modal.component';

import { environment } from 'src/environments/environment';
import { IGameOverModalData } from '../core/models/game-over-modal-data.model';

describe('GameOverModalComponent', () => {
  let component: GameOverModalComponent;
  let fixture: ComponentFixture<GameOverModalComponent>;
  let mockDialogData: IGameOverModalData;

  @Component({
    selector: 'app-spinner',
    template: '<div></div>'
  })
  class FakeSpinnerComponent {}

  beforeEach(async () => {
    mockDialogData = {
      title: 'PRZEGRANA',
      msg: `Chesz spróbować jeszcze raz?`,
      imgSrc: `${environment.API_URL}assets/gif/lose.gif`
    };

    await TestBed.configureTestingModule({
      declarations: [GameOverModalComponent, FakeSpinnerComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: mockDialogData }],
      imports: [MatDialogModule, MatButtonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render correct title', () => {
    mockDialogData.title = 'WYGRANA';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.game-over-title').textContent).toContain('WYGRANA');
  });

  it('should render correct msg', () => {
    mockDialogData.msg = 'Gratulacje!';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.game-over-msg').textContent).toContain('Gratulacje!');
  });

  it('should set the correct src to img', () => {
    mockDialogData.imgSrc = `${environment.API_URL}assets/gif/won.gif`;
    fixture.detectChanges();

    let deImg = fixture.debugElement.query(By.css('img'));
    expect(deImg.attributes['src']).toContain(`${environment.API_URL}assets/gif/won.gif`);
  });

  it('should set loading to fasle when onImgLoad method is called', () => {
    fixture.detectChanges();

    component.onImgLoad();

    expect(component.loading).toBeFalse();
  });

  it('should set loading to fasle when onImgError method is called', () => {
    fixture.detectChanges();

    component.onImgError();

    expect(component.loading).toBeFalse();
  });

  it('should call onImgLoad method', () => {
    spyOn(component, 'onImgLoad');
    fixture.detectChanges();

    const deImg = fixture.debugElement.query(By.css('img'));
    deImg.triggerEventHandler('load', null);

    expect(component.onImgLoad).toHaveBeenCalledWith();
  });

  it('should call onImgError method', () => {
    spyOn(component, 'onImgError');
    fixture.detectChanges();

    const deImg = fixture.debugElement.query(By.css('img'));
    deImg.triggerEventHandler('error', null);

    expect(component.onImgError).toHaveBeenCalledWith();
  });
});
