/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietUserService } from './juliet-user.service';

describe('JulietUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietUserService]
    });
  });

  it('should ...', inject([JulietUserService], (service: JulietUserService) => {
    expect(service).toBeTruthy();
  }));
});
