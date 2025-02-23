const pool = require("../config/db");

const WifiScansModel = {
  // ✅ Add a new WiFi scan
  createWifiScan: async ({
    bssid,
    signal_strength,
    device_id,
    location_lat,
    location_lon,
  }) => {
    const query = `
            INSERT INTO wifi_scans (bssid, signal_strength, device_id, location_lat, location_lon)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

    const values = [
      bssid,
      signal_strength,
      device_id,
      location_lat,
      location_lon,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // ✅ Get all scans for a specific BSSID
  getScansByBssid: async (bssid) => {
    const query = `
            SELECT * FROM wifi_scans
            WHERE bssid = $1
            ORDER BY scan_timestamp DESC;
        `;

    const result = await pool.query(query, [bssid]);
    return result.rows;
  },

  // ✅ Get all WiFi scans (for analytics/debugging)
  getAllWifiScans: async () => {
    const query = `SELECT * FROM wifi_scans ORDER BY scan_timestamp DESC;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // ✅ Delete all scans for a specific BSSID
  deleteScansByBssid: async (bssid) => {
    const query = `DELETE FROM wifi_scans WHERE bssid = $1 RETURNING *;`;
    const result = await pool.query(query, [bssid]);
    return result.rowCount; // Returns the number of deleted rows
  },
};

module.exports = WifiScansModel;
