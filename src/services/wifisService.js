const LogsModel = require('../models/logs');

const LogsService = {
    createLog: async (logData) => {
        return await LogsModel.createLog(logData);
    },

    getLogById: async (logId) => {
        return await LogsModel.getLogById(logId);
    },

    getLogsByAppId: async (appId) => {
        return await LogsModel.getLogsByAppId(appId);
    },

    getLogsByType: async (appId, type) => {
        return await LogsModel.getLogsByType(appId, type);
    },
    deleteLogsByAppId: async (appId) => {
        return await LogsModel.deleteLogsByAppId(appId);
    },
    

    
};

module.exports = LogsService;
