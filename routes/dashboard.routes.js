const express = require("express");
const router = express.Router();
const { getDashboardStats, getMenus } = require("../controllers/dashboard.controller");

// GET /api/admin/dashboard/stats
router.get("/stats", getDashboardStats);
router.get("/menus/:role", getMenus);

module.exports = router;
