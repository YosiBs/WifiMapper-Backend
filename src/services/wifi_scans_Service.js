const WifiScansModel = require("../models/wifi_scans");

const WifiScansService = {
  // ✅ Add a new WiFi scan
  createWifiScan: async (scanData) => {
    return await WifiScansModel.createWifiScan(scanData);
  },

  // ✅ Get all scans for a specific BSSID
  getScansByBssid: async (bssid) => {
    return await WifiScansModel.getScansByBssid(bssid);
  },

  // ✅ Get all WiFi scans (for analytics/debugging)
  getAllWifiScans: async () => {
    return await WifiScansModel.getAllWifiScans();
  },

  // ✅ Delete all scans for a specific BSSID
  deleteScansByBssid: async (bssid) => {
    return await WifiScansModel.deleteScansByBssid(bssid);
  },
};

module.exports = WifiScansService;
