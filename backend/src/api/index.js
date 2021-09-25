import { Router } from 'express';
import ProductsRoutes from '../routes/product.routes';

const router = Router();

router.get('/api', (req, res) => {
    res.json({
        message: 'WALMART API is Alive!',
        products: 'api/product'
    })
});

router.use('/api/product', ProductsRoutes);

router.all("*", (req, res) => {
    res.status(404).json({
      message: "La solicitud no es reconocida por el servidor.",
    });
});  

export default router;