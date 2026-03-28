/**
 * Deity configuration types matching orb-backend gods/*.json schema.
 */

/** Full deity configuration -- returned by GET /api/deities/{deity_id} */
export interface DeityConfig {
  id: string;
  name: string;
  title: string;
  voice_id: string;
  system_prompt: string;
  mythology_keywords: string[];
  reading_style: string;
  art_collection: string;
  color_palette: [string, string, string];
  mckee_guidance: string;
}

/** Deity summary -- returned by GET /api/deities (list endpoint) */
export interface DeitySummary {
  id: string;
  name: string;
  title: string;
  color_palette: [string, string, string];
}
