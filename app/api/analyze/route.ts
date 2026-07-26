import { NextRequest, NextResponse } from "next/server";

// This is the real system prompt driving Sentinel AI's phishing/threat
// detection feature. It is sent to the Gemini API along with the email
// the user submits for scanning.
const SYSTEM_PROMPT = `You are Sentinel AI, an email security analyst engine. You are given metadata and content from a single email. Your job is to determine whether it is a phishing attempt, a scam, or safe/legitimate email, and explain why.

Analyze the sender address, subject line, body content, and any links provided. Look for common attack indicators: domain spoofing or lookalike domains, mismatched display name vs actual email address, urgency or fear-based language, requests for credentials/payment/personal info, suspicious or shortened links, poor grammar inconsistent with a legitimate organization, and generic greetings from a supposedly known sender.

Respond ONLY with valid JSON (no markdown fences, no commentary) matching exactly this shape:
{
  "threatLevel": "safe" | "warning" | "critical",
  "riskScore": number (0-100),
  "confidenceScore": number (0-1),
  "threatCategory": string (e.g. "Credential Theft", "Invoice Scam", "Legitimate Email"),
  "explanation": string (technical explanation, 2-3 sentences),
  "simplifiedExplanation": string (plain-language explanation a non-technical person would understand, 1-2 sentences),
  "redFlags": string[] (specific indicators found; empty array if none)
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sender, subject, content, links } = body;

    if (!sender || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: sender and subject are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing GEMINI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const userPrompt = `Sender: ${sender}
Subject: ${subject}
Links found in email: ${links && links.length ? links.join(", ") : "none"}
Body content:
${content || "(no body content provided)"}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: userPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return NextResponse.json(
        { error: `AI provider error: ${errText}` },
        { status: 502 }
      );
    }

    const geminiData = await geminiRes.json();
    const rawText: string | undefined =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "AI provider returned no analysis text." },
        { status: 502 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response as JSON.", raw: rawText },
        { status: 502 }
      );
    }

    return NextResponse.json({
      messageId: `scan-${Date.now()}`,
      sender,
      subject,
      threatLevel: parsed.threatLevel ?? "warning",
      riskScore: parsed.riskScore ?? 50,
      confidenceScore: parsed.confidenceScore ?? 0.5,
      threatCategory: parsed.threatCategory ?? "Unknown",
      explanation: parsed.explanation ?? "",
      simplifiedExplanation: parsed.simplifiedExplanation ?? "",
      redFlags: parsed.redFlags ?? [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Unexpected server error: ${err?.message || String(err)}` },
      { status: 500 }
    );
  }
}
