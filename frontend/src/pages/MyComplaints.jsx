import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function MyComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/complaints/${id}/status?status=${status}`);

            const response = await api.get("/complaints/my");
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update complaint status.");
        }
    };

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
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, [navigate]);

    if (loading) {
        return <div className="p-8 text-xl">Loading complaints...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
            <Link
                to="/dashboard"
                className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800 mb-4"
            >
                ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                My Complaints
            </h1>

            {complaints.length === 0 ? (
                <p className="text-gray-500">
                    You have not submitted any complaints yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {complaints.map((complaint) => (
                        <div
                            key={complaint.id}
                            className="bg-white p-5 rounded-xl shadow"
                        >

                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">
                                        Complaint #{complaint.id}
                                    </p>

                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {complaint.title}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-3">
                                Reported on:{" "}
                                {new Date(complaint.createdAt).toLocaleString()}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium">
                                    🏷️ {complaint.category}
                                </span>

                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                                    📍 {complaint.location}
                                </span>
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

                            <div className="mt-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${complaint.status === "PENDING"
                                        ? "bg-orange-100 text-orange-600"
                                        : complaint.status === "IN_PROGRESS"
                                            ? "bg-blue-100 text-blue-600"
                                            : complaint.status === "RESOLVED"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {complaint.status.replace("_", " ")}
                                </span>
                            </div>
                            <select
                                value={complaint.status}
                                onChange={(e) => updateStatus(complaint.id, e.target.value)}
                                className="mt-3 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="RESOLVED">Resolved</option>
                            </select>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyComplaints;