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

        test('Should verify mock data', async () => {
            const { data } = await getProducts();
            expect( data ).toHaveLength(initialProducts.length);
            expect( data ).toContain(initialProducts[0].title);
            expect( data ).toContain(initialProducts[1].title);
        });

    });


    afterAll(async () => {
        await closeOpenHandles();
    });

});