const authJWt = require("../utils/auth.js");
const controller = require("../controller/camera_traffic_analysis/getcontroller.js");

module.exports = (app) => {
    app.get(
        "/camera_traffic_analysis",
        [authJWt.verifyToken],
        controller.getCameraTrafficAnalysis
    );
};
