import express from 'express';

import bodyParser from 'body-parser';

import { Products } from '../model/products.js';

import { verifyToken } from '../middleware/authenticateUser.js';




const prodRouter = express.Router();

prodRouter.use(bodyParser.json());


prodRouter.get('/', verifyToken, (req, res) => {
    Products.fetchAllProducts(req, res)
})

prodRouter.get('/:id', verifyToken, (req, res) => {
    Products.fetchOneProduct(req, res)
})

prodRouter.post('/addproduct', verifyToken, (req, res) => {
    Products.addProduct(req, res)
})

prodRouter.patch('/:id', verifyToken, (req, res) => {
    Products.updateProduct(req, res)
})

prodRouter.delete('/:id', verifyToken, (req, res) => {
    Products.deleteProduct(req, res)
})


export {
    prodRouter  
}