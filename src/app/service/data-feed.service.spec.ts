import { TestBed } from '@angular/core/testing';

import { DataFeedService } from './data-feed.service';

describe('DataFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFeedService = TestBed.get(DataFeedService);
    expect(service).toBeTruthy();
  });
});
