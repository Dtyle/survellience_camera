const cameraRepo = require("../../repository/camera.repo");
const XLSX = require("xlsx");
exports.addCamera = async (req, res) => {
    try {
        const { camera_id, camera_name, camera_location, rtsp_url } = req.body;

        if (!(camera_id && camera_name && camera_location && rtsp_url)) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }

        const result = await cameraRepo.insertCamera(req.sequelize, {
            camera_id,
            camera_name,
            camera_location,
            camera_url: rtsp_url,
        });

        res.status(200).json({
            status: true,
            message: "Camera added successfully",
            data: result
        });

    } catch (error) {
        console.error("Error in addCamera controller:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.bulkUploadCameraExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: false, message: "No file uploaded" });
        }

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        if (!data.length) {
            return res.status(400).json({ status: false, message: "Excel file is empty" });
        }

        const formattedData = data.map(row => ({
            camera_id: row.camera_id,
            camera_name: row.camera_name,
            camera_location: row.camera_location,
            camera_url: row.rtsp_url
        }));

        const insertResult = await cameraRepo.bulkInsertCameras(req.sequelize, formattedData);

        res.status(200).json({
            status: true,
            message: "Bulk camera upload successful",
            insertedRows: insertResult
        });

    } catch (error) {
        console.error("Error in bulkUploadCameraExcel:", error);
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
};