const multer = require("multer");
const path = require("path");
const authJWt = require("../utils/auth");

const cameraController = require("../controller/add_camera/createcontroller.js");

module.exports = (app) => {
    app.post(
        "/add_camera",
        [authJWt.verifyToken],
        cameraController.addCamera
    );

      app.post(
        "/upload_camera_excel",
        [authJWt.verifyToken, upload.single("file")],
        cameraController.bulkUploadCameraExcel
    );
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".xlsx") {
            return cb(new Error("Only .xlsx files are allowed"));
        }
        cb(null, true);
    }
});
