const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const collegeRoutes = require("./routes/colleges");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/colleges", collegeRoutes);

const collegeRoutes = require("./routes/colleges");

app.use("/colleges", collegeRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});