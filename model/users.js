import { connection as db } from "../config/index.js";

import { creatToken } from "../middleware/authenticateUser.js";

import { compare, hash } from "bcrypt";


class User{
    constructor(firstName, lastName, age, emailAdd, pwd){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = +age;
        this.emailAdd = emailAdd;
        this.pwd = pwd;
    }

    // Fetch All Users

    static fetchAllUsers(req, res){
                
        try {
            db.query('SELECT * FROM Users', (err, data) => {
                if(err) throw new Error(err);
                res.status(200).json(res.statusCode, data)
            })
        } catch (err) {
            res.json({
                staus:400,
                err: 'There was an error getting all users'
            })
        }
    }

    // Fetch User By ID
    
    static fetchUserById(req, res){
        try {
            const { id } = req.params;
            return db.query(`SELECT firstName, lastName, age FROM Users WHERE userID = ${id}` , (err, data) => {
                if(err) throw new Error("Oops something went ");
                res.status(200).json(data)
            })
        } catch (err) {
            res.json({
                staus:400,
                err: 'There was an error getting user'
            })
        }
    }

    static async registerUser(req, res){
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
            res.json({
                staus:400,
                err: 'There was an error registering'
            })
        }
    }

    static async updateUser(req, res){
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
                err: 'There was an error updating'
            })
        }
    }

    static deletUser(req, res){
        try {
            db.query(`DELETE FROM Users WHERE userID = ${req.params.id}`, (err) => {
                if (err) throw new Error (err);
                res.json({
                    status: res.statusCode,
                    msg: 'User deleted successfully'
                })
            })
        } catch (error) {
            res.json({
                staus:400,
                err: 'There was an error deleting'
            })
        }
    }

    static login(req, res){
        try {
            const { emailAdd, pwd } = req.body
            
    
            db.query(`SELECT * FROM Users WHERE emailAdd = '${emailAdd}'`, async (error, result)=>{
                if (error) throw new Error(error)
                if(!result?.length){
                    res.json({
                        statusCode: 401,
                        message: 'You have entered an invalid email address'
                    })
                } else {
                    const isvalidPwd = await compare(pwd, result[0].pwd)
                    if(isvalidPwd){
                        const token = creatToken({email: emailAdd, password: pwd})
                        res.status(200).json({
                            statusCode: req.statusCode,
                            message: 'Login successful',
                            token,
                            result: result[0]
                        })
                    } else {
                        res.json({
                            status: 401,
                            msg: 'Invalid password'
                        })
                    }
                }
            })
    
    
        } catch (error) {
            res.json({
                staus:400,
                err: 'There was an error logging in '
            })
        }
    }
}

export{
    User
}