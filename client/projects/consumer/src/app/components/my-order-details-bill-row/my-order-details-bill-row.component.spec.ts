import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderDetailsBillRowComponent } from './my-order-details-bill-row.component';

describe('MyOrderDetailsBillRowComponent', () => {
  let component: MyOrderDetailsBillRowComponent;
  let fixture: ComponentFixture<MyOrderDetailsBillRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderDetailsBillRowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderDetailsBillRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
