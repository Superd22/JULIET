import { TestBed, inject } from '@angular/core/testing';

import { JulietShipsService } from './juliet-ships.service';

describe('JulietShipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JulietShipsService]
    });
  });

  it('should be created', inject([JulietShipsService], (service: JulietShipsService) => {
    expect(service).toBeTruthy();
  }));
});
