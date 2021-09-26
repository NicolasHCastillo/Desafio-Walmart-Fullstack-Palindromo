import { api } from './general.helper';
import Product from '../../models/Product';

export const initialProducts = [
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
    },
    {
        id: 3,
        brand: "weñxoab",
        description: "hqhoy qacirk",
        image: "www.lider.cl/catalogo/images/homeIcon.svg",
        price: 171740
    },
    {
        id: 4,
        brand: "sjlzxeo",
        description: "pnyn rlxbewnk",
        image: "www.lider.cl/catalogo/images/computerIcon.svg",
        price: 890348
    },
    {
        id: 51,
        brand: "peuoooypt",
        description: "trcwl iagxxh",
        image: "www.lider.cl/catalogo/images/whiteLineIcon.svg",
        price: 814893
    }
];

export const populateInitialProducts = async() => {
    await Product.deleteMany({});

    // sequential
    for (const product of initialProducts) {
        const pd = new Product(product);
        await pd.save();
    }
}

export const getProducts = async (page = 1, limit = 10, search) => {
    let endpoint = `/api/product?page=${page}&limit=${limit}`;
    if(search) endpoint = `${endpoint}&search=${search}`
    const response = await api.get(endpoint);
    const { data, paginator } = response.body;
    return {
        data,
        paginator,
        response
    };
}

export const getProduct = async (id) => {
    const response = await api.get(`/api/product/${id}`);
    const data = response.body;
    return {
        data,
        response
    };
}