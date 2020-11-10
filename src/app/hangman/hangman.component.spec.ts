import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { HangmanComponent } from './hangman.component';

describe('HangmanComponent', () => {
  let component: HangmanComponent;
  let fixture: ComponentFixture<HangmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HangmanComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HangmanComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct imgSrc', () => {
    component.imgSrc = `${environment.API_URL}assets/img/hangman_1k.png`;

    expect(component.imgSrc).toEqual(`${environment.API_URL}assets/img/hangman_1k.png`);
  });

  it('should set the correct src to img', () => {
    component.imgSrc = `${environment.API_URL}assets/img/hangman_1k.png`;
    fixture.detectChanges();

    const deImg = fixture.debugElement.query(By.css('img'));
    expect(deImg.attributes['src']).toContain(`${environment.API_URL}assets/img/hangman_1k.png`);
  });
});
