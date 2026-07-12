require("dotenv").config();
const connectDB = require("./config/db");

const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// Import the dashboard routes
const dashboardRoutes = require("./routes/dashboard");
const moduleRoutes = require("./routes/modules");
const whiteBoxRoutes = require("./routes/whitebox");
const authRoutes = require("./routes/auth");
const assetRoutes = require("./routes/assets");
const vulnerabilityRoutes = require("./routes/vulnerabilities");
const scanRoutes = require("./routes/scans");
const reportRoutes = require("./routes/reports");
const complianceRoutes = require("./routes/compliance");
const riskRoutes = require("./routes/risks");
const fileRoutes = require("./routes/files");
const aiRoutes = require("./routes/ai");
const codeReviewRoutes = require("./routes/codeReview");
const whiteBoxTestRoutes = require("./routes/whiteBoxTests");
const blackBoxTestRoutes = require("./routes/blackBoxTests");
const teamExerciseRoutes = require("./routes/teamExercises");
const penTestRoutes = require("./routes/penTests");
const agentRoutes = require("./routes/agent");

// Use the dashboard routes
app.use("/dashboard", dashboardRoutes);
app.use("/modules", moduleRoutes);
app.use("/whitebox", whiteBoxRoutes);
app.use("/auth", authRoutes);
app.use("/assets", assetRoutes);
app.use("/vulnerabilities", vulnerabilityRoutes);
app.use("/scans", scanRoutes);
app.use("/reports", reportRoutes);
app.use("/compliance", complianceRoutes);
app.use("/risks", riskRoutes);
app.use("/files", fileRoutes);
app.use("/ai", aiRoutes);
app.use("/code-review", codeReviewRoutes);
app.use("/whitebox-tests", whiteBoxTestRoutes);
app.use("/blackbox-tests", blackBoxTestRoutes);
app.use("/team-exercises", teamExerciseRoutes);
app.use("/pentests", penTestRoutes);
app.use("/agent", agentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to CyberLab AI");
});

connectDB();

app.listen(PORT, () => {
  console.log("CyberLab AI is running on port " + PORT);
});
