const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./Db");
const router = require('./routes/productRouter');
const catRouter = require('./routes/catagoryRouter'); 

const path = require("path");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

connectToDatabase();

// Routers
app.use("/", router);
app.use("/category", catRouter);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
