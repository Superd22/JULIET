/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JulietNamesConverterService } from './juliet-names-converter.service';

describe('JulietNamesConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietNamesConverterService]
    });
  });

  it('should ...', inject([JulietNamesConverterService], (service: JulietNamesConverterService) => {
    expect(service).toBeTruthy();
  }));
});
