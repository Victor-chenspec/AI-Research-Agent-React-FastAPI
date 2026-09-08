import { useState } from "react";
import { type researchResponse } from "../types/research";
import { researchTopic } from "../service/researchAPI";

export function useResearch() {
  const [data, setData] = useState<researchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function research(query: string) {
    try {
      setLoading(true);
      setError(null);

      const result = await researchTopic(query);

      setData(result);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return { data, loading, error, research };
}
