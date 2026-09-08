import { type researchResponse } from "../types/research";

export async function researchTopic(query: string): Promise<researchResponse> {
  const response = await fetch("http://127.0.0.1:8000/research", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: query,
    }),
  });

  if (!response.ok) {
    throw new Error("Research request failed");
  }

  return response.json();
}
