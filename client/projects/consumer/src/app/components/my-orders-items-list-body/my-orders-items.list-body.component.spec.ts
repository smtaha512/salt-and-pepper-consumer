import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersItemsListBodyComponent } from './my-orders-items-list-body.component';

describe('MyOrdersItemsListHeaderComponent', () => {
  let component: MyOrdersItemsListBodyComponent;
  let fixture: ComponentFixture<MyOrdersItemsListBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrdersItemsListBodyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersItemsListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
