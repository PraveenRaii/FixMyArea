import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ReportProblem from "./pages/ReportProblem";
import MyComplaints from "./pages/MyComplaints";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/report-problem" element={<ReportProblem />} />
                <Route path="/my-complaints" element={<MyComplaints />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;