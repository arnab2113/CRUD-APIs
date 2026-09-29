import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Profile from './pages/Profile';
import LoadingSpinner from './components/LoadingSpinner';

const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner fullScreen />;
  return isAuthenticated ? <Navigate to="/products" replace /> : <Navigate to="/register" replace />;
};

const PublicAuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner fullScreen />;
  return isAuthenticated ? <Navigate to="/products" replace /> : children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<RootRedirect />} />

                <Route
                  path="/register"
                  element={
                    <PublicAuthRoute>
                      <Register />
                    </PublicAuthRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicAuthRoute>
                      <Login />
                    </PublicAuthRoute>
                  }
                />

                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/new"
                  element={
                    <ProtectedRoute>
                      <CreateProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/:id/edit"
                  element={
                    <ProtectedRoute>
                      <EditProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<RootRedirect />} />
              </Routes>
            </main>
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
              &copy; {new Date().getFullYear()} E-Commerce Product Management Platform. Production-grade clean architecture.
            </footer>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
