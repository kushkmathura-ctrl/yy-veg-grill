const http = require("http");
const { Server } = require("socket.io");
const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const orderRoutes = require("./routes/orderRoutes");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
  console.error("FULL ERROR:");
  console.error(err);
});

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running...");
});
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
  origin: true,
  methods: ["GET", "POST", "PUT"],
},
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});