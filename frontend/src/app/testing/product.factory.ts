import { Product } from "src/app/models/product.model";
import { ResponsePaginate } from '../models/response-paginate.model';

export const PRODUCT_DUMMIES: Product[] = [
    {
        id: 1,
        brand: "ooy eqrceli",
        description: "rlñlw brhrka",
        image: "www.lider.cl/catalogo/images/whiteLineIcon.svg",
        price: 498724
    },
    {
        id: 2,
        brand: "dsaasd",
        description: "zlrwax bñyrh",
        image: "www.lider.cl/catalogo/images/babyIcon.svg",
        price: 130173
    }
]

export const REPONSE_PAGINATE: ResponsePaginate = {
    data: PRODUCT_DUMMIES,
    paginator: {
        total: PRODUCT_DUMMIES.length,
        limit: 2,
        totalPages: 1,
        currentPage: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    }
}
