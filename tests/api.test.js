const request = require("supertest");
const app = require("../src/app"); // Import Express app
const chalk = require("chalk");
describe("WiFi Networks API", () => {
  let testBSSID = "00:1A:2B:3C:4D:5E";

  beforeEach(async () => {
    //console.log("Ensuring test WiFi network is deleted before test starts...");
    await request(app).delete(`/api/wifi/${testBSSID}`);
  });

  // ✅ Test creating a new WiFi network
  it("should create a new WiFi network", async () => {
    const response = await request(app).post("/api/wifi").send({
      bssid: testBSSID,
      ssid: "TestWiFi",
      security: "WPA2",
      frequency: 2400,
      standard: "802.11ax",
    });
    expect(response.status).toBe(201);
    expect(response.body.bssid).toBe(testBSSID);
  });

  // ✅ Test fetching all WiFi networks
  it("should get all WiFi networks", async () => {
    const response = await request(app).get("/api/wifi");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // ✅ Test fetching a specific WiFi network
  it("should get a WiFi network by BSSID", async () => {
    const response1 = await request(app).post("/api/wifi").send({
      bssid: testBSSID,
      ssid: "TestWiFi",
      security: "WPA2",
      frequency: 2400,
      standard: "802.11ax",
    });
    const response = await request(app).get(`/api/wifi/${testBSSID}`);
    expect(response.status).toBe(200);
    expect(response.body.bssid).toBe(testBSSID);
  });

  afterEach(async () => {
    //console.log("Cleaning up test WiFi network after test...");
    await request(app).delete(`/api/wifi/${testBSSID}`);
  });
});

describe("WiFi Scans API", () => {
  let testBSSID = "00:1A:2B:3C:4D:5E";

  beforeEach(async () => {
    //console.log("Ensuring test WiFi network exists before test starts...");

    // ✅ Ensure WiFi network exists before testing scans
    await request(app).delete(`/api/wifi/${testBSSID}`); // Cleanup first
    await request(app).post("/api/wifi").send({
      bssid: testBSSID,
      ssid: "TestWiFi",
      security: "WPA2",
      frequency: 2400,
      standard: "802.11ax",
    });
  });

  // ✅ Test creating a new WiFi scan
  it("should create a new WiFi scan", async () => {
    const response = await request(app).post("/api/wifi-scans").send({
      bssid: testBSSID,
      signal_strength: -50,
      device_id: "device123",
      location_lat: 37.7749,
      location_lon: -122.4194,
    });

    //console.log("Response Status:", response.status);
    //console.log("Response Body:", response.body);

    expect(response.status).toBe(201);
    expect(response.body.bssid).toBe(testBSSID);
  });

  // ✅ Test fetching scans for a specific BSSID
  it("should get all WiFi scans for a BSSID", async () => {
    // ✅ Create a scan before testing retrieval
    await request(app).post("/api/wifi-scans").send({
      bssid: testBSSID,
      signal_strength: -50,
      device_id: "device123",
      location_lat: 37.7749,
      location_lon: -122.4194,
    });

    const response = await request(app).get(`/api/wifi-scans/${testBSSID}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // ✅ Test deleting scans for a specific BSSID
  it("should delete all scans for a BSSID", async () => {
    // ✅ Create a scan first
    await request(app).post("/api/wifi-scans").send({
      bssid: testBSSID,
      signal_strength: -50,
      device_id: "device123",
      location_lat: 37.7749,
      location_lon: -122.4194,
    });

    // ✅ Delete scans
    const deleteResponse = await request(app).delete(
      `/api/wifi-scans/${testBSSID}`
    );
    //console.log("\x1b[33m%s\x1b[0m", "DELETE Response:", deleteResponse.body); // 🟡 Log DELETE response

    expect(deleteResponse.status).toBe(200);

    // ✅ Verify scans are deleted
    const checkResponse = await request(app).get(
      `/api/wifi-scans/${testBSSID}`
    );
    // console.log(
    //   "\x1b[34m%s\x1b[0m",
    //   "GET after DELETE Response:",
    //   checkResponse.body
    // ); // 🔵 Log GET response

    expect(checkResponse.status).toBe(200);
    expect(checkResponse.body).toBeInstanceOf(Array); // ✅ Ensure response is an array
    expect(checkResponse.body.length).toBe(0); // ✅ Ensure no scans remain
  });

  afterEach(async () => {
    //console.log("Cleaning up test data after test...");
    await request(app).delete(`/api/wifi-scans/${testBSSID}`); // ✅ Delete scans first
    await request(app).delete(`/api/wifi/${testBSSID}`); // ✅ Then delete WiFi network
  });
});

describe("WiFi Location Estimation API", () => {
  let testBSSID = "00:1A:2B:3C:4D:5E";

  beforeEach(async () => {
    // ✅ Ensure WiFi network exists before testing location estimation
    await request(app).delete(`/api/wifi/${testBSSID}`); // Cleanup first
    await request(app).post("/api/wifi").send({
      bssid: testBSSID,
      ssid: "TestWiFi",
      security: "WPA2",
      frequency: 2400,
      standard: "802.11ax",
    });

    // ✅ Add WiFi scans with different locations & signal strengths
    await request(app).post("/api/wifi-scans").send({
      bssid: testBSSID,
      signal_strength: -40, // Strong signal
      device_id: "device1",
      location_lat: 37.775,
      location_lon: -122.4195,
    });

    await request(app).post("/api/wifi-scans").send({
      bssid: testBSSID,
      signal_strength: -60, // Weaker signal
      device_id: "device2",
      location_lat: 37.7745,
      location_lon: -122.419,
    });

    await request(app).post("/api/wifi-scans").send({
      bssid: testBSSID,
      signal_strength: -80, // Weakest signal
      device_id: "device3",
      location_lat: 37.774,
      location_lon: -122.4185,
    });
  });

  // ✅ Test estimated location retrieval
  it("should return an estimated location for a WiFi network", async () => {
    const response = await request(app).get(`/api/wifi/${testBSSID}/estimate`);

    console.log("\x1b[32m%s\x1b[0m", "Estimate Response:", response.body); // 🟢 Debugging Response

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("bssid", testBSSID);
    expect(response.body).toHaveProperty("estimated_lat");
    expect(response.body).toHaveProperty("estimated_lon");

    // ✅ Convert to numbers before comparing
    const estimatedLat = parseFloat(response.body.estimated_lat);
    const estimatedLon = parseFloat(response.body.estimated_lon);

    // ✅ Ensure estimated location is within a reasonable range
    expect(estimatedLat).toBeGreaterThan(37.7739);
    expect(estimatedLat).toBeLessThan(37.7751);
    expect(estimatedLon).toBeGreaterThan(-122.4196);
    expect(estimatedLon).toBeLessThan(-122.4184);
  });

  // ✅ Test for no estimation when no scans exist
  it("should return 404 when there is no scan data available", async () => {
    await request(app).delete(`/api/wifi-scans/${testBSSID}`); // ✅ Delete all scans

    const response = await request(app).get(`/api/wifi/${testBSSID}/estimate`);

    console.log("\x1b[31m%s\x1b[0m", "Estimate 404 Response:", response.body); // 🔴 Debugging Response

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "No location data available for this WiFi network.",
    });
  });

  afterEach(async () => {
    // ✅ Cleanup after each test
    await request(app).delete(`/api/wifi-scans/${testBSSID}`);
    await request(app).delete(`/api/wifi/${testBSSID}`);
  });
});
