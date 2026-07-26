// Parses a manually-submitted email (pasted by the user) into structured
// metadata used by the rest of the app. Replaces the old Gmail-API mock —
// Sentinel AI is scanned on-demand from content the user provides, rather
// than requiring live Gmail OAuth access.

export interface EmailMetadata {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  timestamp: string;
  content: string;
  dkimStatus: "PASS" | "FAIL" | "NONE";
  spfStatus: "PASS" | "FAIL" | "NONE";
  hasAttachments: boolean;
  links: string[];
}

export interface ManualEmailInput {
  sender: string;
  subject: string;
  content: string;
}

const URL_REGEX = /(https?:\/\/[^\s)]+)/g;

export function parseManualEmail(input: ManualEmailInput): EmailMetadata {
  const links = Array.from(new Set(input.content.match(URL_REGEX) || []));

  return {
    id: `manual-${Date.now()}`,
    sender: input.sender.trim(),
    recipient: "you",
    subject: input.subject.trim(),
    timestamp: new Date().toISOString(),
    content: input.content.trim(),
    dkimStatus: "NONE",
    spfStatus: "NONE",
    hasAttachments: false,
    links,
  };
}
