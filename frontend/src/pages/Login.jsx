import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            console.log("Login Success:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify({
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
            }));

            alert("Login Successful!");
            const role = response.data.role;

            if (role === "OFFICER") {
                navigate("/officer-dashboard");
            } else if (role === "ADMIN") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            console.error(error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                {/* Logo / Heading */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                            F
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        FixMyArea
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Make your area better, together.
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5">

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                    >
                        Login
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-purple-600 font-semibold hover:underline"
                    >
                        Create Account
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;