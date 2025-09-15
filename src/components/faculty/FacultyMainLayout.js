import React, { useEffect, useRef, useState } from 'react';
// IMPORTANT: We use Link and Outlet for the router
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaThLarge, FaUsers, FaChartPie, FaCalendarCheck, FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeProvider';

// Sidebar component remains largely the same, just with different links
const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar panel */}
            <aside
                className={`fixed left-0 top-0 z-30 h-full w-64 bg-white dark:bg-secondary-dark/70 backdrop-blur md:backdrop-blur-0 shadow-xl md:shadow-none md:border-r md:border-white/10 transform transition-transform duration-300 md:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:block`}
            >
                <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-white/10">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Attendance System</span>
                </div>
                {/* UPDATED: Faculty navigation links */}
                <nav className="p-4 flex flex-col gap-1 text-gray-800 dark:text-white">
                    <Link to="/faculty/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10">
                        <FaThLarge className="text-primary" />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/faculty/classes" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10">
                        <FaUsers className="text-primary" />
                        <span>My Classes</span>
                    </Link>
                    <Link to="/faculty/reports" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10">
                        <FaChartPie className="text-primary" />
                        <span>Reports & Analytics</span>
                    </Link>
                    <Link to="/faculty/leave" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10">
                        <FaCalendarCheck className="text-primary" />
                        <span>Leave Management</span>
                    </Link>
                    <Link to="/faculty/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10">
                        <FaUserCircle className="text-primary" />
                        <span>My Profile</span>
                    </Link>
                    <div className="mt-4 pt-4 border-t border-white/20 md:border-gray-200 md:dark:border-white/10" />
                    <Link to="/" type="button" className="flex items-center gap-3 px-3 py-2 rounded-md text-red-200 md:text-red-600 hover:bg-red-50/10 md:hover:bg-red-50">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </Link>
                </nav>
            </aside>
        </>
    );
};

// Header component remains the same, just with different profile data
const Header = ({ onMenuClick, isDarkMode, onThemeToggle, title }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const onClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-20 md:ml-64 bg-white/90 dark:bg-secondary-dark/70 backdrop-blur border-b border-gray-200 dark:border-white/10">
            <div className="h-16 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                        aria-label="Open menu"
                    >
                        <FiMenu size={22} />
                    </button>
                    <div className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{title}</div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onThemeToggle}
                        className="inline-flex items-center justify-center p-2 rounded-full bg-white dark:bg-secondary-dark text-gray-800 dark:text-white shadow hover:shadow-md"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <FaMoon /> : <FaSun className="text-amber-500" />}
                    </button>
                    <div className="relative" ref={dropdownRef}>
                        <button type="button" onClick={() => setIsProfileOpen((s) => !s)} className="flex items-center gap-2">
                            {/* UPDATED: Faculty profile details */}
                            <img
                                src="https://ui-avatars.com/api/?name=Dr+Sharma&background=0D8ABC&color=fff"
                                alt="Avatar"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-800 dark:text-white">Dr. Sharma</span>
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-secondary-dark shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-50">
                                <Link to="/faculty/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/10">View Profile</Link>
                                <Link to="/" className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-white/10">Logout</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

// Main layout component that ties everything together
export default function FacultyMainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // UPDATED: Faculty title map
    const titleMap = {
        '/faculty/dashboard': 'Dashboard',
        '/faculty/classes': 'My Classes',
        '/faculty/reports': 'Reports & Analytics',
        '/faculty/leave': 'Leave Management',
        '/faculty/profile': 'My Profile',
    };
    const currentTitle = titleMap[location.pathname] || 'Dashboard';

    return (
        <div className="bg-background-light dark:bg-background-dark">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Header
                onMenuClick={() => setIsSidebarOpen((s) => !s)}
                isDarkMode={theme === 'dark'}
                onThemeToggle={toggleTheme}
                title={currentTitle}
            />
            {/* IMPORTANT: Use <Outlet /> to render the child pages from your router */}
            <main className="pt-16 md:ml-64 h-screen overflow-auto bg-background-light dark:bg-background-dark">
                <Outlet />
            </main>
        </div>
    );
}