import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("👋 Welcome to the Accessibility Analyzer API!");
});

export default app;
