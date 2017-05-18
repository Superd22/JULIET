import { TestBed, inject } from '@angular/core/testing';

import { JulietHangarService } from './juliet-hangar.service';

describe('JulietHangarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietHangarService]
    });
  });

  it('should be created', inject([JulietHangarService], (service: JulietHangarService) => {
    expect(service).toBeTruthy();
  }));
});
