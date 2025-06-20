const authJWt = require("../utils/auth.js");
const analyticsController = require("../controller/camera_analytics/getcontroller.js");

module.exports = (app) => {
    app.get(
        "/camera_analytics",
        [authJWt.verifyToken],
        analyticsController.getCameraAnalytics
    );
};
