
export enum QuestClass {
  TECH_TITAN = 'Tech Titan',
  PITCH_PROPHET = 'Pitch Prophet',
  MARKETING_MAGE = 'Marketing Mage',
  STRATEGY_SHAMAN = 'Strategy Shaman',
  VENTURE_VANGUARD = 'Venture Vanguard'
}

export interface PlayerStats {
  innovation: number;
  resilience: number;
  leadership: number;
  riskTaking: number;
}

export interface RegistrationData {
  name: string;
  email: string;
  role: string;
  questClass: QuestClass;
  stats: PlayerStats;
  characterBio: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  date: string;
  category: 'Competition' | 'Workshop' | 'Talk';
  image: string;
}
