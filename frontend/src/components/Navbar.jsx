import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, PlusCircle, User, LogOut, LogIn, UserPlus, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/register');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to={isAuthenticated ? "/products" : "/register"} className="flex items-center space-x-2 text-sky-600 dark:text-sky-400 font-bold text-xl">
              <ShoppingBag className="w-6 h-6" />
              <span>ProdStore</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/products"
                className="text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Products
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              type="button"
              className="relative inline-flex items-center h-8 rounded-full w-14 px-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-200 dark:bg-gray-700 cursor-pointer"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle dark/light mode"
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`inline-block w-6 h-6 transform rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </span>
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/products/new"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Product</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center space-x-1.5 text-gray-700 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{user?.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-1.5 text-gray-700 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
