const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
    {
        schoolId: {
            type: String,
            required: true,
            unique: true,
        },
        schoolName: {
            type: String,
            required: true,
        },
        schoolLogo: {
            type: String,
        },
        schoolDbName: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        schoolAddress: {
            type: String,
        },
        schoolEmail: {
            type: String,
        },
        schoolContact: {
            type: String,
        },
        schoolWebsite: {
            type: String,
        },
        // Attendance Settings - determines which attendance mode the school uses
        attendanceSettings: {
            mode: {
                type: String,
                enum: ["simple", "period_wise", "check_in_out"],
                default: "simple",
            },
            workingHours: {
                start: { type: String, default: "08:00" },
                end: { type: String, default: "16:00" },
            },
            lateThresholdMinutes: {
                type: Number,
                default: 15, // Minutes after start considered late
            },
            halfDayThresholdMinutes: {
                type: Number,
                default: 240, // 4 hours = half day
            },
            periodsPerDay: {
                type: Number,
                default: 8, // For period-wise mode
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("School", schoolSchema);
