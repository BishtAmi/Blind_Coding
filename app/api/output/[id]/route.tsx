import client from "@/db";
import { NextRequest, NextResponse } from "next/server";

// Define a type for the params object
interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    // Extract id from query parameters
    const { id } = params;
    console.log("id:", id);
    const idInt = parseInt(id, 10);
    const allQuestions = await client.quesData.findMany(); // Fetch all data
    console.log("data:", allQuestions);
    // console.log("data:", allQuestionsJson);
    // Filter the data based on the id field
    const filteredQuestions = allQuestions.filter(
      (item) => item.id === idInt
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
