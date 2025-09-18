import React, { useState, useEffect } from 'react';
import { FaBuilding, FaBirthdayCake, FaUser, FaLock } from 'react-icons/fa';
import FacultyMainLayout from '../../components/faculty/FacultyMainLayout';
// import axios from 'axios';

// A small, reusable component for the info fields
const InfoField = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-white/10">
        <div className="text-primary text-lg">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="font-semibold text-text-light dark:text-text-dark">{value}</p>
        </div>
    </div>
);

export default function FacultyProfilePage() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This simulates fetching the faculty member's profile data
        const fetchProfileData = () => {
            // --- REAL API CALL (Commented Out) ---
            // axios.get('/api/faculty/profile').then(response => {
            //     setUserData(response.data);
            //     setIsLoading(false);
            // });

            // --- SIMULATION ---
            setTimeout(() => {
                const mockData = {
                    first_name: "Anjali",
                    middle_name: "",
                    last_name: "Sharma",
                    employee_id: "FACULTY01",
                    date_of_birth: "1985-08-22",
                    gender: "female",
                    department: "Computer Engineering"
                };
                setUserData(mockData);
                setIsLoading(false);
            }, 1000);
        };
        fetchProfileData();
    }, []);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        alert("Password update logic to be implemented!");
    };

    if (isLoading || !userData) {
        return <div className="p-6">Loading profile...</div>;
    }

    const fullName = `Dr. ${userData.first_name} ${userData.last_name}`;
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=2563EB&color=fff&size=128`;
    
    const formattedDob = new Date(userData.date_of_birth).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Card */}
                <div className="lg:col-span-2 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20 p-6">
                    <div className="flex flex-col items-center text-center">
                        <img src={avatarUrl} alt="Profile Avatar" className="w-24 h-24 rounded-full border-4 border-primary" />
                        <h2 className="mt-4 text-2xl font-bold text-text-light dark:text-text-dark">{fullName}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Employee ID: {userData.employee_id}</p>
                    </div>
                    <div className="mt-6 border-t border-gray-200 dark:border-white/10 pt-4">
                        <InfoField icon={<FaBuilding />} label="Department" value={userData.department} />
                        <InfoField icon={<FaBirthdayCake />} label="Date of Birth" value={formattedDob} />
                        <InfoField icon={<FaUser />} label="Gender" value={userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)} />
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="lg:col-span-1 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20 p-6">
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                                <input type="password" required className="w-full pl-10 pr-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">New Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                                <input type="password" required className="w-full pl-10 pr-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Confirm New Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                                <input type="password" required className="w-full pl-10 pr-3 py-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-2 py-2 px-4 rounded-md bg-primary text-white font-semibold hover:brightness-110 active:scale-[0.98]">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
    );
}