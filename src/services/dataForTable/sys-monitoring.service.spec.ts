import { TestBed } from '@angular/core/testing';

import { SysMonitoringService } from './sys-monitoring.service';

describe('SysMonitoringService', () => {
  let service: SysMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
