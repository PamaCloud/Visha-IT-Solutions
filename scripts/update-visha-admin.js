const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function updateAdminCredentials() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas.");

  const salt = await bcrypt.genSalt(10);
  const passwordHashAdmin = await bcrypt.hash("Admin@123*", salt);

  const accounts = [
    { email: "admin@vishait.com", name: "Visha IT Administrator" },
    { email: "admin@vishaitsolutions.com", name: "Visha IT Administrator" },
    { email: "admin@sreevedaa.com", name: "Administrator" },
  ];

  for (const acc of accounts) {
    await User.findOneAndUpdate(
      { email: acc.email },
      {
        email: acc.email,
        passwordHash: passwordHashAdmin,
        name: acc.name,
        role: "admin",
      },
      { upsert: true, returnDocument: "after" }
    );
    console.log(`Updated admin user: ${acc.email} with password: Admin@123*`);
  }

  await mongoose.disconnect();
  console.log("Finished updating admin credentials.");
}

updateAdminCredentials().catch(console.error);
