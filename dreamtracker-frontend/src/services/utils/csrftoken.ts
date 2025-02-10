export function getCookie(name: any) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return "";
}

export async function fetchCsrfToken() {
    await fetch(`${import.meta.env.VITE_APP_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
    });
}