import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
  try {
    // const body = await req.json();
    const response = await client.quesData.deleteMany({});
    console.log(response);
    return NextResponse.json({ message: "data delted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const allQuestions = await client.quesData.findMany();
    console.log(allQuestions);
    return NextResponse.json({ allQuestions });
  } catch (error) {
    return NextResponse.json(error);
  }
}
