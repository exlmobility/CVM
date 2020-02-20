import { TestBed } from '@angular/core/testing';

import { NetworkApiService } from './network-api.service';

describe('NetworkApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkApiService = TestBed.get(NetworkApiService);
    expect(service).toBeTruthy();
  });
});
