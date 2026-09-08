export interface Source {
  title: string;
  content: string;
  url: string;
}

export interface researchResponse {
  query: string;
  plan: string[];
  sources: Source[];
  analysis: string;
  critique: string;
  approved: boolean;
  report: string;
}
