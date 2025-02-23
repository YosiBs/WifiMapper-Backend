const WifiNetworksService = require("../services/wifi_networks_Service");
const pool = require("../config/db");

const WifiNetworksController = {
  // Add a new WiFi network
  createWifiNetwork: async (req, res) => {
    try {
      const { bssid, ssid, security, frequency, standard } = req.body;

      if (!bssid || !ssid) {
        return res
          .status(400)
          .json({ error: "Missing required fields: bssid or ssid" });
      }

      const wifiNetwork = await WifiNetworksService.createWifiNetwork({
        bssid,
        ssid,
        security,
        frequency,
        standard,
      });

      res.status(201).json(wifiNetwork);
    } catch (error) {
      console.error("Error creating WiFi network:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get a WiFi network by BSSID
  getWifiByBssid: async (req, res) => {
    try {
      const { bssid } = req.params;
      const wifiNetwork = await WifiNetworksService.getWifiByBssid(bssid);

      if (!wifiNetwork) {
        return res.status(404).json({ error: "WiFi network not found" });
      }

      res.status(200).json(wifiNetwork);
    } catch (error) {
      console.error("Error fetching WiFi network:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all WiFi networks
  getAllWifiNetworks: async (req, res) => {
    try {
      const wifiNetworks = await WifiNetworksService.getAllWifiNetworks();
      res.status(200).json(wifiNetworks);
    } catch (error) {
      console.error("Error fetching WiFi networks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all scans for a specific BSSID
  getScansByBssid: async (req, res) => {
    try {
      const { bssid } = req.params;
      const scans = await WifiNetworksService.getScansByBssid(bssid);

      if (!scans || scans.length === 0) {
        return res
          .status(404)
          .json({ message: "No scans found for this BSSID." });
      }

      res.status(200).json(scans);
    } catch (error) {
      console.error("Error fetching WiFi scans:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete a WiFi network (Cascade deletes its scans too)
  deleteWifiByBssid: async (req, res) => {
    try {
      const { bssid } = req.params;
      const deletedCount = await WifiNetworksService.deleteWifiByBssid(bssid);

      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: `No WiFi network found for BSSID: ${bssid}` });
      }

      res.status(200).json({
        message: `Successfully deleted WiFi network and related scans for BSSID: ${bssid}`,
      });
    } catch (error) {
      console.error("Error deleting WiFi network:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = WifiNetworksController;
