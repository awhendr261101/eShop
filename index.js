import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// import { User } from './model/users.js';
import { userRouter } from './controller/userController.js';

import { prodRouter } from './controller/productsController.js';



const app = express();
const port = +process.env.PORT || 4001;
const router = express.Router();

// middleware

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/Users', userRouter)
app.use('/Products', prodRouter)

app.use(
     
    express.static('./static'),
    express.urlencoded({extended: true}), 
    
)

// endpoints
app.get('^/$|/eShop', (req, res) =>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
})





app.listen(port , () => {
    console.log('Server is running on ' + port)
})

