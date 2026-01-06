const School = require("../models/schools.model");
const User = require("../models/users.model");
const Menu = require("../models/menu.model");
const adminModel = require("../models/admin.model");

// Get dashboard stats
const getDashboardStats = async (req, res) => {
    try {
        // Get total schools count
        const totalSchools = await School.countDocuments();

        // Get total users (school admins) count
        const totalUsers = await User.countDocuments();

        // Get active schools count
        const activeSchools = await School.countDocuments({ status: "active" });

        // Get active users count
        const activeUsers = await User.countDocuments({ status: "active" });

        res.status(200).json({
            success: true,
            data: {
                totalSchools,
                totalUsers,
                activeSchools,
                activeUsers,
            },
        });
    } catch (error) {
        console.error("Error getting dashboard stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get dashboard stats",
            error: error.message,
        });
    }
};

const getMenus = async (req, res) => {
    try {
        const { role } = req.params;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required to fetch menus",
            });
        }

        const user = await adminModel.findOne({ role });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Match menus either by role or explicit username in the access list
        const accessTokens = [user.role].filter(Boolean);

        const menus = await Menu.find({
            menuAccessRoles: { $in: accessTokens },
        }).sort({ menuOrder: 1 });

        return res.status(200).json({
            success: true,
            message: "Menus fetched successfully",
            data: menus,
            count: menus.length,
        });
    } catch (error) {
        console.error("Error fetching menus:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch menus",
            error: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
    getMenus,
};
