const customPaginateLabels = {
    totalDocs: 'total',
    docs: 'data',
    limit: 'limit',
    page: 'currentPage',
    nextPage: 'nextPage',
    prevPage: 'prevPage',
    totalPages: 'totalPages',
    pagingCounter: 'pagingCounter',
    meta: 'paginator',
};

export const checkPalindrome = (value) => {
    return value && value == value.split('').reverse().join('');
}

export const generateQueryProductPagination = (search) => {
    return search
            ?
            {
                $or: [
                    { brand: { $regex:search, $options: 'i' } },
                    { description: { $regex:search, $options: 'i' } }
                ]
            }
            :{};
}

export const generateOptionsProductPagination = (limit, page) => {
    return {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { id: 1 },
        customLabels: customPaginateLabels
    };
}

export const applyDiscountProduct = ( product, discount = 0.5 ) => {
    return { ...product.toObject(), price: Math.round(product.price * discount) };
}