const pool = require("../config/db");

const WifiLocationService = {
  // ✅ Calculate the estimated location of a WiFi network
  getEstimatedWifiLocation: async (bssid) => {
    const query = `
      SELECT 
        bssid,
        COUNT(*) AS scan_count, -- Count the number of scans used
        SUM(location_lat * (100 + signal_strength)) / SUM(100 + signal_strength) AS estimated_lat,
        SUM(location_lon * (100 + signal_strength)) / SUM(100 + signal_strength) AS estimated_lon
      FROM wifi_scans
      WHERE bssid = $1
      GROUP BY bssid;
    `;

    const result = await pool.query(query, [bssid]);

    return result.rows.length > 0 ? result.rows[0] : null; // Return null if no location data is available
  },
};

module.exports = WifiLocationService;
