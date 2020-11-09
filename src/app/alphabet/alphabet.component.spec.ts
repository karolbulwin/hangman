import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlphabetComponent } from './alphabet.component';

import { LetterStatusEnum } from '../core/enum/letter-status.enum';
import { ILetter } from '../core/models/letter.model';

describe('AlphabetComponent', () => {
  let component: AlphabetComponent;
  let fixture: ComponentFixture<AlphabetComponent>;
  let letters: ILetter[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphabetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    letters = [
      { id: 1, value: 'A', status: LetterStatusEnum.NEUTRAL },
      { id: 2, value: 'B', status: LetterStatusEnum.NEUTRAL },
      { id: 3, value: 'C', status: LetterStatusEnum.NEUTRAL }
    ];

    fixture = TestBed.createComponent(AlphabetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 letters', () => {
    component.letters = letters;

    expect(component.letters.length).toEqual(3);
  });

  it('should create one button for each letter with correct value', () => {
    component.letters = letters;
    fixture.detectChanges();

    const deButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(deButtons.length).toBe(3);
    for (let i = 0; i < deButtons.length; i++) {
      expect(deButtons[i].nativeElement.textContent).toContain(letters[i].value);
    }
  });

  it('should call onSelect method with correct letter when button is clicked ', () => {
    spyOn(component, 'onSelect');
    component.letters = letters;
    fixture.detectChanges();

    const deButton = fixture.debugElement.queryAll(By.css('button'));
    deButton[2].triggerEventHandler('click', null);

    expect(component.onSelect).toHaveBeenCalledWith(letters[2]);
  });

  it('should emit correct letter when onSelect method is called', () => {
    spyOn(component.letterSelected, 'emit');
    component.letters = letters;
    fixture.detectChanges();

    component.onSelect(letters[1]);

    expect(component.letterSelected.emit).toHaveBeenCalledWith(letters[1]);
  });

  describe('button', () => {
    it('should have letter-correct class', () => {
      component.letters = letters;
      component.letters[0].status = LetterStatusEnum.CORRECT;
      fixture.detectChanges();

      const deButton = fixture.debugElement.query(By.css('button'));
      expect(deButton.classes['letter-correct']).toBe(true);
    });

    it('should have letter-wrong class', () => {
      component.letters = letters;
      component.letters[1].status = LetterStatusEnum.WRONG;
      fixture.detectChanges();

      const deButton = fixture.debugElement.queryAll(By.css('button'));
      expect(deButton[1].classes['letter-wrong']).toBe(true);
    });

    it('should be enabled', () => {
      component.letters = letters;
      fixture.detectChanges();

      const deButton = fixture.debugElement.queryAll(By.css('button'));
      expect(deButton[2].nativeElement['disabled']).toBeFalse();
    });

    it('should be disabled', () => {
      component.letters = letters;
      component.letters[1].status = LetterStatusEnum.CORRECT;
      component.letters[2].status = LetterStatusEnum.WRONG;

      fixture.detectChanges();

      const deButton = fixture.debugElement.queryAll(By.css('button'));
      expect(deButton[1].nativeElement['disabled']).toBeTrue();
      expect(deButton[2].nativeElement['disabled']).toBeTrue();
    });
  });
});
