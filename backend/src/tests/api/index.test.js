import { 
    api,
    closeOpenHandles,
    REGEX_APPLICATION_JSON
} from '../helpers/general.helper';

describe('Index API', () => {
    
    test('Endpoint /api/ - Should be a json response content type', async () => {
        const response = await api
                            .get('/api')
                            .expect(200)
                            .expect('Content-Type', REGEX_APPLICATION_JSON); //regex
        const { msg, products } = response.body;
        expect( msg ).toEqual('WALMART API is Alive!');
        expect( products ).toEqual('api/product');
    });
    
    test('Endpoint does not defined - Should be a json response content type with 404 status', async () => {
        const response = await api
                            .get('/sdasjhdkasd')
                            .expect(404)
                            .expect('Content-Type', REGEX_APPLICATION_JSON); //regex
        const { msg } = response.body;
        expect( msg ).toEqual('La solicitud no es reconocida por el servidor.');
    });

    afterAll(async () => {
        await closeOpenHandles();
    });
})