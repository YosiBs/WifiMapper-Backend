const express = require("express");
const WifiScansController = require("../controllers/wifi_scans_Controller");

const router = express.Router();

/**
 * @swagger
 * /wifi-scans:
 *   post:
 *     summary: Add a new WiFi scan
 *     tags: [WiFi Scans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bssid
 *               - signal_strength
 *             properties:
 *               bssid:
 *                 type: string
 *                 description: The MAC address of the router
 *               signal_strength:
 *                 type: integer
 *                 description: The signal strength in dBm (-30 is strong, -90 is weak)
 *               device_id:
 *                 type: string
 *                 description: An optional identifier for the scanning device
 *               location_lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of scan location (optional)
 *               location_lon:
 *                 type: number
 *                 format: float
 *                 description: Longitude of scan location (optional)
 *     responses:
 *       201:
 *         description: WiFi scan added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", WifiScansController.createWifiScan);

/**
 * @swagger
 * /wifi-scans/{bssid}:
 *   get:
 *     summary: Get all WiFi scans for a specific BSSID
 *     tags: [WiFi Scans]
 *     parameters:
 *       - in: path
 *         name: bssid
 *         required: true
 *         schema:
 *           type: string
 *         description: The BSSID (MAC Address) of the WiFi network
 *     responses:
 *       200:
 *         description: List of WiFi scan records
 *       404:
 *         description: No scans found for this BSSID
 *       500:
 *         description: Internal server error
 */
router.get("/:bssid", WifiScansController.getScansByBssid);

/**
 * @swagger
 * /wifi-scans:
 *   get:
 *     summary: Get all WiFi scans
 *     tags: [WiFi Scans]
 *     responses:
 *       200:
 *         description: List of all WiFi scans
 *       500:
 *         description: Internal server error
 */
router.get("/", WifiScansController.getAllWifiScans);

/**
 * @swagger
 * /wifi-scans/{bssid}:
 *   delete:
 *     summary: Delete all scans for a specific BSSID
 *     tags: [WiFi Scans]
 *     parameters:
 *       - in: path
 *         name: bssid
 *         required: true
 *         schema:
 *           type: string
 *         description: The BSSID of the WiFi network whose scans should be deleted
 *     responses:
 *       200:
 *         description: WiFi scans deleted successfully
 *       404:
 *         description: No scans found for the given BSSID
 *       500:
 *         description: Internal server error
 */
router.delete("/:bssid", WifiScansController.deleteScansByBssid);

module.exports = router;
