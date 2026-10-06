import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ReportProblem() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/complaints", formData);

            console.log("Complaint created:", response.data);

            alert("Problem report submitted successfully!");
            setFormData({
                title: "",
                description: "",
                category: "",
                location: "",
            });
            navigate("/dashboard");

        } catch (error) {
            console.error("Complaint submission failed:", error);

            alert(
                error.response?.data?.message ||
                "Failed to submit complaint. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-100">

            {/* Background Decorations */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute top-40 -right-32 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-fuchsia-200/30 rounded-full blur-3xl"></div>

            {/* Floating Shapes */}
            <div className="absolute top-28 left-[8%] w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>

            <div className="absolute top-64 right-[12%] w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>

            <div className="absolute bottom-32 left-[15%] w-5 h-5 border-2 border-purple-400 rounded-full"></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-10">

                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-semibold mb-5 shadow-sm">
                        📢 Your Voice Matters
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Report a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                            Problem
                        </span>
                    </h1>

                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
                        Help make your area cleaner, safer and better.
                        Report local problems and let the right department know.
                    </p>

                </div>

                {/* Main Card */}
                <div className="grid lg:grid-cols-5 gap-8 items-stretch">

                    {/* Left Information */}
                    <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-700 text-white p-8 shadow-2xl">

                        <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full"></div>

                        <div className="absolute -bottom-20 -left-10 w-52 h-52 bg-white/10 rounded-full"></div>

                        <div className="relative z-10">

                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-3xl mb-7 border border-white/20">
                                🏙️
                            </div>

                            <h2 className="text-3xl font-bold leading-tight">
                                Together, we can make
                                <span className="text-purple-200"> a difference.</span>
                            </h2>

                            <p className="mt-4 text-purple-100 leading-relaxed">
                                Your reports help authorities identify problems
                                faster and improve the quality of life in your
                                community.
                            </p>

                            <div className="mt-8 space-y-5">

                                <div className="flex gap-4 items-center">
                                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                                        ⚡
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Faster Resolution
                                        </h3>
                                        <p className="text-sm text-purple-200">
                                            Get problems noticed quickly
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                                        🛡️
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Safer Communities
                                        </h3>
                                        <p className="text-sm text-purple-200">
                                            Build cleaner surroundings
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                                        🌱
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Better Tomorrow
                                        </h3>
                                        <p className="text-sm text-purple-200">
                                            Small reports create big change
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-10 pt-6 border-t border-white/20">
                                <p className="text-purple-100 text-sm">
                                    💜 Every report counts.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3 bg-white/90 backdrop-blur-xl rounded-3xl p-7 md:p-9 shadow-2xl border border-white">

                        <div className="flex items-center gap-4 mb-7">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-200">
                                📢
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Report Details
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    Tell us what is happening in your area.
                                </p>
                            </div>

                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Problem Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Large pothole on main road"
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/70 outline-none transition focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                />
                            </div>

                            {/* Category + Location */}
                            <div className="grid md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/70 outline-none transition focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                    >
                                        <option value="">
                                            Select category
                                        </option>
                                        <option value="Roads">
                                            🛣️ Roads & Potholes
                                        </option>
                                        <option value="Streetlight">
                                            💡 Street Lights
                                        </option>
                                        <option value="Garbage">
                                            🗑️ Garbage & Waste
                                        </option>
                                        <option value="Water">
                                            💧 Water Supply
                                        </option>
                                        <option value="Drainage">
                                            🚰 Drainage
                                        </option>
                                        <option value="Electricity">
                                            ⚡ Electricity
                                        </option>
                                        <option value="Other">
                                            📌 Other
                                        </option>
                                        required
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter location"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/70 outline-none transition focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                    />
                                </div>

                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the problem in detail..."
                                    rows="5"
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/70 outline-none transition focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                            >
                                🚀 Submit Problem
                            </button>

                        </form>

                    </div>
                </div>

                {/* Bottom Message */}
                <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm">
                        🌍 Small reports today can create a better tomorrow.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ReportProblem;