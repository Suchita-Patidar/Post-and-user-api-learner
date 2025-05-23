import mongoose from "mongoose";
let Schema=mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  contact_no: {
    type: String,
  },
  role: {
    type: String,
  },
  user_post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
export const User = mongoose.model("User", userSchema);
