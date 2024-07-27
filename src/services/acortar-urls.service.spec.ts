import { TestBed } from '@angular/core/testing';

import { AcortarUrlsService } from './acortar-urls.service';

describe('AcortarUrlsService', () => {
  let service: AcortarUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcortarUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
