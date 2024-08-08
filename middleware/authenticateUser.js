import 'dotenv/config'

import jwt from 'jsonwebtoken'

const {sign , verify } = jwt

function creatToken(user) {
    return sign({
        emailAdd : user.emailAdd,
        pwd : user.pwd
    }, 
    
    process.env.SECRET_KEY,
    { 
        expiresIn: '1h'
    
    })
}

function verifyToken(req, res, next) {
    const token = req?.headers['authorization']
    if(token){
        if (verify(token, process.env.SECRET)) {
            next()
        }else{
            res?.json({
                status : res.statusCode,
                msg : "please provide a valid credentials"
            })
        }
        
    } else {
        res?.json({
            status : res.statusCode,
            msg: "Please login"
        })
    }
}

export {
    creatToken,
    verifyToken
}