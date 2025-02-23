-- init.sql :

-- Ensure uuid-ossp extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- WiFi Networks Table (BSSID as PRIMARY KEY)
CREATE TABLE IF NOT EXISTS wifi_networks (
    bssid TEXT PRIMARY KEY,  -- Router MAC Address (Now the unique identifier)
    ssid TEXT NOT NULL,  -- WiFi Network Name
    security TEXT,  -- Security Type (WPA2, WPA3, Open)
    frequency INT,  -- WiFi Frequency (e.g., 2400, 5000 MHz)
    standard TEXT,  -- WiFi Standard (e.g., 802.11ax)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When this WiFi was first detected
);

-- WiFi Scans Table (Referencing BSSID Instead of UUID)
CREATE TABLE IF NOT EXISTS wifi_scans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  -- Unique Scan ID
    bssid TEXT REFERENCES wifi_networks(bssid) ON DELETE CASCADE,  -- Link to WiFi Network
    signal_strength INT,  -- Signal strength in dBm (-30 strong, -90 weak)
    scan_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When scan was recorded
    device_id TEXT,  -- Identifier for the device that recorded the scan (optional)
    location_lat DECIMAL(9,6),  -- Latitude (if GPS is enabled)
    location_lon DECIMAL(9,6)   -- Longitude (if GPS is enabled)
);
