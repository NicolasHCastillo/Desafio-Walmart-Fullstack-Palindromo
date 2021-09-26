import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { DataService } from './data.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { PRODUCT_DUMMIES, REPONSE_PAGINATE } from '../testing/product.factory';

describe('Service: Product', () => {
    let service: ProductService;
    let dataSpy: jasmine.SpyObj<DataService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('DataService', ['get']);
        TestBed.configureTestingModule({
            providers: [
                ProductService,
                HttpClient,
                { provide: DataService, useValue: spy }
            ]
        });
        service = TestBed.inject(ProductService);
        dataSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    });

    it('#getProducts should get products data', (done) => {
        const responseDummy = new HttpResponse({
            status: 200,
            body: {
                ...REPONSE_PAGINATE
            }
        });
        dataSpy.get.and.returnValue(of(responseDummy));
        service.getProducts().subscribe((res) => {
            expect(res).toEqual(REPONSE_PAGINATE);
            expect(res.data).toEqual(PRODUCT_DUMMIES);
            done();
        });
        expect(dataSpy.get.calls.count()).toBe(1);
    });

    it('#getProduct should get product data', (done) => {
        const responseDummy = new HttpResponse({
            status: 200,
            body: {
                ...PRODUCT_DUMMIES[0]
            }
        });
        dataSpy.get.and.returnValue(of(responseDummy));
        service.getProduct(PRODUCT_DUMMIES[0].id).subscribe((res) => {
            expect(res).toEqual(PRODUCT_DUMMIES[0]);
            done();
        });
        expect(dataSpy.get.calls.count()).toBe(1);
    });
})