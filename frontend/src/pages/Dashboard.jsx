import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [complaints, setComplaints] = useState([]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchComplaints = async () => {
            try {
                const response = await api.get("/complaints/my");
                setComplaints(response.data);
            } catch (error) {
                console.error("Failed to fetch complaints:", error);
            }
        };

        fetchComplaints();
    }, [navigate]);
    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <aside className="w-64 md:w-64 bg-white border-r min-h-screen p-6 hidden md:block">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                            F
                        </span>
                    </div>

                    <h1 className="text-xl font-bold text-purple-700">
                        FixMyArea
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">

                    <button className="w-full text-left px-4 py-3 rounded-xl bg-purple-100 text-purple-700 font-semibold">
                        🏠 Dashboard
                    </button>

                    <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
                        📍 Report Problem
                    </button>

                    <Link
                        to="/my-complaints"
                        className="block w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
                    >
                        📋 My Complaints
                    </Link>

                    <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
                        🔔 Notifications
                    </button>



                    <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
                        👤 My Profile
                    </button>

                </nav>

                {/* Logout */}
                <div className="mt-auto pt-10">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
                    >
                        🚪 Logout
                    </button>
                </div>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">

                {/* Welcome */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome back,{user.name || "Citizen"} 👋
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Help make your community better by reporting local problems.
                    </p>
                    <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md">
                        <Link
                            to="/report-problem"
                            className="bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
                        >
                            + Report a Problem
                        </Link>
                    </button>
                </div>
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Total Complaints
                        </p>

                        <h3 className="text-3xl font-bold text-gray-800 mt-2">
                            {complaints.length}
                        </h3>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Pending
                        </p>

                        <h3 className="text-3xl font-bold text-orange-500 mt-2">
                            {complaints.filter(
                                (complaint) => complaint.status === "PENDING"
                            ).length}
                        </h3>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Resolved
                        </p>

                        <h3 className="text-3xl font-bold text-green-600 mt-2">
                            {complaints.filter(
                                (complaint) => complaint.status === "RESOLVED"
                            ).length}
                        </h3>
                    </div>

                </div>

                {/* Recent Complaints */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                Recent Complaints
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Track your latest reported problems
                            </p>
                        </div>

                        <Link
                            to="/my-complaints"
                            className="text-purple-600 font-semibold hover:underline"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {complaints.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-400 text-lg">
                                    No complaints yet
                                </p>

                                <p className="text-gray-400 text-sm mt-2">
                                    Your reported problems will appear here.
                                </p>
                            </div>
                        ) : (
                            complaints.slice(0, 3).map((complaint) => (
                                <div
                                    key={complaint.id}
                                    className="border rounded-xl p-5 hover:shadow-md transition"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-gray-800">
                                            {complaint.title}
                                        </h4>

                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-600">
                                            {complaint.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 text-sm mt-2">
                                        {complaint.description}
                                    </p>

                                    <div className="flex gap-4 mt-3 text-sm text-gray-400">
                                        <span>📍 {complaint.location}</span>
                                        <span>🏷️ {complaint.category}</span>
                                        <span
                                            className={`px-3 py-1 rounded-lg text-sm font-medium ${complaint.priority === "HIGH"
                                                    ? "bg-red-50 text-red-600"
                                                    : complaint.priority === "MEDIUM"
                                                        ? "bg-yellow-50 text-yellow-600"
                                                        : "bg-green-50 text-green-600"
                                                }`}
                                        >
                                            ⚡ Priority: {complaint.priority}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;