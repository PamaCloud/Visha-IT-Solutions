import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import path from "path";

// Load environment variables
config({ path: path.resolve(process.cwd(), ".env") });

import User from "../src/lib/models/User";
import SiteSetting from "../src/lib/models/SiteSetting";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");

    // Seed Admin
    const adminEmail = "admin@vishait.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash("Admin@123", 10);
      await User.create({
        email: adminEmail,
        passwordHash,
        name: "Admin",
        role: "admin",
      });
      console.log(`Admin user created with email: ${adminEmail} and password: Admin@123`);
    } else {
      console.log("Admin user already exists");
    }

    // Seed SiteSettings
    const existingSettings = await SiteSetting.findOne();
    if (!existingSettings) {
      await SiteSetting.create({
        companyName: "Visha IT Solutions",
        email: "contact@vishait.com",
        phone: "+91 9999999999",
        address: "Hyderabad, India",
        seoDefaults: {
          title: "Visha IT Solutions",
          description: "Technology. Talent. Solutions.",
        }
      });
      console.log("Site settings seeded");
    } else {
      console.log("Site settings already exist");
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
