import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    // (data.endTime - data.startTime) / 1000; // Calculate time difference in seconds
    // console.log(timeDifference);
    const startTime = new Date(body.startTime);
    const endTime = new Date(body.endTime);
    // Calculate the time difference in milliseconds
    const timeDifferenceInMilliseconds =
      endTime.getTime() - startTime.getTime();

    // Convert the time difference into seconds (for example)
    const timeDifference = timeDifferenceInMilliseconds / 1000;
    console.log("diff: ", timeDifference);
    const response = await client.userData.upsert({
      where: { username: body.username },
      update: {
        username: body.username,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
      create: {
        username: body.username,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        timeDifference: timeDifference,
      },
    });
    console.log(response);
    return NextResponse.json({ message: "data added" });
  } catch (error) {
    console.log(error);
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
