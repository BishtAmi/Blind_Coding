import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await client.userData.deleteMany({
      where: { id: body.id },
    });
    return NextResponse.json({ message: "data deleted" });
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
