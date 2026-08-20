export type DISCDimension = 'D' | 'I' | 'S' | 'C' | 'X';
export type DISCType = 'D' | 'I' | 'S' | 'C';

export interface DISCOption {
  text: string;
  mostType: DISCDimension;
  leastType: DISCDimension;
}

export interface DISCQuestion {
  id: number;
  options: DISCOption[];
}

export interface ParticipantInfo {
  name: string;
  email: string;
  phone: string;
  gender: 'Pria' | 'Wanita';
  age?: string;
  position?: string;
  organization?: string;
  date: string;
}

export interface AnswerSelection {
  mostIndex: number; // 0..3 index in options
  leastIndex: number; // 0..3 index in options
}

export interface DISCTally {
  most: Record<DISCDimension, number>;
  least: Record<DISCDimension, number>;
  change: Record<DISCDimension, number>; // Net = Most - Least
}

export interface DISCProfile {
  code: string;
  title: string;
  summary: string;
  typeCount: string;
  traits: string[];
  jobMatch: string;
}

export interface DISCInterpretation {
  mask?: DISCProfile;
  core?: DISCProfile;
  mirror?: DISCProfile;
  
  // Legacy properties
  primaryType?: DISCType;
  secondaryType?: DISCType;
  title?: string;
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  workEnvironment?: string;
  communicationTips?: string[];
  recommendedRoles?: string[];
  underStress?: string;
}

export interface DISCSubmission {
  id: string;
  referenceCode: string;
  participant: ParticipantInfo;
  answers: Record<number, AnswerSelection>; // question id -> selection
  tally: DISCTally;
  interpretation: DISCInterpretation;
  aiSummary?: string;
  createdAt: string;
  emailSentStatus: 'sent' | 'failed' | 'simulated';
  emailSentTo: string;
}

export interface AdminConfig {
  adminEmail: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom?: string;
  pin: string;
}
