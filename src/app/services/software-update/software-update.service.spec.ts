import { TestBed } from '@angular/core/testing';

import { SoftwareUpdateService } from './software-update.service';

describe('SoftwareUpdateService', () => {
  let service: SoftwareUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
