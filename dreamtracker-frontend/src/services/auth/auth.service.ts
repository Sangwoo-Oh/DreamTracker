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
        const data = await response.json();
        if (data) {
            localStorage.setItem('idToken', data);
        }
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Login Error:", error.message);
          } else {
            console.error("Unexpected error", error);
          }
    }
}

export const verifyToken = async () => {
    try {
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {
            throw new Error("No ID token found in localStorage");
        }

        const response = await fetch(`${URL}/api/verify`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
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
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
        return false;
    }
    return true;
}

export const signOut = async () => {
    try {
        await fetch(`${URL}/api/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
                'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
            },
        });
        localStorage.removeItem('idToken');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Signout Error:", error.message);
        } else {
            console.error("Unexpected error", error);
        }
    }
};

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