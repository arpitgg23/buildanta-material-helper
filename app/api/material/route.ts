import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const material = body.material?.trim();

    // empty input case
    if (!material) {
      return NextResponse.json(
        { error: "Please enter a material name first." },
        { status: 400 }
      );
    }
const completion = await openai.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: `List 3 things a first-time homeowner in Kanpur should check before buying ${material}.`,
    },
  ],
});

    const answer = completion.choices[0].message.content;

    return NextResponse.json({ result: answer });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the response. Please try again." },
      { status: 500 }
    );
  }
}