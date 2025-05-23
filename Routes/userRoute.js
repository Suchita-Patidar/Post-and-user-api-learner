import express from 'express'
import userController from '../Controllers/userController.js'
import auth from '../middlewares/auth.js'


const userRouter = express.Router()
userRouter
    .post('/signup', userController.userSignup)
    .post('/login', userController.userLogin)
    .get('/post/:userId',auth.authenticate,userController.findPost)
    .get('/users-post',auth.authenticate,userController.usersPost)

export default userRouter;