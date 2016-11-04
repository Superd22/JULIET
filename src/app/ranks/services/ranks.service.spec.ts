/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RanksService } from './ranks.service';

describe('Service: Ranks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RanksService]
    });
  });

  it('should ...', inject([RanksService], (service: RanksService) => {
    expect(service).toBeTruthy();
  }));
});
