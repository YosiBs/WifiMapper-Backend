const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerConfig");
const cors = require("cors");

const developersRoutes = require("./routes/developersRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// API Routes

app.use("/api/developers", developersRoutes);

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
