import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WineService } from './wine.service';

describe('WineService', () => {
  let service: WineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(WineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
