import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomToaster from "./component/ui/CustomToaster";
import Loader from "./component/ui/Loader";
import Transcriptor from "./pages/Transcriptor";
import LiveTranscriptor from "./pages/LiveTranscriptor";
import History from "./pages/History";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { loadingUser } = useAuth();

  if (loadingUser) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audio"
              element={
                <ProtectedRoute>
                  <Transcriptor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/live"
              element={
                <ProtectedRoute>
                  <LiveTranscriptor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
        <CustomToaster />
      </Router>
    </div>
  );
}
