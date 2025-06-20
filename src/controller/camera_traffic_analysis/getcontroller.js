const repo = require("../../repository/camera_traffic_analysis.repo");

exports.getCameraTrafficAnalysis = async (req, res) => {
    try {
        const { camera_id, page = 1, limit = 10 } = req.query;

        const result = await repo.fetchCameraTrafficAnalysis(
            req.sequelize,
            camera_id,
            parseInt(page),
            parseInt(limit)
        );

        res.status(200).json({
            status: true,
            message: "Camera traffic analysis retrieved successfully.",
            data: result.data,
            totalRecords: result.total,
            currentPage: page,
            pageSize: limit,
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
