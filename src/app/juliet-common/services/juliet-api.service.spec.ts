/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietAPIService } from './juliet-api.service';

describe('Service: JulietAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietAPIService]
    });
  });

  it('should ...', inject([JulietAPIService], (service: JulietAPIService) => {
    expect(service).toBeTruthy();
  }));
});
