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
    `Example app listening at http://localhost:${port}/\n` +
      "Server api:\n" +
      "\t(get) user/ : get all users\n" +
      "\t(post) user/signup/ : create a user\n" +
      "\t(post) user/signin/ : log in\n" +
      "\t(put) user/ : update user\n" +
      "\t(get) user/cart : get the cart of the user\n" +
      "\t(get) user/password : get one user\n" +
      "\t(get) product/ : get all products\n" +
      "\t(post) product/ : create a product\n" +
      "\t(get) product/:id : get one product\n" +
      "\t(put) product/:id : update one product\n" +
      "\t(delete) product/:id : delete one product"
  );
});
