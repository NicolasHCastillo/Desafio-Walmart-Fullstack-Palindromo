import { SafePipe } from './safe.pipe';
import { DomSanitizer } from "@angular/platform-browser";
import { inject, TestBed } from '@angular/core/testing';

describe('SafePipe', () => {

  let sanitizer: DomSanitizer;
  let pipe: SafePipe;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        providers: [
          { 
            provide: DomSanitizer, 
            useValue: {
              sanitize: () => 'safeString',
              bypassSecurityTrustResourceUrl: () => 'safeString'
            } 
          }
        ]
      });
      sanitizer = TestBed.inject(DomSanitizer);
      pipe = new SafePipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  
  it('#transform should return valid href url ',  () => {
    const response = pipe.transform('https://www.lider.cl/catalogo/images/whiteLineIcon.svg');
    expect(response).toBe('safeString');
  });
});
