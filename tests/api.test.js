const request = require("supertest");
const app = require("../src/app"); // Import Express app

describe("WiFi Networks API", () => {
  let testBSSID = "00:1A:2B:3C:4D:5E";

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

  //   // ✅ Test fetching all WiFi networks
  //   it("should get all WiFi networks", async () => {
  //     const response = await request(app).get("/api/wifi");
  //     expect(response.status).toBe(200);
  //     expect(Array.isArray(response.body)).toBe(true);
  //   });

  //   // ✅ Test fetching a specific WiFi network
  //   it("should get a WiFi network by BSSID", async () => {
  //     const response = await request(app).get(`/api/wifi/${testBSSID}`);
  //     expect(response.status).toBe(200);
  //     expect(response.body.bssid).toBe(testBSSID);
  //   });

  //   // ✅ Test deleting a WiFi network
  //   it("should delete a WiFi network", async () => {
  //     const response = await request(app).delete(`/api/wifi/${testBSSID}`);
  //     expect(response.status).toBe(200);
  //   });
  // ✅ Cleanup after all tests in this suite
  // ✅ Cleanup after all tests in this suite
  afterAll(async () => {
    try {
      console.log("Running Cleanup..."); // ✅ Debugging
      await pool.query("DELETE FROM wifi_networks WHERE bssid = $1", [
        testBSSID,
      ]);
      console.log("Cleanup Successful!"); // ✅ Debugging
    } catch (error) {
      console.error("Cleanup Error:", error); // ✅ Debugging
    } finally {
      await pool.end(); // ✅ Close DB connection to prevent Jest from hanging
    }
  });
});

// describe("WiFi Scans API", () => {
//   let testBSSID = "00:1A:2B:3C:4D:5E";

//   // ✅ Test creating a new WiFi scan
//   it("should create a new WiFi scan", async () => {
//     const response = await request(app).post("/api/wifi-scans").send({
//       bssid: testBSSID,
//       signal_strength: -50,
//       device_id: "device123",
//       location_lat: 37.7749,
//       location_lon: -122.4194,
//     });

//     expect(response.status).toBe(201);
//     expect(response.body.bssid).toBe(testBSSID);
//   });

//   // ✅ Test fetching scans for a specific BSSID
//   it("should get all WiFi scans for a BSSID", async () => {
//     const response = await request(app).get(`/api/wifi-scans/${testBSSID}`);
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });

//   // ✅ Test deleting scans for a specific BSSID
//   it("should delete all scans for a BSSID", async () => {
//     const response = await request(app).delete(`/api/wifi-scans/${testBSSID}`);
//     expect(response.status).toBe(200);
//   });
// });
