import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
const cron = require("node-cron");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const { username, diff } = body;
    // Save data to the database
    const response = await client.userData.create({
      data: {
        username: username,
        timeDifference: diff,
      },
    });

    console.log(response);

    // Return a success message
    return NextResponse.json({ message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    // Return an error response
    return NextResponse.json(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const userData = await client.userData.findMany({
      orderBy: {
        timeDifference: "asc", // Or 'desc' for descending order
      },
    });
    console.log(userData);
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function deleteData() {
  try {
    const response = await client.userData.deleteMany();
    console.log("data deleted", response);
  } catch (error) {}
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
