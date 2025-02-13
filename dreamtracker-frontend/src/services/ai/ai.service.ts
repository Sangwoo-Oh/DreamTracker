import { fetchCsrfToken, getCookie } from "../utils/csrftoken";

export const getAISuggestedItems = async (data: any) => {
  try {
    fetchCsrfToken();

    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/api/gemini/suggested`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("GetAISuggestedItems Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};
