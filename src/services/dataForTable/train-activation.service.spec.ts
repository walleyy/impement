import { TestBed } from '@angular/core/testing';

import { TrainActivationService } from './train-activation.service';

describe('TrainActivationService', () => {
  let service: TrainActivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainActivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
