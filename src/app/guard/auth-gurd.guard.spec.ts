import { TestBed } from '@angular/core/testing';

import { AuthGurdGuard } from './auth-gurd.guard';

describe('AuthGurdGuard', () => {
  let guard: AuthGurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
