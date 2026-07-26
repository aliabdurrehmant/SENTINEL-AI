import { AIThreatAnalysis } from "./ai";

export interface SecurityScanLog {
  id: string;
  userId: string;
  timestamp: string;
  scannedCount: number;
  threatsFound: number;
  status: "CLEAN" | "ACTION TAKEN" | "NEUTRALIZED";
}

export async function saveScanResultMock(analysis: AIThreatAnalysis): Promise<string> {
  return "doc_id_" + Math.random().toString(36).substring(2, 9);
}

export async function fetchScanLogsMock(): Promise<SecurityScanLog[]> {
  return [
    {
      id: "log-1",
      userId: "usr_984221",
      timestamp: "2024-10-24T10:00:00Z",
      scannedCount: 150,
      threatsFound: 0,
      status: "CLEAN",
    },
    {
      id: "log-2",
      userId: "usr_984221",
      timestamp: "2024-10-23T14:30:00Z",
      scannedCount: 312,
      threatsFound: 2,
      status: "ACTION TAKEN",
    },
  ];
}
