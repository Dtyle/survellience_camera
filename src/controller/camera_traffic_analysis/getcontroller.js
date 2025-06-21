const repo = require("../../repository/camera_traffic_analysis.repo");

exports.getCameraTrafficAnalysis = async (req, res) => {
    try {
        const { camera_id } = req.query;

        const result = await repo.fetchCameraTrafficAnalysis(
            req.sequelize,
            camera_id
        );

        res.status(200).json({
            status: true,
            message: "Camera traffic analysis retrieved successfully.",
            data: result.data,
            totalRecords: result.total
        });
    } catch (error) {
        console.error("Error in getCameraTrafficAnalysis controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
};

