const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kushkmathura_db_user:Kush12345@cluster0.jlnuibj.mongodb.net/?appName=Cluster0",
      {
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log("✅ MongoDB Connected");
    process.exit(0);
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    process.exit(1);
  }
})();