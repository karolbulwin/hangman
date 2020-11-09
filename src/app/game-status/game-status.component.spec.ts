import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GameStatusComponent } from './game-status.component';

describe('GameStatusComponent', () => {
  let component: GameStatusComponent;
  let fixture: ComponentFixture<GameStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatusComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct maxStage', () => {
    component.maxStage = 5;

    expect(fixture.componentInstance.maxStage).toEqual(5);
  });

  it('should have the correct stage', () => {
    component.stage = 2;

    expect(fixture.componentInstance.stage).toEqual(2);
  });

  it('should render the maxStage in a div', () => {
    component.maxStage = 5;
    fixture.detectChanges();

    let deDiv = fixture.debugElement.query(By.css('.game-status-container div'));
    expect(deDiv.nativeElement.textContent).toContain('/5');
  });

  it('should render the current stage in a div', () => {
    component.stage = 3;
    fixture.detectChanges();

    let deDiv = fixture.debugElement.query(By.css('.game-status-container div'));
    expect(deDiv.nativeElement.textContent).toContain('3/');
  });
});
