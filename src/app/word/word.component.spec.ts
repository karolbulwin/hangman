import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordComponent } from './word.component';

describe('WordComponent', () => {
  let component: WordComponent;
  let fixture: ComponentFixture<WordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct word', () => {
    component.word = '-ANG-AN';

    expect(fixture.componentInstance.word).toEqual('-ANG-AN');
  });

  it('should render the correct word in a div', () => {
    component.word = 'HANG-AN';
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('HANG-AN');
  });
});
