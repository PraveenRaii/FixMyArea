import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function OfficerDashboard() {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    useEffect(() => {
        console.log(
            "FULL COMPLAINT:",
            JSON.stringify(selectedComplaint, null, 2)
        );
    }, [selectedComplaint]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await api.get("/complaints");
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to fetch complaints:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/complaints/${id}/status?status=${status}`);

            setComplaints((prev) =>
                prev.map((complaint) =>
                    complaint.id === id
                        ? { ...complaint, status }
                        : complaint
                )
            );

        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update complaint status.");
        }
    };

    const total = complaints.length;

    const pending = complaints.filter(
        c => c.status === "PENDING"
    ).length;

    const inProgress = complaints.filter(
        c => c.status === "IN_PROGRESS"
    ).length;

    const resolved = complaints.filter(
        c => c.status === "RESOLVED"
    ).length;

    const highPriority = complaints.filter(
        c => c.priority === "HIGH"
    ).length;

    const filteredComplaints = complaints.filter((complaint) => {

        const matchesSearch =
            complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
            complaint.location?.toLowerCase().includes(search.toLowerCase()) ||
            complaint.category?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" ||
            complaint.status === statusFilter;

        const matchesPriority =
            priorityFilter === "ALL" ||
            complaint.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}

            <header className="bg-white border-b border-slate-200">

                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                                F
                            </div>

                            <h1 className="text-2xl font-bold text-slate-800">
                                FixMyArea
                            </h1>
                        </div>

                        <p className="text-sm text-slate-500 mt-1">
                            Officer Control Center
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium"
                    >
                        Citizen Dashboard
                    </Link>

                </div>

            </header>


            {/* Main */}

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Welcome */}

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-slate-800">
                        Complaint Overview
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Monitor, filter and manage reported civic problems.
                    </p>

                </div>


                {/* Stats */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                    <div className="bg-white rounded-2xl p-5 border border-slate-200">
                        <p className="text-sm text-slate-500">
                            Total Complaints
                        </p>

                        <h3 className="text-3xl font-bold text-slate-800 mt-2">
                            {total}
                        </h3>
                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-orange-100">
                        <p className="text-sm text-orange-500">
                            Pending
                        </p>

                        <h3 className="text-3xl font-bold text-orange-600 mt-2">
                            {pending}
                        </h3>
                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-blue-100">
                        <p className="text-sm text-blue-500">
                            In Progress
                        </p>

                        <h3 className="text-3xl font-bold text-blue-600 mt-2">
                            {inProgress}
                        </h3>
                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-green-100">
                        <p className="text-sm text-green-500">
                            Resolved
                        </p>

                        <h3 className="text-3xl font-bold text-green-600 mt-2">
                            {resolved}
                        </h3>
                    </div>


                    <div className="bg-white rounded-2xl p-5 border border-red-100">
                        <p className="text-sm text-red-500">
                            High Priority
                        </p>

                        <h3 className="text-3xl font-bold text-red-600 mt-2">
                            {highPriority}
                        </h3>
                    </div>

                </div>


                {/* Filters */}

                <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">

                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Search */}

                        <div className="flex-1">

                            <input
                                type="text"
                                placeholder="Search complaints, location or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500"
                            />

                        </div>


                        {/* Status */}

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none"
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                        </select>


                        {/* Priority */}

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none"
                        >
                            <option value="ALL">All Priority</option>
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>
                        </select>

                    </div>

                </div>


                {/* Complaints */}

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

                    <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">

                        <div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Reported Problems
                            </h3>

                            <p className="text-sm text-slate-500">
                                {filteredComplaints.length} complaints found
                            </p>
                        </div>

                        <button
                            onClick={fetchComplaints}
                            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                        >
                            Refresh
                        </button>

                    </div>


                    {loading ? (

                        <div className="p-10 text-center text-slate-500">
                            Loading complaints...
                        </div>

                    ) : filteredComplaints.length === 0 ? (

                        <div className="p-10 text-center text-slate-500">
                            No complaints match your filters.
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-50">

                                    <tr>

                                        <th className="text-left p-4 text-sm text-slate-500">
                                            Complaint
                                        </th>

                                        <th className="text-left p-4 text-sm text-slate-500">
                                            Category
                                        </th>

                                        <th className="text-left p-4 text-sm text-slate-500">
                                            Location
                                        </th>

                                        <th className="text-left p-4 text-sm text-slate-500">
                                            Priority
                                        </th>

                                        <th className="text-left p-4 text-sm text-slate-500">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredComplaints.map((complaint) => (

                                        <tr
                                            key={complaint.id}
                                            onClick={() => setSelectedComplaint(complaint)}
                                            className="border-t border-slate-100 hover:bg-purple-50/30 transition cursor-pointer"
                                        >

                                            <td className="p-4">

                                                <div className="font-semibold text-slate-800">
                                                    {complaint.title}
                                                </div>

                                                <div className="text-xs text-slate-400 mt-1">
                                                    Complaint #{complaint.id}
                                                </div>

                                            </td>


                                            <td className="p-4 text-sm text-slate-600">
                                                {complaint.category}
                                            </td>


                                            <td className="p-4 text-sm text-slate-600">
                                                📍 {complaint.location}
                                            </td>


                                            <td className="p-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${complaint.priority === "HIGH"
                                                        ? "bg-red-100 text-red-600"
                                                        : complaint.priority === "MEDIUM"
                                                            ? "bg-yellow-100 text-yellow-600"
                                                            : "bg-green-100 text-green-600"
                                                        }`}
                                                >
                                                    {complaint.priority}
                                                </span>

                                            </td>


                                            <td className="p-4">
                                                <select
                                                    value={complaint.status}
                                                    onChange={(e) =>
                                                        updateStatus(complaint.id, e.target.value)
                                                    }
                                                    className={`px-3 py-2 rounded-lg text-sm font-semibold border outline-none cursor-pointer ${complaint.status === "RESOLVED"
                                                        ? "bg-green-50 text-green-600 border-green-200"
                                                        : complaint.status === "IN_PROGRESS"
                                                            ? "bg-blue-50 text-blue-600 border-blue-200"
                                                            : "bg-orange-50 text-orange-600 border-orange-200"
                                                        }`}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="IN_PROGRESS">In Progress</option>
                                                    <option value="RESOLVED">Resolved</option>
                                                </select>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

                {selectedComplaint && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedComplaint(null)}
                    >
                        <div
                            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">

                                <div>
                                    <p className="text-sm text-purple-600 font-semibold">
                                        Complaint #{selectedComplaint.id}
                                    </p>

                                    <h2 className="text-2xl font-bold text-slate-800 mt-1">
                                        {selectedComplaint.title}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedComplaint(null)}
                                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                >
                                    ✕
                                </button>

                            </div>

                            <div className="space-y-4">

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Description
                                    </p>

                                    <p className="text-slate-700 mt-1">
                                        {selectedComplaint.description}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Category
                                    </p>

                                    <p className="font-medium text-slate-700 mt-1">
                                        {selectedComplaint.category}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Location
                                    </p>

                                    <p className="font-medium text-slate-700 mt-1">
                                        📍 {selectedComplaint.location}
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-4">
                                    <p className="text-sm text-slate-400 mb-2">
                                        Citizen Information
                                    </p>

                                    <div className="bg-purple-50 rounded-xl p-4">
                                        <p className="font-semibold text-slate-800">
                                            👤 {selectedComplaint.user?.name}
                                        </p>

                                        <p className="text-sm text-slate-600 mt-1">
                                            📧 {selectedComplaint.user?.email}
                                        </p>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Citizen ID: #{selectedComplaint.user?.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">

                                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                                        Priority: {selectedComplaint.priority}
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                                        {selectedComplaint.status.replace("_", " ")}
                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </main>

        </div>
    );
}