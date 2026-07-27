import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { AIThreatAnalysis } from "./ai";

export interface ScanRecord extends AIThreatAnalysis {
  id: string;
  userId: string;
  createdAt: string;
}

// Saves a real scan result to Firestore under the current user's account.
export async function saveScanResult(
  userId: string,
  analysis: AIThreatAnalysis
): Promise<string> {
  const docRef = await addDoc(collection(db, "scans"), {
    ...analysis,
    userId,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

// Fetches this user's real scan history, most recent first.
export async function fetchUserScans(userId: string): Promise<ScanRecord[]> {
  const q = query(
    collection(db, "scans"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      messageId: data.messageId,
      sender: data.sender,
      subject: data.subject,
      threatLevel: data.threatLevel,
      riskScore: data.riskScore,
      confidenceScore: data.confidenceScore,
      threatCategory: data.threatCategory,
      explanation: data.explanation,
      simplifiedExplanation: data.simplifiedExplanation,
      redFlags: data.redFlags || [],
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
    };
  });
}
