const express = require("express");
const connectDB = require("./db");
const app = express();
const port = 3000;
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}/\n`
    // "Server api:\n" +
    // "\t(get) user/: get all users\n" +
    // "\t(post) user/: create a user"
  );
});
