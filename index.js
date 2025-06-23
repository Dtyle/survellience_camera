const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sequelizeMiddleware = require('./src/middlewares/sequelize.js')
const authMiddleware = require('./src/middlewares/auth.js')

// const SetGobalMasters = require("./src/utils/setGobalMasters.js");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(sequelizeMiddleware())
app.use(authMiddleware)
app.use(bodyParser.json());

// Middleware to parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to metrix api-application." });
});


// import gobal function
// SetGobalMasters.findAllLanguagesMaster();

// Import and use routes
require("./src/routes/admin_login.routes.js")(app);
require("./src/routes/camera_overview.route.js")(app);
require("./src/routes/camera_analytics.route.js")(app);
require("./src/routes/camera_traffic_analysis.route.js")(app);
require("./src/routes/camera.route.js")(app);
// Set the port and start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
