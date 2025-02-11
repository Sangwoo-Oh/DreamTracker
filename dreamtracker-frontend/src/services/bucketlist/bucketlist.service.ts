import { fetchCsrfToken, getCookie } from "../utils/csrftoken";

export const getBucketListItems = async () => {
  try {
    fetchCsrfToken();

    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/api/bucketlist`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("GetBucketListItems Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const createBucketListItem = async (title: string) => {
  try {
    fetchCsrfToken();

    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/api/bucketlist`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
        body: JSON.stringify({ title }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("CreateBucketListItem Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const updateBucketListItemTitle = async (id: number, title: string) => {
  try {
    fetchCsrfToken();

    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/api/bucketlist/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
        body: JSON.stringify({ title }),
      }
    );
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("UpdateBucketListItem Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const updateBucketListItemAchieved = async (
  id: number,
  is_achived: boolean
) => {
  try {
    fetchCsrfToken();
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/api/bucketlist/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
        body: JSON.stringify({ is_achived }),
      }
    );
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("UpdateBucketListItemAchieved Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};

export const deleteBucketListItem = async (id: number) => {
  try {
    fetchCsrfToken();

    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}/api/bucketlist/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("DeleteBucketListItem Error:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
};
