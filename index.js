import express from 'express';
import path from 'path';
import { connection as db } from './config/index.js';
import { creatToken } from './middleware/authenticateUser.js';

import { hash } from 'bcrypt';
import bodyParser from 'body-parser';

const app = express();
const port = +process.env.PORT || 4001;
const router = express.Router();

// middleware

app.use(
    router, 
    express.static('./static'),
    express.urlencoded({extended: true}), 
    
)

router.use(bodyParser.json())

// endpoints
router.get('^/$|/eShop', (req, res) =>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
})

router.get('/Users|/eShop/Users', (req, res) =>{
    try {
        db.query('SELECT * FROM Users', (err, data) => {
            if(err) throw new Error(err);
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

router.post('/register', async (req, res)=> {
    try {
        let data = req.body

        data.pwd = await hash(data.pwd, 12)
        // payload
        let user = {email: data.emailAdd, password: data.pwd}
        
        db.query('INSERT INTO Users SET ?', [data], (err, result) => {
            if(err){throw new Error("Oops something went wrong");

            } 
            else{
                const token = creatToken(user)
                res.status(200).json({
                    statusCode: 200,
                    message: 'User registered successfully',
                    token
                })
            } 
            
        })
    } catch (error) {
        
    }
})

router.patch('/User/:id', async (req, res) => {
    try {
        let data = req.body

        if (data.pwd) {
            data.pwd = await hash(data.pwd, 12)
        }
        
        db.query(`UPDATE Users SET ? WHERE userID = ${req.params.id}`, [data], (err) => {
            if (err) throw new Error (err);
            res.json({
                status: res.statusCode,
                msg: 'User updated successfully'
            })
        })
    } catch (e) {
        res.json({
            staus:400,
            msg:e.message
        })
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

