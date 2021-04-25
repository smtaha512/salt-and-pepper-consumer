import { TestBed } from '@angular/core/testing';

import { TextareaPopoverService } from './textarea-popover.service';

describe('TextareaPopoverService', () => {
  let service: TextareaPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextareaPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
