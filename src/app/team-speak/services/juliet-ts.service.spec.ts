/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietTsService } from './juliet-ts.service';

describe('JulietTsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietTsService]
    });
  });

  it('should ...', inject([JulietTsService], (service: JulietTsService) => {
    expect(service).toBeTruthy();
  }));
});
