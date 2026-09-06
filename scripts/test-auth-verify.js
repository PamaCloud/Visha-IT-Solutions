const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

async function testAuth() {
  const uri = process.env.MONGODB_URI;
  console.log("Testing with URI:", uri.split("@")[1]);
  await mongoose.connect(uri);

  const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
    email: String,
    passwordHash: String,
    name: String,
    role: String
  }));

  const email = "admin@vishait.com";
  const pass = "Admin@123*";

  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email.trim()}$`, "i") }
  });

  console.log("User found in DB:", !!user, user ? user.email : "none");
  if (user) {
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    console.log("Password match for 'Admin@123*':", isMatch);
  }

  await mongoose.disconnect();
}

testAuth().catch(console.error);
