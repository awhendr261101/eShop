import { connection as db } from "../config/index.js";


class Products{
    constructor(firstName, lastName, age, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    static fetchAllProducts(req,res){
        try {
            db.query('SELECT * FROM Products', (err, result) => {
                if (err) throw new Error(err);
                res.json({
                    statusCode: 200,
                    result
                })
            })
        } catch (error) {
            res.json({
                status: 500,
                msg: 'An error occurred. Please try again later'
            })
        }
    }

    static fetchOneProduct(req, res){
        try {
            const { id } = req.params
    
            db.query(`SELECT * FROM Products WHERE productID = ${id}`, (err, result) => {
                if (err) throw new Error(err);
                res.json({
                    statusCode: 200,
                    result
                })
            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                msg: 'An error occurred. Please try again later'
            })
        }
    }

    static addProduct(req, res){
        try {
            const data = req.body
            
            db.query('INSERT INTO Products SET ?', [data], (err, result) => {
                if (err) throw err
                res.status(200).json({
                    statusCode: 200,
                    message: 'Product added successfully',
                    result
                })
            })
        } catch (error) {
            res.json({
    
            })
        }
    }

    static updateProduct(req, res){
        try {
            let data = req.body
            
            db.query(`UPDATE Products SET ? WHERE productID = ${req.params.id}`, [data], (err) => {
                if (err) throw new Error (err);
                res.json({
                    status: res.statusCode,
                    msg: 'product updated successfully'
                })
            })
        } catch (e) {
            res.json({
                staus:400,
                msg:e.message
            })
        }
    }

    static deleteProduct(req, res){
        try {
            db.query(`DELETE FROM Products WHERE productID = ${req.params.id}`, (err) => {
                if (err) throw new Error (err);
                res.json({
                    status: res.statusCode,
                    msg: 'Product deleted successfully'
                })
            })
        } catch (error) {
            
        }
    }

}

export {
    Products
}