const analyticsRepo = require('../../repository/camera_analytics.repo');

exports.getCameraAnalytics = async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date || new Date().toISOString().split("T")[0];

        const analytics = await analyticsRepo.fetchCameraAnalytics(req.sequelize, targetDate);

        res.status(200).json({
            status: true,
            message: "Camera analytics retrieved successfully.",
            data: analytics,
        });
    } catch (error) {
        console.error("Error in getCameraAnalytics controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
