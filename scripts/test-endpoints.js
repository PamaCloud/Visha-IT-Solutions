const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testDatabase() {
  console.log("Connecting to:", MONGODB_URI.split("@")[1]);
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connection verified!");

  const User = mongoose.model("User", new mongoose.Schema({}, { strict: false }));
  const JobApp = mongoose.model("JobApplication", new mongoose.Schema({}, { strict: false }));
  const Service = mongoose.model("Service", new mongoose.Schema({}, { strict: false }));
  const Project = mongoose.model("Project", new mongoose.Schema({}, { strict: false }));
  const Training = mongoose.model("TrainingProgram", new mongoose.Schema({}, { strict: false }));

  const userCount = await User.countDocuments();
  const appCount = await JobApp.countDocuments();
  const serviceCount = await Service.countDocuments();
  const projectCount = await Project.countDocuments();
  const trainingCount = await Training.countDocuments();

  console.log("Counts in DB:");
  console.log("- Admin Users:", userCount);
  console.log("- Job Applications:", appCount);
  console.log("- Services:", serviceCount);
  console.log("- Projects:", projectCount);
  console.log("- Training Programs:", trainingCount);

  const sampleApp = await JobApp.findOne().lean();
  console.log("\nSample Candidate in Database:");
  console.log(`Name: ${sampleApp.fullName}, Position: ${sampleApp.position}, Status: ${sampleApp.status}, Phone: ${sampleApp.phone}, Notes: "${sampleApp.notes || ''}"`);

  await mongoose.disconnect();
  console.log("\nAll database collections verified successfully!");
}

testDatabase().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
