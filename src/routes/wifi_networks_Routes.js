const express = require("express");
const WifiNetworksController = require("../controllers/wifi_networks_Controller");

const router = express.Router();

/**
 * @swagger
 * /wifi:
 *   post:
 *     summary: Add a new WiFi network
 *     tags: [WiFi Networks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bssid
 *               - ssid
 *             properties:
 *               bssid:
 *                 type: string
 *                 description: The MAC address of the router
 *               ssid:
 *                 type: string
 *                 description: The WiFi network name
 *               security:
 *                 type: string
 *                 description: The security type (WPA2, WPA3, Open)
 *               frequency:
 *                 type: integer
 *                 description: The WiFi frequency (2400, 5000 MHz)
 *               standard:
 *                 type: string
 *                 description: The WiFi standard (e.g., 802.11ax)
 *     responses:
 *       201:
 *         description: WiFi network created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", WifiNetworksController.createWifiNetwork);

/**
 * @swagger
 * /wifi/{bssid}:
 *   get:
 *     summary: Get a specific WiFi network by BSSID
 *     tags: [WiFi Networks]
 *     parameters:
 *       - in: path
 *         name: bssid
 *         required: true
 *         schema:
 *           type: string
 *         description: The BSSID (MAC Address) of the WiFi network
 *     responses:
 *       200:
 *         description: The WiFi network data
 *       404:
 *         description: WiFi network not found
 *       500:
 *         description: Internal server error
 */
router.get("/:bssid", WifiNetworksController.getWifiByBssid);

/**
 * @swagger
 * /wifi:
 *   get:
 *     summary: Get all stored WiFi networks
 *     tags: [WiFi Networks]
 *     responses:
 *       200:
 *         description: List of all WiFi networks
 *       500:
 *         description: Internal server error
 */
router.get("/", WifiNetworksController.getAllWifiNetworks);

/**
 * @swagger
 * /wifi/{bssid}:
 *   delete:
 *     summary: Delete a WiFi network by BSSID (Removes related scans)
 *     tags: [WiFi Networks]
 *     parameters:
 *       - in: path
 *         name: bssid
 *         required: true
 *         schema:
 *           type: string
 *         description: The BSSID of the WiFi network to delete
 *     responses:
 *       200:
 *         description: WiFi network and scans deleted successfully
 *       404:
 *         description: WiFi network not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:bssid", WifiNetworksController.deleteWifiByBssid);

/**
 * @swagger
 * /wifi/{bssid}/estimate:
 *   get:
 *     summary: Get estimated location of a WiFi network
 *     tags: [WiFi Networks]
 *     parameters:
 *       - in: path
 *         name: bssid
 *         required: true
 *         schema:
 *           type: string
 *         description: The BSSID (MAC Address) of the WiFi network
 *     responses:
 *       200:
 *         description: Estimated WiFi location
 *       404:
 *         description: No location data available
 *       500:
 *         description: Internal server error
 */
router.get("/:bssid/estimate", WifiNetworksController.getEstimatedLocation);

module.exports = router;
