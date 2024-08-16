import express from 'express';
import path from 'path';
import { connection as db } from './config/index.js';
import { creatToken } from './middleware/authenticateUser.js';

import { compare, hash } from 'bcrypt';
import bodyParser from 'body-parser';

import { User } from './model/users.js';
import { userRouter } from './controller/userController.js';

import { prodRouter } from './controller/productsController.js';

// import { Products } from './model/products.js';


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

// // endpoints
// router.get('^/$|/eShop', (req, res) =>{
//     res.status(200).sendFile(path.resolve('./static/html/index.html'));
// })

// router.get('/Users|/eShop/Users', (req, res) =>{
//     User.fetchAllUsers(req, res)
// })

// router.get('/User/:id|/eShop/User/:id', (req, res)=> {

//     User.fetchUserById(req, res)

// })

// router.post('/register', async (req, res)=> {
//     try {
//         let data = req.body

//         data.pwd = await hash(data.pwd, 12)
//         // payload
//         let user = {email: data.emailAdd, password: data.pwd}
        
//         db.query('INSERT INTO Users SET ?', [data], (err, result) => {
//             if(err){throw new Error("Oops something went wrong");

//             } 
//             else{
//                 const token = creatToken(user)
//                 res.status(200).json({
//                     statusCode: 200,
//                     message: 'User registered successfully',
//                     token
//                 })
//             } 
            
//         })
//     } catch (error) {
        
//     }
// })

// router.patch('/User/:id', async (req, res) => {
//     try {
//         let data = req.body

//         if (data.pwd) {
//             data.pwd = await hash(data.pwd, 12)
//         }
        
//         db.query(`UPDATE Users SET ? WHERE userID = ${req.params.id}`, [data], (err) => {
//             if (err) throw new Error (err);
//             res.json({
//                 status: res.statusCode,
//                 msg: 'User updated successfully'
//             })
//         })
//     } catch (e) {
//         res.json({
//             staus:400,
//             msg:e.message
//         })
//     }
// })

// router.delete('/User/:id', (req, res) => {
//     try {
//         db.query(`DELETE FROM Users WHERE userID = ${req.params.id}`, (err) => {
//             if (err) throw new Error (err);
//             res.json({
//                 status: res.statusCode,
//                 msg: 'User deleted successfully'
//             })
//         })
//     } catch (error) {
        
//     }

// })

// // router.get('*', (req, res)=> {
// //     res.json(
// //         {
// //             statusCode: 404,
// //             message: 'Page not found'
// //         }
// //     )
// // })

// router.post('/login', (req, res)=> {
//     ''
//     try {
//         const { emailAdd, pwd } = req.body
        

//         db.query(`SELECT * FROM Users WHERE emailAdd = '${emailAdd}'`, async (error, result)=>{
//             if (error) throw new Error(error)
//             if(!result?.length){
//                 res.json({
//                     statusCode: 401,
//                     message: 'You have entered an invalid email address'
//                 })
//             } else {
//                 const isvalidPwd = await compare(pwd, result[0].pwd)
//                 if(isvalidPwd){
//                     const token = creatToken({email: emailAdd, password: pwd})
//                     res.status(200).json({
//                         statusCode: req.statusCode,
//                         message: 'Login successful',
//                         token,
//                         result: result[0]
//                     })
//                 } else {
//                     res.json({
//                         status: 401,
//                         msg: 'Invalid password'
//                     })
//                 }
//             }
//         })


//     } catch (error) {
        
//     }
// })


// // Products routes 

// router.get('/products', (req, res) => {
//     Products.fetchAllProducts(req, res)
// })

// router.get('/product/:id', (req, res)=>{
//     Products.fetchOneProduct(req, res)
// })

// router.post('/addProduct', (req, res) => {
//     Products.addProduct(req, res)
// })

// router.patch('/product/:id', (req, res) => {

//     Products.updateProduct(req, res)

// })

// router.delete('/product/:id', (req, res) => {
//     try {
//         db.query(`DELETE FROM Products WHERE productID = ${req.params.id}`, (err) => {
//             if (err) throw new Error (err);
//             res.json({
//                 status: res.statusCode,
//                 msg: 'Product deleted successfully'
//             })
//         })
//     } catch (error) {
        
//     }
 
// })

app.use('/Users', userRouter)
app.use('/Products', prodRouter)

app.listen(port , () => {
    console.log('Server is running on ' + port)
})

