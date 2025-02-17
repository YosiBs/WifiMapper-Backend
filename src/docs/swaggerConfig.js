// swaggerConfig.js :

const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WifiMapper API",
      version: "1.0.0",
      description: "API documentation for the WifiMapper backend.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API docs in your routes folder
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
