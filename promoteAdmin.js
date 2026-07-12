require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const result = await User.updateOne(
    { email: "basseytest@example.com" },
    { role: "admin" }
  );
  console.log(result);
  await mongoose.disconnect();
};

run();
