const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const collegeRoutes = require("./routes/colleges");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/colleges", collegeRoutes);

// ✅ IMPORTANT for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});