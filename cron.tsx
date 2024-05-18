const cron = require("node-cron");
import client from "@/db";

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

console.log("Cron job scheduled");
