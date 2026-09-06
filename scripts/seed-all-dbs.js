const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const baseUri = "mongodb://arunajyothi:Aruna1234567@cluster0-shard-00-00.urgk8.mongodb.net:27017,cluster0-shard-00-01.urgk8.mongodb.net:27017,cluster0-shard-00-02.urgk8.mongodb.net:27017/{DB}?ssl=true&replicaSet=atlas-13wrt9-shard-0&authSource=admin&appName=Cluster0";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

async function seedBothDbs() {
  const dbs = ["sreevedaa_admin", "visha_it_solutions"];
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("Admin@123*", salt);

  for (const dbName of dbs) {
    const uri = baseUri.replace("{DB}", dbName);
    console.log(`Connecting to ${dbName}...`);
    const conn = await mongoose.createConnection(uri).asPromise();
    const UserModel = conn.model("User", UserSchema);

    const emails = ["admin@vishait.com", "admin@vishaitsolutions.com", "admin@sreevedaa.com"];
    for (const email of emails) {
      await UserModel.findOneAndUpdate(
        { email },
        {
          email,
          passwordHash,
          name: "Visha IT Admin",
          role: "admin",
        },
        { upsert: true, returnDocument: "after" }
      );
      console.log(`[${dbName}] Ensured admin user: ${email}`);
    }
    await conn.close();
  }
  console.log("Done seeding both databases.");
}

seedBothDbs().catch(console.error);
