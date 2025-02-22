const LogsService = require("../services/logsService");
const pool = require("../config/db");

const LogsController = {
  // Add a new log
  createLog: async (req, res) => {
    try {
      const { appId, userId, logType, description, timestamp } = req.body;

      if (!appId || !logType || !userId) {
        return res
          .status(400)
          .json({ error: "Missing required fields: appId or logType" });
      }

      const log = await LogsService.createLog({
        appId,
        userId,
        logType,
        description,
        timestamp: timestamp || undefined, // Ensure undefined is passed if timestamp is not provided
      });

      res.status(201).json(log);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get a specific log by logId
  getLogById: async (req, res) => {
    try {
      const { logId } = req.params;
      const log = await LogsService.getLogById(logId);
      if (!log) {
        return res.status(404).json({ error: "Log not found" });
      }
      res.status(200).json(log);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all logs for an application
  getLogsByAppId: async (req, res) => {
    try {
      const { appId } = req.params;
      const logs = await LogsService.getLogsByAppId(appId);
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get logs by log type for an application
  getLogsByType: async (req, res) => {
    try {
      const { appId, type } = req.params;
      const logs = await LogsService.getLogsByType(appId, type);
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteLogsByAppId: async (req, res) => {
    try {
      const { appId } = req.params;

      // Call service function to delete logs
      const deletedCount = await LogsService.deleteLogsByAppId(appId);

      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: `No logs found for appId: ${appId}` });
      }

      res.status(200).json({
        message: `Successfully deleted ${deletedCount} logs for appId: ${appId}`,
      });
    } catch (error) {
      console.error("Error deleting logs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getLogsByTypeAndMonth: async (req, res) => {
    try {
      const { appId, type, month } = req.params;
      const numericMonth = parseInt(month, 10);

      // Validate the month input
      if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
        return res
          .status(400)
          .json({ error: "Invalid month. Use a value between 1 and 12." });
      }

      const query = `
                SELECT logid, appid, userid, logtype, timestamp, description
                FROM public.logs
                WHERE appid = $1 
                AND logtype = $2 
                AND EXTRACT(MONTH FROM "timestamp") = $3
                ORDER BY timestamp DESC;
            `;

      const { rows } = await pool.query(query, [appId, type, numericMonth]);

      if (!rows || rows.length === 0) {
        return res.status(404).json({
          message:
            "No logs found for the given application, log type, and month.",
        });
      }

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching logs by type and month:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get logs for an application within a time interval
};

module.exports = LogsController;
