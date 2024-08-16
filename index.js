import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { User } from './model/users.js';
import { userRouter } from './controller/userController.js';

import { prodRouter } from './controller/productsController.js';



const app = express();
const port = +process.env.PORT || 4001;
const router = express.Router();

// middleware

app.use(
    router, 
    express.static('./static'),
    express.urlencoded({extended: true}), 
    
)

// endpoints
router.get('^/$|/eShop', (req, res) =>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
})



app.use('/Users', userRouter)
app.use('/Products', prodRouter)

app.listen(port , () => {
    console.log('Server is running on ' + port)
})

