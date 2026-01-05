const School = require("../models/schools.model");
const User = require("../models/users.model");

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

module.exports = {
    getDashboardStats,
};
