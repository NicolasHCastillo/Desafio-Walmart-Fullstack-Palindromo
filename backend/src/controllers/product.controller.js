import Product from '../models/Product';
import { 
    checkPalindrome,
    applyDiscountProduct,
    generateQueryProductPagination, 
    generateOptionsProductPagination
} from '../utils/helpers';

export const findAll = async (req, res) => {
    try {

        const {limit, page, search} = req.query;

        const options = generateOptionsProductPagination(limit, page);

        const query = generateQueryProductPagination(search);

        let products = await Product.paginate(query, options);

        // VERIFY PALINDROME
        if(checkPalindrome(search)){
            products.data = products.data.map((product) => applyDiscountProduct(product));
        }

        return res.status(200).json(products);

    } catch (error) {

        console.error(error);
        return res.status(500).json(error);  

    }
};

export const findById = async(req, res) => {
    try {
        
        const { id } = req.params;

        let product = await Product.findOne({ id });

        if(!product){
            return res.status(404).json({
                msg: "Producto no existe",
            });
        }

        // VERIFY PALINDROME
        if(checkPalindrome(id)){
            product = applyDiscountProduct(product);
        }

        return res.status(200).json(product);

    } catch (error) {

        console.error(error);
        return res.status(500).json(error);  
            
    }
}