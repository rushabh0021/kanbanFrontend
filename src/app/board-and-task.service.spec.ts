import { TestBed } from '@angular/core/testing';

import { BoardAndTaskService } from './board-and-task.service';

describe('BoardAndTaskService', () => {
  let service: BoardAndTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardAndTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
