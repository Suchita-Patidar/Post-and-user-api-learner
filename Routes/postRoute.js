import express from 'express'
// import { createPost, deletePost, fetchPost, findUser } from '../Controllers/postController.js';
import postController from '../Controllers/postController.js'

import auth from '../middlewares/auth.js';


const postRouter = express.Router();

postRouter
    .post("/",auth.authenticate, postController.createPost)
    .get("/",auth.authenticate, postController.fetchPost)
    .delete("/:id", auth.authenticate,postController.deletePost)


export default postRouter;