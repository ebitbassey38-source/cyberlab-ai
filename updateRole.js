require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const updateRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({
      email: "ebitbassey38@gmail.com",
    });

    if (!user) {
      console.log("User not found");
      process.exit();
    }

    user.role = "admin";
    await user.save();

    console.log("User role updated to admin");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

updateRole();
