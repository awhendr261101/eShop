import express from 'express';
import path from 'path';
import { connection as db } from './config/index.js';

// 
const app = express();
const port = +process.env.PORT || 4001;
const router = express.Router();

// middleware

app.use(
    router, 
    express.static('./static'),
    express.urlencoded({extended: true})
)

//Token 

// router.use((req, res, next) => {
//     const token = req.headers['authorization'];
//     // validate token
//     if(!token) return res.status(401).json({message: 'Token not provided'});
//     // verify token
//     // check if token is valid
//     // if valid, proceed to next middleware
//     next();
// })

// endpoints
router.get('^/$|/eShop', (req, res) =>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
})

router.get('/Users|/eShop/Users', (req, res) =>{
    try {
        db.query('SELECT firstName, lastName, age FROM Users', (err, data) => {
            if(err) throw new Error("Oops something went wrong");
            res.status(200).json(res.statusCode, data)
        })
    } catch (err) {
        res.json(
            {
                statusCode: 404,
                message: err.message
            }
        )
    }
})

router.get('/User/:id|/eShop/User/:id', (req, res)=> {
    try {
        const { id } = req.params;
        db.query(`SELECT firstName, lastName, age FROM Users WHERE userID = ${id}` , (err, data) => {
            if(err) throw new Error("Oops something went ");
            res.status(200).json(data)
        })
    } catch (err) {
        res.json(
            {
                statusCode: 404,
                message: err.message
            }
        )
    }

})

router.get('*', (req, res)=> {
    res.json(
        {
            statusCode: 404,
            message: 'Page not found'
        }
    )
})

app.listen(port , () => {
    console.log('Server is running on ' + port)
})

