import mongoose from "mongoose";
import User from "../model/userSchema";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../model/SecretToken");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

const adminSeed = [
  {
    email: "shalu.s.davy@gmail.com",
    username: "shalu s davy",
    password: "123",
  },
];

const adminRegister = async (req, res) => {
  try {
    const { email, username, password } = adminSeed[0];
    const hashPassword = await bcrypt.hash(password, 12);
    const registration = {
      username,
      email,
      password: hashPassword,
    };
    await User.deleteMany({});
    const seedDB = await User.insertMany(registration);
    const token = jwt.sign(
      { id: seedDB._id, email },
      process.env.TOKEN_KEY
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { connectToDatabase, adminRegister };



































































// const seedDB = async () => {
//   try {
//     await User.deleteMany({});
//     await User.insertMany(seedProducts);
//     console.log("Database seeded successfully");
//   } catch (error) {
//     console.error("Error seeding database:", error.message);
//   }
// };

































































































// connectToDatabase()
//   .then(() => seedDB())
//   .then(() => mongoose.connection.close())
//   .catch((error) => console.error("Error:", error));

// // ======================================================
// // admin signup

// const saltRounds = 10;
// const adminHandler = async (req, res, next) => {
//   try {
//     const { email, username, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const adminCheck = await User.create({
//       email,
//       username,
//       password: await bcrypt.hash(password, saltRounds),
//     });

//     const token = createSecretToken(adminCheck._id);
//     console.log("token is:", token);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res.status(200).json({
//       message: "Admin signed in successfully",
//       success: true,
//       adminCheck,
//     });

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error", success: false });
//   }
// };

// module.exports = {
//   adminHandler,
// };
