import express from "express";
import userRouter from "./Routes/userRoute.js";
import { connect } from "./connection.js";
import postRouter from "./Routes/postRoute.js";
import { config } from "dotenv";
config();
connect();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8002;

app.get("/", (req, res) => res.send("Hello from server "));
app.use("/user", userRouter);
app.use("/post", postRouter);
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
