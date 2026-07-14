const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendResponse(
        res,
        400,
        false,
        "Please provide name, email, and password"
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendResponse(
        res,
        400,
        false,
        "User with this email already exists"
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    sendResponse(
      res,
      201,
      true,
      "User registered successfully",
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    );

  } catch (error) {
    next(error);
  }
};


const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(
        res,
        400,
        false,
        "Please provide email and password"
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(
        res,
        401,
        false,
        "Invalid email or password"
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return sendResponse(
        res,
        401,
        false,
        "Invalid email or password"
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    sendResponse(
      res,
      200,
      true,
      "Login successful",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
};
