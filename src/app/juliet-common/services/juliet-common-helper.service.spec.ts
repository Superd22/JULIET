/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietCommonHelperService } from './juliet-common-helper.service';

describe('JulietCommonHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietCommonHelperService]
    });
  });

  it('should ...', inject([JulietCommonHelperService], (service: JulietCommonHelperService) => {
    expect(service).toBeTruthy();
  }));
});
