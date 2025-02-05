const URL = 'http://localhost:8000';

export const getAllUsers = async () => {
    try {
        const response = await fetch(
            `${URL}/users`,
            {
                method: 'GET'
            }
        );
        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Login Error:", error.message);
          } else {
            console.error("Unexpected error", error);
          }
    }
}

export const signInWithEmailAndPassword = async (email:string, password:string) => {
    try {
        // get csrf-token
        await fetch(`${URL}/sanctum/csrf-cookie`, {
            method: 'GET',
            credentials: 'include',
        });

        const response = await fetch(`${URL}/api/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
            },
            body: JSON.stringify({ email, password }),
        });

        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Login Error:", error.message);
          } else {
            console.error("Unexpected error", error);
          }
    }
}

// Helper function to read cookies
function getCookie(name:any) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return "";
}