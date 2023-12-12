import { TestBed } from '@angular/core/testing';
import { AppetizerService } from './appetizers.service';


describe('AppetizersService', () => {
  let service: AppetizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppetizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
