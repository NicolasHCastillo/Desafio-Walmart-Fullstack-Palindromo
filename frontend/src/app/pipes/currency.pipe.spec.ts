import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  let pipe: CurrencyPipe;

  beforeEach(() => {
      pipe = new CurrencyPipe();
  });

  it('#transform should return the number price in clp currency format', () => {
      let result: string = pipe.transform(1000000);
      expect(result).toBe('$1.000.000');
      result = pipe.transform(234142);
      expect(result).toBe('$234.142');
  });
});
