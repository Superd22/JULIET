/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietGroupsService } from './juliet-groups.service';

describe('JulietGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietGroupsService]
    });
  });

  it('should ...', inject([JulietGroupsService], (service: JulietGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
