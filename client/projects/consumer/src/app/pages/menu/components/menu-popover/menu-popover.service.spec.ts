import { TestBed } from '@angular/core/testing';

import { MenuPopoverService } from './menu-popover.service';

describe('MenuPopoverService', () => {
  let service: MenuPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
