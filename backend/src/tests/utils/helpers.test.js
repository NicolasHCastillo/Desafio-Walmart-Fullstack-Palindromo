import { 
    checkPalindrome,
    generateQueryProductPagination,
    generateOptionsProductPagination,
    applyDiscountPrice,
    applyDiscountProduct
} from '../../utils/helpers';

describe('checkPalindrome - Palindrome', () => {

    const validPalindrome = 'anitalavalatina';
    const notValidPalindrome = 'noesunpalindromo';

    test('Should validate a valid palindrome', () => {
        const result = checkPalindrome(validPalindrome);
        expect(result).toBe(true);
    });

    test('Should validate a not valid palindrome', () => {
        const result = checkPalindrome(notValidPalindrome);
        expect(result).toBe(false)
    });

});

describe('generateQueryProductPagination - Generate query product pagination object for products', () => {

    test('Should return {} when doesnt send search param', () => {
        const result = generateQueryProductPagination();
        expect(result).toEqual({});
    });

    test('Should return valid pagination object when send search param', () => {
        const search = 'asdfg';
        const result = generateQueryProductPagination(search);
        expect(result).toHaveProperty('$or');
        const [ brandObj, descriptionObj ] = result.$or;
        expect(brandObj).toHaveProperty('brand');
        expect(descriptionObj).toHaveProperty('description');
        const { brand } = brandObj;
        const { description } = descriptionObj;
        expect(brand).toHaveProperty('$regex', search);
        expect(brand).toHaveProperty('$options', 'i');
        expect(description).toHaveProperty('$regex', search);
        expect(description).toHaveProperty('$options', 'i');
    });

});

describe('generateOptionsProductPagination - Generate options product pagination object for products', () => {

    test('Should return default options object when doesnt send limit and page', () => {
        const result = generateOptionsProductPagination();
        expect(result).toHaveProperty('limit', 10);
        expect(result).toHaveProperty('page', 1);
        expect(result).toHaveProperty('sort');
        const { sort } = result;
        expect(sort).toHaveProperty('id', 1);
        expect(result).toHaveProperty('customLabels');
    });

    test('Should return valid options object when send limit and page', () => {
        const limit = 2;
        const page = 5;
        const result = generateOptionsProductPagination(limit, page);
        expect(result).toHaveProperty('limit', limit);
        expect(result).toHaveProperty('page', page);
        expect(result).toHaveProperty('sort');
        const { sort } = result;
        expect(sort).toHaveProperty('id', 1);
        expect(result).toHaveProperty('customLabels');
    });

});

describe('applyDiscountPrice', () => {

    test('Should aplied the discount to the price amount and discount given', () => {
        const price = 10000;
        const discount = 0.25;
        const result = applyDiscountPrice(price, discount);
        expect( result ).toEqual( price * discount );
    });

    test('Should aplied 50% discount by default to the price given', () => {
        const price = 10000;
        const discount = 0.5;
        const result = applyDiscountPrice(price);
        expect( result ).toEqual( price * discount );
    });

});

describe('applyDiscountProduct', () => {

    const mockUpData = {
        id: 1,
        brand: "ooy eqrceli",
        description: "rlñlw brhrka",
        image: "www.lider.cl/catalogo/images/whiteLineIcon.svg",
        price: 10000
    };

    const mockUpProduct = {
        price: 10000,
        toObject: () => mockUpData
    }

    test('Should aplied the 50% discount to the price amount associated with a product', () => {
        const result = applyDiscountProduct(mockUpProduct);
        expect(result).toHaveProperty('id', mockUpData.id);
        expect(result).toHaveProperty('brand', mockUpData.brand);
        expect(result).toHaveProperty('description', mockUpData.description);
        expect(result).toHaveProperty('image', mockUpData.image);
        expect(result).toHaveProperty('price', applyDiscountPrice(mockUpData.price));
    });

});