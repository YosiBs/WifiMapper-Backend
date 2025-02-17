-- init.sql :

-- Ensure uuid-ossp extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Wifi Table
CREATE TABLE IF NOT EXISTS public.wifi (
    BSSID TEXT PRIMARY KEY,
    SSID TEXT NOT NULL,
    Strength TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
);
