import express from 'express';
import path from 'path';

import bodyParser from 'body-parser';

import { User } from '../model/users.js';


const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.get('/', (req, res) => {
    User.fetchAllUsers(req, res)
})

userRouter.get('/:id', (req, res) => {
    User.fetchUserById(req, res)
})

userRouter.post('/register', async (req, res) => {
    User.registerUser(req, res)
})

userRouter.patch('/:id', async (req, res) => {
    User.updateUser(req, res)
});

userRouter.delete('/:id', async (req, res) => {
    User.deletUser(req, res)
});

export {
    express,
    userRouter
}

