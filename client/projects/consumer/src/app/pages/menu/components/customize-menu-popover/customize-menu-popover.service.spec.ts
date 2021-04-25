import { TestBed } from '@angular/core/testing';

import { CustomizeMenuPopoverService } from './customize-menu-popover.service';

describe('CustomizeMenuPopoverService', () => {
  let service: CustomizeMenuPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizeMenuPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
