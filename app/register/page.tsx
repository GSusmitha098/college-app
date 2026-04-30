"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully!");

localStorage.setItem("user", JSON.stringify(data.user || { email }));
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
  console.log(err);
  setError("Check console for error");
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Register
        </h1>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-green-400 text-sm mb-3 text-center">
            {success}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="bg-gray-800 border border-gray-600 text-white p-2 mb-3 w-full rounded focus:outline-none focus:border-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 border border-gray-600 text-white p-2 mb-3 w-full rounded focus:outline-none focus:border-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center mt-3 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}