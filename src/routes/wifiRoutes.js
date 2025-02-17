const express = require("express");
const LogsController = require("../controllers/logsController");

const router = express.Router();

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId
 *               - userId
 *               - logType
 *             properties:
 *               appId:
 *                 type: string
 *                 description: The application ID
 *               userId:
 *                 type: string
 *                 description: The user ID
 *               logType:
 *                 type: string
 *                 description: Type of log (e.g., "Crash", "DailyLogin")
 *               description:
 *                 type: string
 *                 description: Detailed description of the log
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of the log (optional, defaults to current time if omitted)
 *     responses:
 *       201:
 *         description: Log created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", LogsController.createLog);

/**
 * @swagger
 * /logs/{logId}:
 *   get:
 *     summary: Get a specific log by logId
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the log to retrieve
 *     responses:
 *       200:
 *         description: The log data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 logType:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 description:
 *                   type: string
 *       404:
 *         description: Log not found
 *       500:
 *         description: Internal server error
 */
router.get("/:logId", LogsController.getLogById);

/**
 * @swagger
 * /logs/applications/{appId}:
 *   get:
 *     summary: Get all logs for a specific application
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *     responses:
 *       200:
 *         description: List of logs for the application
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   logId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   logType:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *       404:
 *         description: No logs found for the application
 *       500:
 *         description: Internal server error
 */
router.get("/applications/:appId", LogsController.getLogsByAppId);

/**
 * @swagger
 * /logs/applications/{appId}:
 *   delete:
 *     summary: Delete all logs of an application by appId
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the application whose logs need to be deleted
 *     responses:
 *       200:
 *         description: Logs deleted successfully
 *       404:
 *         description: No logs found for the given appId
 *       500:
 *         description: Internal server error
 */
router.delete("/applications/:appId", LogsController.deleteLogsByAppId);

/**
 * @swagger
 * /logs/applications/{appId}/logType/{type}:
 *   get:
 *     summary: Get logs by log type for a specific application
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of log (e.g., "Crash", "DailyLogin")
 *     responses:
 *       200:
 *         description: List of logs filtered by type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   logId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   logType:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *       404:
 *         description: No logs found for the application and log type
 *       500:
 *         description: Internal server error
 */
router.get("/applications/:appId/logType/:type", LogsController.getLogsByType);

/**
 * @swagger
 * /logs/applications/{appId}/logType/{type}/month/{month}:
 *   get:
 *     summary: Get logs by log type for a specific application and month
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of log (e.g., "Crash", "DailyLogin")
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: The numeric month (1-12)
 *     responses:
 *       200:
 *         description: Logs for the given application, log type, and month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   logId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   logType:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *       400:
 *         description: Invalid month parameter
 *       404:
 *         description: No logs found for the application, log type, and month
 *       500:
 *         description: Internal server error
 */
router.get(
  "/applications/:appId/logType/:type/month/:month",
  LogsController.getLogsByTypeAndMonth
);

module.exports = router;
