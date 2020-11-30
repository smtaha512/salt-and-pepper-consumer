import { TestBed } from '@angular/core/testing';

import { MenuItemResolver } from './menu-item.resolver';

describe('MenuItemResolver', () => {
  let service: MenuItemResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
