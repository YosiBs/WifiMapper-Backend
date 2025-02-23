const WifiScansService = require("../services/wifi_scans_Service");

const WifiScansController = {
  // ✅ Add a new WiFi scan
  createWifiScan: async (req, res) => {
    try {
      const { bssid, signal_strength, device_id, location_lat, location_lon } =
        req.body;

      if (!bssid || !signal_strength) {
        return res
          .status(400)
          .json({ error: "Missing required fields: bssid or signal_strength" });
      }

      const wifiScan = await WifiScansService.createWifiScan({
        bssid,
        signal_strength,
        device_id,
        location_lat,
        location_lon,
      });

      res.status(201).json(wifiScan);
    } catch (error) {
      console.error("Error creating WiFi scan:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Get all scans for a specific BSSID
  getScansByBssid: async (req, res) => {
    try {
      const { bssid } = req.params;
      const scans = await WifiScansService.getScansByBssid(bssid);

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

  // ✅ Get all WiFi scans (optional)
  getAllWifiScans: async (req, res) => {
    try {
      const scans = await WifiScansService.getAllWifiScans();
      res.status(200).json(scans);
    } catch (error) {
      console.error("Error fetching all WiFi scans:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // ✅ Delete all scans for a specific BSSID
  deleteScansByBssid: async (req, res) => {
    try {
      const { bssid } = req.params;
      const deletedCount = await WifiScansService.deleteScansByBssid(bssid);

      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: `No scans found for BSSID: ${bssid}` });
      }

      res.status(200).json({
        message: `Successfully deleted ${deletedCount} scans for BSSID: ${bssid}`,
      });
    } catch (error) {
      console.error("Error deleting WiFi scans:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = WifiScansController;
