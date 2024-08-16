import express from 'express';

import bodyParser from 'body-parser';

import { Products } from '../model/products.js';

import { verifyToken } from '../middleware/authenticateUser.js';




const prodRouter = express.Router();

prodRouter.use(bodyParser.json());
prodRouter.use(verifyToken());

prodRouter.get('/', verifyToken, (req, res) => {
    Products.fetchAllProducts(req, res)
})

prodRouter.get('/:id', (req, res) => {
    Products.fetchOneProduct(req, res)
})

prodRouter.post('/addproduct', (req, res) => {
    Products.addProduct(req, res)
})

prodRouter.patch('/:id', (req, res) => {
    Products.updateProduct(req, res)
})

prodRouter.delete('/:id', (req, res) => {
    Products.deleteProduct(req, res)
})


export {
    prodRouter  
}