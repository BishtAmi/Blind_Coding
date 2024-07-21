import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const { username, totalsec } = body;
    // Save data to the database
    const response = await client.userData.create({
      data: {
        username: username,
        timeDifference: totalsec,
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
