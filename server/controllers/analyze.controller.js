import runAxeScan from "../utils/runAxeScan.js";

export const analyzeWebsite = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const results = await runAxeScan(url);
    res.json(results);
  } catch (error) {
    console.error("Scan error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
