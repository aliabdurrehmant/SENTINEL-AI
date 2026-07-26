import { EmailMetadata } from "./gmail";

export interface AIThreatAnalysis {
  messageId: string;
  sender: string;
  subject: string;
  threatLevel: "safe" | "warning" | "critical";
  riskScore: number; // 0 - 100
  confidenceScore: number; // e.g. 0.94
  threatCategory: string;
  explanation: string;
  simplifiedExplanation: string;
  redFlags: string[];
}

// Calls Sentinel AI's real analysis endpoint (app/api/analyze), which in turn
// calls the Gemini API with a phishing-detection system prompt. No mock data.
export async function analyzeEmail(
  email: EmailMetadata
): Promise<AIThreatAnalysis> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: email.sender,
      subject: email.subject,
      content: email.content,
      links: email.links,
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || "Failed to analyze email.");
  }

  return res.json();
}
