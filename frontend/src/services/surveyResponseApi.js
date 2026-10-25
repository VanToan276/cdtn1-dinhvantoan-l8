
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || `Yêu cầu thất bại (HTTP ${response.status}).`
    );
  }

  return result;
}

export function getSurveyResponses() {
  return request("/survey-responses");
}

export function getSurveyResponseById(id) {
  return request(`/survey-responses/${encodeURIComponent(id)}`);
}

export function createSurveyResponse(data) {
  return request("/survey-responses", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
