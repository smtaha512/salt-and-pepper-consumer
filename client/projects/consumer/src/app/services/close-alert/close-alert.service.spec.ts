import { TestBed } from '@angular/core/testing';

import { CloseAlertService } from './close-alert.service';

describe('CloseAlertService', () => {
  let service: CloseAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
