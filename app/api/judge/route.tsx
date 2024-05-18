import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

import { genrateFile } from "../../../genrateFile";
import { executeCpp } from "../../../executeCpp";
import { executePy } from "../../../executePy";

import bodyParser from "body-parser"; // Import bodyParser

export const middleware = [
  bodyParser.urlencoded({ extended: true }), // Parse URL-encoded bodies
  bodyParser.json(), // Parse JSON bodies
];

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log("body:", body);
  try {
    const { language = "cpp", code } = body;
    if (code === undefined) NextResponse.json("code is not provided");
    const file = await genrateFile(language, code);
    // console.log("file in backend", file);
    let output;
    if (language === "cpp") {
      output = await executeCpp(file);
    } else {
      output = await executePy(file);
    }
    console.log("output", output);
    return NextResponse.json({ status: true, output });
  } catch (error) {
    console.log("getting error", error);
    return NextResponse.json({ status: false, error });
  }
}

