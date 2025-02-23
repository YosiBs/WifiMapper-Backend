const WifiNetworksModel = require("../models/wifi_networks");

const WifiNetworksService = {
  // ✅ Create a new WiFi network
  createWifiNetwork: async (wifiData) => {
    return await WifiNetworksModel.createWifiNetwork(wifiData);
  },

  // ✅ Get a specific WiFi network by BSSID
  getWifiByBssid: async (bssid) => {
    return await WifiNetworksModel.getWifiByBssid(bssid);
  },

  // ✅ Get all WiFi networks
  getAllWifiNetworks: async () => {
    return await WifiNetworksModel.getAllWifiNetworks();
  },

  // ✅ Add a new WiFi scan entry
  addWifiScan: async (scanData) => {
    return await WifiNetworksModel.addWifiScan(scanData);
  },

  // ✅ Get all WiFi scans for a specific BSSID
  getScansByBssid: async (bssid) => {
    return await WifiNetworksModel.getScansByBssid(bssid);
  },

  // ✅ Delete a WiFi network (Cascade deletes scans)
  deleteWifiByBssid: async (bssid) => {
    return await WifiNetworksModel.deleteWifiByBssid(bssid);
  },
};

module.exports = WifiNetworksService;
