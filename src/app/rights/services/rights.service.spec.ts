/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RightsService } from './rights.service';

describe('Service: Rights', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RightsService]
    });
  });

  it('should ...', inject([RightsService], (service: RightsService) => {
    expect(service).toBeTruthy();
  }));
});
