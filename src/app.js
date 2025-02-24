// app.js :

const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerConfig");
const cors = require("cors");

const wifiRoutes = require("./routes/wifi_networks_Routes"); // ✅ Import WiFi routes
const wifiScansRoutes = require("./routes/wifi_scans_Routes"); // ✅ Import WiFi Scans routes

const app = express();
app.use(bodyParser.json());
app.use(cors());
// API Routes

app.use("/api/wifi", wifiRoutes); // ✅ Add WiFi routes
app.use("/api/wifi-scans", wifiScansRoutes); // ✅ Add WiFi Scans routes

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
