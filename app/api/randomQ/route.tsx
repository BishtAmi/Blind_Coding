import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import client from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("body:", body);
    const response = await client.quesData.create({
      data: {
        qid: body.qid,
        question: body.question,
        input: body.input,
        output: body.output,
      },
    });
    console.log(response);
    return NextResponse.json({ message: "data added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
