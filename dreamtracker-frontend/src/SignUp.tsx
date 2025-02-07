import { useState } from "react";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./services/auth/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Created:", userCredential.user);
      alert("Sign-up successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign up Error:", error.message);
        setError("Sign up failded");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
