import { 
    initialProducts ,
    populateInitialProducts,
    getProducts,
    getProduct
} from '../helpers/product.helper';
import { 
    api,
    closeOpenHandles,
    REGEX_APPLICATION_JSON
} from '../helpers/general.helper';

import { applyDiscountPrice } from '../../utils/helpers';

describe('Product API', () => {

    beforeEach(async () => {
        await populateInitialProducts();
    });

    describe('GET /API/PRODUCT', () => {

        test('Should be a json response content type', async () => {
            await api
                    .get('/api/product')
                    .expect(200)
                    .expect('Content-Type', REGEX_APPLICATION_JSON); //regex
        });

        test('Should verify mock data with no page, limit and search queries', async () => {
            const { data, paginator } = await getProducts();
            expect( data.length ).toEqual(initialProducts.length);

            const brands = data.map((product) => product.brand);
            expect( brands ).toContain(initialProducts[0].brand);
            expect( brands ).toContain(initialProducts[1].brand);

            const descriptions = data.map((product) => product.description);
            expect( descriptions ).toContain(initialProducts[0].description);
            expect( descriptions ).toContain(initialProducts[1].description);

            expect(Array.isArray(data)).toBe(true);

            expect(paginator).toHaveProperty('total');
            expect(paginator).toHaveProperty('limit');
            expect(paginator).toHaveProperty('totalPages');
            expect(paginator).toHaveProperty('totalPages');
            expect(paginator).toHaveProperty('currentPage');
            expect(paginator).toHaveProperty('pagingCounter');
            expect(paginator).toHaveProperty('hasPrevPage');
            expect(paginator).toHaveProperty('hasNextPage');
            expect(paginator).toHaveProperty('prevPage');
            expect(paginator).toHaveProperty('nextPage');

        });

        test('Should verify mock data with page and limit query', async () => {
            const curPage = 2;
            const limit = 2;
            const { data, paginator} = await getProducts(curPage,limit);
            expect( data.length ).toEqual(limit);
            expect(Array.isArray(data)).toBe(true);

            expect(paginator).toHaveProperty('limit', limit);
            expect(paginator).toHaveProperty('currentPage', curPage);
        });

        test('Should verify mock data with page, limit and search query', async () => {
            const curPage = 1;
            const limit = 5;
            const mockProduct = initialProducts[0];
            const { data, paginator} = await getProducts(curPage, limit, mockProduct.brand);
            // All the mock data have differents brands
            expect( data.length ).toEqual(1);

            expect(Array.isArray(data)).toBe(true);

            expect( data[0].id ).toEqual(mockProduct.id);
            expect( data[0].brand ).toEqual(mockProduct.brand);
            expect( data[0].description ).toEqual(mockProduct.description);
            expect( data[0].image ).toEqual(mockProduct.image);
            expect( data[0].price ).toEqual(mockProduct.price);

            expect(paginator).toHaveProperty('limit', limit);
            expect(paginator).toHaveProperty('currentPage', curPage);
        });

        test('Should verify mock data with a palindrome search query, and validate the discount was apply', async () => {
            const curPage = 1;
            const limit = 5;
            // palindrome search
            const search = 'sadas';
            const { data } = await getProducts(curPage, limit, search);
            // sequential
            expect( data[0].price ).toEqual(applyDiscountPrice(initialProducts[5].price));
        });

        test('Should return error when search query is less than or equal to 3 chars', async () => {
            const mockQuery = {
                key: 'search',
                value: 'aaa'
            };
            const invalidValue = "Invalid value";
            const response = await api
                                .get(`/api/product?${mockQuery.key}=${mockQuery.value}`)
                                .expect(422)
                                .expect('Content-Type', REGEX_APPLICATION_JSON); 
            const { errors } = response.body;
            expect( errors[0] ).toHaveProperty(mockQuery.key, invalidValue);
        });

        test('Should return error when page query is less than or equal to 0', async () => {
            const mockQuery = {
                key: 'page',
                value: 0
            };
            const invalidValue = "Invalid value";
            const response = await api
                                .get(`/api/product?${mockQuery.key}=${mockQuery.value}`)
                                .expect(422)
                                .expect('Content-Type', REGEX_APPLICATION_JSON); 
            const { errors } = response.body;
            expect( errors[0] ).toHaveProperty(mockQuery.key, invalidValue);
        });

        test('Should return error when limit query is less than or equal to 0', async () => {
            const mockQuery = {
                key: 'limit',
                value: -1
            };
            const invalidValue = "Invalid value";
            const response = await api
                                .get(`/api/product?${mockQuery.key}=${mockQuery.value}`)
                                .expect(422)
                                .expect('Content-Type', REGEX_APPLICATION_JSON); 
            const { errors } = response.body;
            expect( errors[0] ).toHaveProperty(mockQuery.key, invalidValue);
        });

    });

    describe('GET /API/PRODUCT/:ID', () => {
        
        const validID = initialProducts[0].id;
        const noValidID = 99999999;

        const palindromeProduct = initialProducts[0];
        const notPalindromeProduct = initialProducts[4];

        test('When the product exists then should be a json response content type with 200 status', async () => {
            await api
                    .get(`/api/product/${validID}`)
                    .expect(200)
                    .expect('Content-Type', REGEX_APPLICATION_JSON); //regex
        });

        test('When the product doesnot exists then should be a json response content type with 404 status', async () => {
            await api
                    .get(`/api/product/${noValidID}`)
                    .expect(404)
                    .expect('Content-Type', REGEX_APPLICATION_JSON); //regex
        });

        test('Should verify mock data of the palindrome product associated with the valid id', async () => {
            const { data } = await getProduct(palindromeProduct.id);

            expect( data.id ).toEqual(palindromeProduct.id);
            expect( data.brand ).toEqual(palindromeProduct.brand);
            expect( data.description ).toEqual(palindromeProduct.description);
            expect( data.image ).toEqual(palindromeProduct.image);
            // The responde product is discounted
            expect( data.price ).toEqual(applyDiscountPrice(palindromeProduct.price));

        });

        test('Should verify mock data of the not palindrome product associated with the valid id', async () => {
            const { data } = await getProduct(notPalindromeProduct.id);

            expect( data.id ).toEqual(notPalindromeProduct.id);
            expect( data.brand ).toEqual(notPalindromeProduct.brand);
            expect( data.description ).toEqual(notPalindromeProduct.description);
            expect( data.image ).toEqual(notPalindromeProduct.image);
            expect( data.price ).toEqual(notPalindromeProduct.price);

        });

        test('Should return error when id param is less than or equal to 0', async () => {
            const mockQuery = {
                key: 'id',
                value: 0
            };
            const invalidValue = "Invalid value";
            const response = await api
                                .get(`/api/product/${mockQuery.value}`)
                                .expect(422)
                                .expect('Content-Type', REGEX_APPLICATION_JSON); 
            const { errors } = response.body;
            expect( errors[0] ).toHaveProperty(mockQuery.key, invalidValue);
        });

    })

    afterAll(async () => {
        await closeOpenHandles();
    });

});