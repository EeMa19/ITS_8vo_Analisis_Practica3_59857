import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router";
import { ScrollToTop } from "./ui/components/common/ScrollToTop";
import AppLayout from "./ui/layout/AppLayout";
import SignIn from "./ui/pages/AuthPages/SignIn";
import SignUp from "./ui/pages/AuthPages/SignUp";
import Home from "./ui/pages/Dashboard/Home";
import ProtectedRoute from "./ui/components/ProtectedRoute";

export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Auth Layout */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Redirigir cualquier ruta no encontrada a /signin */}
                    <Route path="*" element={<Navigate to="/signin" replace />} />
                </Routes>
            </Router>
        </>
    );
}