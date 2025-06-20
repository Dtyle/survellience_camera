const authJWt = require("../utils/auth.js");
const getcontroller = require("../controller/camera_overview/getcontroller.js");

// Route setup
module.exports = (app) => {
    app.get(
        "/camera_overview", 
        [authJWt.verifyToken],
        getcontroller.getCameraOverview
    );
};
