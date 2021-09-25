import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import * as validator from '../middlewares/validator-query';


const router = Router();

/**************************

    PUBLIC ENDPOINTS -> api/products

***************************/

router.get(
    '/', 
    validator.searchValidationRules(), 
    validator.validate, 
    productController.findAll
);

router.get(
    '/:id', 
    validator.identifierValidationRules(), 
    validator.validate, 
    productController.findById
);

export default router;