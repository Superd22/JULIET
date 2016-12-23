/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietRightsService } from './juliet-rights.service';

describe('JulietRightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietRightsService]
    });
  });

  it('should ...', inject([JulietRightsService], (service: JulietRightsService) => {
    expect(service).toBeTruthy();
  }));
});
