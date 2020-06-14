import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterInputPopoverComponent } from './counter-input-popover.component';

describe('CounterInputModalComponent', () => {
  let component: CounterInputPopoverComponent;
  let fixture: ComponentFixture<CounterInputPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterInputPopoverComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterInputPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
