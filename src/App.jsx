import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StaffView from './pages/StaffView';
import RoomBoard from './pages/RoomBoard';
import './App.css';

function ProtectedRoute({ children, requireAdmin = false }) {
    const { state } = useApp();

    if (!state.currentUser) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !state.currentUser.isAdmin) {
        return <Navigate to="/staff" replace />;
    }

    return children;
}

function AppRoutes() {
    const { state } = useApp();

    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Routes>
                    <Route
                        path="/"
                        element={
                            state.currentUser ? (
                                <Navigate to={state.currentUser.isAdmin ? '/admin' : '/staff'} replace />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requireAdmin>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff"
                        element={
                            <ProtectedRoute>
                                <StaffView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/rooms"
                        element={
                            <ProtectedRoute>
                                <RoomBoard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </BrowserRouter>
    );
}
