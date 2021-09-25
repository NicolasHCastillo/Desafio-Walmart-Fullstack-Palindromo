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

export const getProducts = async (search) => {
    const response = await api.get(`/api/product?search=${search}`);
    const { data } = response.body;
    return {
        data,
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