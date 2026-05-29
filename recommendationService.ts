import { RecommendationFormInputs, RecommendationResponse } from "../types";

export async function fetchRecommendations(
  inputs: RecommendationFormInputs
): Promise<RecommendationResponse> {
  const response = await fetch("/api/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Server error (status ${response.status})`
    );
  }

  return response.json();
}
