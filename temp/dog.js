const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.send("GET /dog route");
});
router.post("/food", (req, res) => {
    res.send("POST /dog/food route");
});
module.exports = router;