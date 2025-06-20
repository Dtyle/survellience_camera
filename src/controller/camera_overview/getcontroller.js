const cameraStatusRepo = require('../../repository/camera_overview.repo');

exports.getCameraOverview = async (req, res) => {
    try {
        const { date } = req.query;
        const targetDate = date || new Date().toISOString().split("T")[0]; // default to today

        // Fetch data from the repository
        const cameraOverview = await cameraStatusRepo.fetchCameraOverview(req.sequelize, targetDate);

        // Respond with the calculated totals
        res.status(200).json({
            status: true,
            message: "Camera overview retrieved successfully.",
            data: cameraOverview,
        });
    } catch (error) {
        console.error("Error in getCameraOverview controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};
