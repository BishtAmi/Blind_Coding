const cron = require("node-cron");
const { client } = require("./db");
const express = require("express");
const app = express();

async function deleteData() {
  try {
    const response = await client.userData.deleteMany();
    console.log("Data deleted", response);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

cron.schedule(
  "0 12 * * *",
  () => {
    console.log("Running deleteData job at 12 PM");
    deleteData();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Indian time
  }
);
const PORT = 10000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
