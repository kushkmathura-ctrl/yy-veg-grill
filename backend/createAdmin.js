const dns = require("dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hash = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hash,
    });

    await admin.save();

    console.log("✅ Admin Created");

    process.exit();
  })
  .catch((err) => console.log(err));