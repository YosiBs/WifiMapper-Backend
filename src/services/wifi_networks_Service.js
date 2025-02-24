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

  // ✅ Delete a WiFi network (Cascade deletes scans)
  deleteWifiByBssid: async (bssid) => {
    return await WifiNetworksModel.deleteWifiByBssid(bssid);
  },
};

module.exports = WifiNetworksService;
