const express = require("express");
const router = express.Router();
const Vulnerability = require("../models/Vulnerability");

// --- Search vulnerabilities (fuzzy across multiple fields) ---
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const results = await Vulnerability.find({
      $or: [
        { vuln_name: { $regex: q, $options: "i" } },
        { aliases: { $regex: q, $options: "i" } },
        { owasp_category: { $regex: q, $options: "i" } },
        { cwe_id: { $regex: q, $options: "i" } },
        { cwe_name: { $regex: q, $options: "i" } },
      ],
    }).limit(20);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// GET /api/vulns/suggest?q=...
router.get("/suggest", async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q) return res.json([]);

    const suggestions = await Vulnerability.find(
      { vuln_name: { $regex: q, $options: "i" } }, 
      "vuln_name" 
    ).limit(5);

    res.json(suggestions.map(s => s.vuln_name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// --- Get all vulnerabilities ---
router.get("/", async (req, res) => {
  const vulns = await Vulnerability.find();
  res.json(vulns);
});

// --- Update vulnerability ---
router.put("/:id", async (req, res) => {
  try {
    const updatedVuln = await Vulnerability.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedVuln) return res.status(404).json({ error: "Not found" });
    res.json(updatedVuln);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
