require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const connectDB = require("./config/db");
const securityMiddleware = require("./config/security");
const errorHandler = require("./middleware/errorHandler");
const express = require("express");

const app = express();

app.use(express.json());
securityMiddleware(app);


const PORT = process.env.PORT || 3000;

// Import Routes
const dashboardRoutes = require("./routes/dashboard");
const moduleRoutes = require("./routes/modules");
const whiteBoxRoutes = require("./routes/whitebox");
const authRoutes = require("./routes/auth");
const assessmentRoutes = require("./routes/assessments");
const assetRoutes = require("./routes/assets");
const vulnerabilityRoutes = require("./routes/vulnerabilities");
const userRoutes = require("./routes/users");
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
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const securityScanRoutes = require("./routes/securityScanRoutes");
const findingRoutes = require("./routes/findings");
const auditLogRoutes = require("./routes/auditLogs");
const notificationRoutes = require("./routes/notifications");
const evidenceRoutes = require("./routes/evidence");
const remediationRoutes = require("./routes/remediations");
// Register Routes
app.use("/dashboard", dashboardRoutes);
app.use("/modules", moduleRoutes);
app.use("/whitebox", whiteBoxRoutes);
app.use("/auth", authRoutes);
app.use("/assessments", assessmentRoutes);
app.use("/assets", assetRoutes);
app.use("/vulnerabilities", vulnerabilityRoutes);
app.use("/users", userRoutes);
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
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/security-scans", securityScanRoutes);
app.use("/findings", findingRoutes);
app.use("/audit-logs", auditLogRoutes);
app.use("/notifications", notificationRoutes);
app.use("/evidence", evidenceRoutes);
app.use("/remediations", remediationRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Welcome to CyberLab AI");
});
app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log("CyberLab AI is running on port " + PORT);
});
