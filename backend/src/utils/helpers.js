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

/**
 * Verify if a string is a palindrome
 * @param value 
 * @returns true if is a palindrome, otherwise false
 */
export const checkPalindrome = (value) => {
    return value && value == value.split('').reverse().join('');
}

/**
 * Generate a valid object to find product regex with a search word
 * @param search 
 * @returns {} if search is not send, otherwise return a valid object to regex data
 */
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

/**
 * Generate object for paginate products
 * @param limit 
 * @param page 
 * @returns a object with the information of the pagination options
 */
export const generateOptionsProductPagination = (limit, page) => {
    return {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        sort: { id: 1 },
        customLabels: customPaginateLabels
    };
}

/**
 * Apply a X discount to a price and return it, by the default the discount is 50%
 * @param price 
 * @param discount 
 * @returns the price with the discount already applied
 */
export const applyDiscountPrice = ( price, discount = 0.5 ) => {
    return Math.round(price * discount);
}

/**
 * Generate object of a product with a discount of 50% applied to the price
 * @param product 
 * @returns {...} with the data of the product and the price with the discount applied 
 */
export const applyDiscountProduct = (product) => {
    return { ...product.toObject(), price: applyDiscountPrice(product.price) };
}