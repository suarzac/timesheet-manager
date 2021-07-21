import { TestBed } from '@angular/core/testing';

import { TimecardService } from './timecard.service';

describe('TimecardService', () => {
  let service: TimecardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimecardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
