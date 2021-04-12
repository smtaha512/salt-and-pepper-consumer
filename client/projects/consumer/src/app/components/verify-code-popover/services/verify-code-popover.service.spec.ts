import { TestBed } from '@angular/core/testing';

import { VerifyCodePopoverService } from './verify-code-popover.service';

describe('VerifyCodePopoverService', () => {
  let service: VerifyCodePopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCodePopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
