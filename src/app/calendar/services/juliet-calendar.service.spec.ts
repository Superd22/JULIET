/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietCalendarService } from './juliet-calendar.service';

describe('JulietCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietCalendarService]
    });
  });

  it('should ...', inject([JulietCalendarService], (service: JulietCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
