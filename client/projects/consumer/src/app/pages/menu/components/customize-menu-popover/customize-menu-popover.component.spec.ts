import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomizeMenuPopoverComponent } from './customize-menu-popover.component';

describe('CustomizeMenuPopoverComponent', () => {
  let component: CustomizeMenuPopoverComponent;
  let fixture: ComponentFixture<CustomizeMenuPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeMenuPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeMenuPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
