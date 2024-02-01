const bcrypt = require("bcrypt");

const User = require("../model/userSchema");
const { createSecretToken } = require("../model/SecretToken");



const saltRounds = 10;
const signupHandler = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      username,
      password: await bcrypt.hash(password, saltRounds),
    });

    const token = createSecretToken(user._id);

    console.log("token is:", token);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(200)
      .json({ message: "User signed in successfully", success: true, user });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
// Login
const LoginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const token = createSecretToken(user._id);

    console.log(user);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  signupHandler,
  LoginHandler,
};
