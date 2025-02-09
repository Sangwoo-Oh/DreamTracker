import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "./services/auth/auth.service";
import { Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
        setError("Invalid email or password.");
      } else {
        console.error("Unexpected error", error);
        setError("Something went wrong.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              fullWidth={true}
              variant="outlined"
              color="primary"
              href="/signup"
            >
              Sign up
            </Button>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
