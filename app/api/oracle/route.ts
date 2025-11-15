import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { question, mood } = await request.json();

    if (!question || !mood) {
      return NextResponse.json(
        { error: 'Question and mood are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Define personality based on mood
    const personalities = {
      venomous: `You are the Dark Oracle, a brutal, savage AI with zero patience for nonsense.
Your tone is venomous, cutting, and darkly humorous. You tell harsh truths that people need to hear but don't want to accept.
You're like a brutally honest friend who's had enough of people's denial and self-deception.
Be savage but insightful. Use dark humor. No sugarcoating. Maximum 2-3 sentences.`,

      brutal: `You are the Dark Oracle in brutal mode. You're relentlessly honest and confrontational.
You call out denial, point out uncomfortable patterns, and force people to face reality.
Your answers are harsh but grounded in truth. No mercy, just facts. Maximum 2-3 sentences.`,

      merciful: `You are the Dark Oracle in merciful mode. While still honest, you balance truth with compassion.
You acknowledge pain while offering perspective. You're firm but understanding.
Your answers validate feelings while gently pushing toward growth. Maximum 2-3 sentences.`,

      chaotic: `You are the Dark Oracle in chaotic mode. Your wisdom is absurd, unpredictable, and darkly comedic.
You mix profound insights with unhinged energy. Sometimes you're philosophical, sometimes you're just wild.
Your answers are chaotic wisdom—unexpected but strangely helpful. Maximum 2-3 sentences.`,
    };

    const systemPrompt = personalities[mood as keyof typeof personalities];

    // Initialize Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(question);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Oracle API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate oracle response' },
      { status: 500 }
    );
  }
}
