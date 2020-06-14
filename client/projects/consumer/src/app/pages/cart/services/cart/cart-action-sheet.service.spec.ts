import { TestBed } from '@angular/core/testing';

import { CartActionSheetService } from './cart-action-sheet.service';

describe('CartActionSheetService', () => {
  let service: CartActionSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartActionSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
