import { getCookie, fetchCsrfToken} from "../utils/csrftoken";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/users`, {
      method: "GET",
    });
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    fetchCsrfToken();

    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data) {
      localStorage.setItem("idToken", data);
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const verifyToken = async () => {
  try {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      throw new Error("No ID token found in localStorage");
    }

    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify token. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      return data;
    } else {
      throw new Error("Invalid token received from the server");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Verification Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    return null;
  }
};

export const authGuard = () => {
  const idToken = localStorage.getItem("idToken");
  if (!idToken) {
    return false;
  }
  return true;
};

export const createUserWithEmailAndPassword = async (
  displayName: string,
  email: string,
  password: string,
) => {
  try {
    // get csrf-token
    fetchCsrfToken();

    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      body: JSON.stringify({ email, password, displayName }),
    });
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Sign up Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const signOut = async () => {
  try {
    await fetch(`${import.meta.env.VITE_APP_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        "Authorization": `Bearer ${localStorage.getItem("idToken")}`,
      },
    });
    localStorage.removeItem("idToken");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Signout Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};