import { Product } from './product.model';
import { Paginate } from './paginate.model';

export interface ResponsePaginate{
    data?: Product[];
    paginator?: Paginate;
}