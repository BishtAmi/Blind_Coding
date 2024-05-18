import client from "@/db";
import { NextRequest, NextResponse } from "next/server";

// Define a type for the params object
interface Params {
  qid: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    // Extract qid from query parameters
    const { qid } = params;
    console.log("qid:", qid);
    const qidInt = parseInt(qid, 10);
    const allQuestions = await client.quesData.findMany(); // Fetch all data
    console.log("data:", allQuestions);
    // console.log("data:", allQuestionsJson);
    // Filter the data based on the qid field
    const filteredQuestions = allQuestions.filter(
      (item) => item.qid === qidInt
    );
    console.log("filtered data:", filteredQuestions);
    if (filteredQuestions.length === 0) {
      return NextResponse.json({ error: "No questions found" });
    }

    // Generate a random index to select a question
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);

    // Select a random question based on the random index
    const randomQuestion = filteredQuestions[randomIndex];

    //console.log("questions:", filteredQuestions);
    return NextResponse.json({ randomQuestion });
  } catch (error) {
    return NextResponse.json(error);
  }
}
