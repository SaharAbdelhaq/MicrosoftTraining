const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/AdminRoute");
const userRouter = require("./routes/UserRoute");
const businessOwnerRouter = require("./routes/BusinessOwnerRoute");
const productRouter = require("./routes/ProductRouter");
const loginRouter = require("./routes/LoginRoute");
const passResetRouter = require("./routes/PassResetRoute");
const { connectToDb } = require("./DataBase/DBConnection");
const cors = require("cors");

// const { connectToDb } = require("./DataBase/DBConnection");
// const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // *

app.use("/admin", adminRouter);
app.use("/businessOwner", businessOwnerRouter);
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/login", loginRouter);
app.use("/support", passResetRouter);

app.use(express.json());

app.listen(9999, () => {
  connectToDb();
  console.log("Server started successfully on port 9999");
});
