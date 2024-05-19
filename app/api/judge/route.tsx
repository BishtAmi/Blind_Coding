import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

import { genrateFile } from "../../../genrateFile";
import { executeCpp } from "../../../executeCpp";
import { executePy } from "../../../executePy";

// Removed bodyParser as it's not needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language = "cpp", code } = body;

    if (!code) {
      return NextResponse.json({
        status: false,
        error: "code is not provided",
      });
    }

    const file = await genrateFile(language, code);
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
    return NextResponse.json({ status: false, error: error });
  }
}
