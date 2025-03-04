x=15
print(x)

import json

# Example WiFi Scans Data
wifi_scans = [
  {
    "id": "0e1aea96-779a-4afa-abe6-4141e7efeed3",
    "bssid": "b0:bb:e5:83:61:55",
    "signal_strength": -36,
    "scan_timestamp": "2025-02-27T23:11:32.950Z",
    "device_id": "device555",
    "location_lat": "31.963632705834144",
    "location_lon": "34.769508853105805"
  },
  {
    "id": "a502461e-5647-46af-8e8f-b51df21134e9",
    "bssid": "b0:bb:e5:83:61:55",
    "signal_strength": -36,
    "scan_timestamp": "2025-02-27T23:11:31.170Z",
    "device_id": "device123",
    "location_lat": "31.963747187956486",
    "location_lon": "34.76964431354793"
  },
  {
    "id": "5058a8b8-ca19-4b1e-9105-98bab7cde922",
    "bssid": "b0:bb:e5:83:61:55",
    "signal_strength": -36,
    "scan_timestamp": "2025-02-27T23:11:29.629Z",
    "device_id": "device123",
    "location_lat": "31.96386959560681",
    "location_lon": "34.769506777083166"
  },

]

# Convert to GeoJSON format
geojson = {
    "type": "FeatureCollection",
    "features": []
}

for scan in wifi_scans:
    feature = {
        "type": "Feature",
        "properties": {
            "id": scan["id"],
            "bssid": scan["bssid"],
            "signal_strength": scan["signal_strength"],
            "scan_timestamp": scan["scan_timestamp"],
            "device_id": scan["device_id"]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [float(scan["location_lon"]), float(scan["location_lat"])]
        }
    }
    geojson["features"].append(feature)

# Print the GeoJSON output
print(json.dumps(geojson, indent=2))
with open("src/utils/output.geojson", "w") as f:
    json.dump(geojson, f, indent=2)




