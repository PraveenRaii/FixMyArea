import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            console.log("Signup Success:", response.data);

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                })
            );

            alert("Account created successfully!");

        } catch (error) {
            console.error(error);

            const message =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : "Signup failed. Please try again.";

            alert(message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                            F
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join FixMyArea and improve your community.
                    </p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                    >
                        Create Account
                    </button>

                </form>

                {/* Footer */}
               <p className="text-center text-gray-500 text-sm mt-6">
    Already have an account?{" "}
    <Link
        to="/login"
        className="text-purple-600 font-semibold hover:underline"
    >
        Login
    </Link>
</p>

            </div>
        </div>
    );
}

export default Signup;