const pool = require("../config/db");

const WifiNetworksModel = {
  // ✅ Create a new WiFi network (if it doesn't exist)
  createWifiNetwork: async ({ bssid, ssid, security, frequency, standard }) => {
    const query = `
            INSERT INTO wifi_networks (bssid, ssid, security, frequency, standard)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (bssid) DO NOTHING
            RETURNING *;
        `;

    const values = [bssid, ssid, security, frequency, standard];

    const result = await pool.query(query, values);
    return result.rows[0] || { message: "Network already exists" };
  },

  // ✅ Get a specific WiFi network by BSSID
  getWifiByBssid: async (bssid) => {
    const query = `SELECT * FROM wifi_networks WHERE bssid = $1;`;
    const result = await pool.query(query, [bssid]);
    return result.rows[0];
  },

  // ✅ Get all WiFi networks
  getAllWifiNetworks: async () => {
    const query = `SELECT * FROM wifi_networks ORDER BY created_at DESC;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // ✅ Delete a WiFi network (Cascade deletes scans)
  deleteWifiByBssid: async (bssid) => {
    const query = `DELETE FROM wifi_networks WHERE bssid = $1 RETURNING *;`;
    const result = await pool.query(query, [bssid]);
    return result.rowCount;
  },
};

module.exports = WifiNetworksModel;
