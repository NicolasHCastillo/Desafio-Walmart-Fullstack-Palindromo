import { ExternalHrefPipe } from './external-href.pipe';

describe('ExternalHrefPipe', () => {
  let pipe: ExternalHrefPipe;

  beforeEach(() => {
      pipe = new ExternalHrefPipe();
  });

  it('#transform should return valid href url ', () => {
      let result: string = pipe.transform('www.chile.com');
      expect(result).toBe('https://www.chile.com');
      result = pipe.transform('https://www.lider.com');
      expect(result).toBe('https://www.lider.com');
  });
});
