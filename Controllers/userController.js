import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const secret_key = process.env.SECRET_KEY;

export default {
  userSignup: async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const contact_no = req.body.contact_no;
    const role = req.body.role;
    if (!name || !email || !password) {
      res.send({ message: "All field are required!", status: 400 });
      return;
    }
    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.send({ message: "User allreeady exists", status: 400 });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          age: age,
          contact_no: contact_no,
          role: role,
        });
        await newUser.save();
        res.send({ message: "User registered successfully.", status: 200 });
      }
    } catch (error) {
      res.send({ message: "Some Error occured...", status: 500 });
    }
  },
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send({ message: "All field are required!", status: 400 });
      return;
    }
    try {
      let existingUser = await User.findOne({ email: email });
      //    console.log(existingUser.email)

      if (!existingUser || existingUser.password != password) {
        res.send({ message: "Invalid user email or password", status: 400 });
      } else {
        const token = jwt.sign(
          {
            userId: existingUser._id,
            name: existingUser.name,
            role: existingUser.role,
          },
          secret_key,
          { expiresIn: "1h" }
        );
        // console.log(existingUser.email)
        // console.log(existingUser._id)
        // res.send("user login")
        res.status(200).json({ data: { token: token } });
      }
    } catch (error) {
      res.send({ message: "Something went wrong", status: 500 });
    }
  },
  findPost: async (req, res) => {
    const role = req.user.role;
    if (role != "user") {
      res.json({
        message:
          "Only user can see a post ,admin are not allowed to see particular post",
      });
      return;
    }

    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User id is required for finding user's post" });
    }

    try {
      const user = await User.findById(userId).populate("user_post");
      //  console.log(user)
      // const post=await Post.find({user:userId})
      if (!user) {
        res.status(200).json({ message: "user not found" });
      } else {
        res
          .status(200)
          .json({ message: "Posts find successfully", posts: user.user_post });
      }
    } catch (err) {
      // console.log(req.params.userId)
      console.log("error finding for fetching posts", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  usersPost: async (req, res) => {
    const role = req.user.role;
    if (role != "user") {
      res.json({
        message:
          "Only user can see a post ,admin are not allowed to see post",
      });
      return;
    }

    try {
      // const users=await User.find()
      const users = await User.find().populate('user_post'); 
      // console.log(users);
      if (!users) {
        res.send("Some error occured");
      } else {
        const response = users.map((user) => {
          return {
            userId: user._id,
            posts: user.user_post,
          };
        });
        res.status(200).json({ result: response });
      }
    } catch (err) {
      console.log(err.msg);
      res.send("Internal server error");
    }
  },
};
