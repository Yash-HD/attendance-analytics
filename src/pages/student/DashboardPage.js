import React, { useState } from 'react';
import MainLayout from '../../components/student/MainLayout';
// UPDATED: Added FaExclamationTriangle for the new widget
import { FaQrcode, FaCheckCircle, FaTimesCircle, FaChartPie, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import QRCodeScannerModal from '../../components/student/QRCodeScannerModal';

const DashboardPage = () => {
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    // Sample data
    const upcomingClasses = [
        { time: '11:00 AM', subject: 'Data Structures', faculty: 'Dr. Sharma' },
        { time: '01:00 PM', subject: 'Operating Systems', faculty: 'Prof. Verma' },
    ];
    const subjectData = [
        { name: 'Data Structures', percentage: 92 },
        { name: 'Operating Systems', percentage: 74 },
        { name: 'Database Management', percentage: 85 },
        { name: 'Computer Networks', percentage: 68 },
    ];
    
    // NEW: Filter the subject data to get only the at-risk subjects
    const atRiskSubjects = subjectData.filter(subj => subj.percentage < 75);

    const getPercentColor = (pct) => {
        if (pct >= 85) return 'text-accent-green';
        if (pct >= 70) return 'text-accent-amber';
        return 'text-accent-red';
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Welcome & Quick Actions (No changes here) */}
                    <div className="lg:col-span-3 bg-white dark:bg-white/10 rounded-xl shadow-md p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-text-light dark:text-text-dark">Welcome back, Rohan!</h2>
                                <p className="text-gray-600 dark:text-gray-400">Here's an overview of your attendance today.</p>
                            </div>
                            <button
                                onClick={() => setIsScannerOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <FaQrcode />
                                <span>Scan QR to Mark Attendance</span>
                            </button>
                        </div>
                    </div>

                    {/* Key Statistic Cards (No changes here) */}
                    <div className="bg-white/10 dark:bg-secondary-lightdarkish/10 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Overall Attendance</p>
                            <div className={`mt-2 text-3xl font-extrabold ${getPercentColor(88)}`}>88%</div>
                        </div>
                        <FaChartPie className="text-primary text-3xl" />
                    </div>
                    <div className="bg-white/10 dark:bg-secondary-lightdarkish/10 backdrop-blur-md rounded-xl border border-white/20 shadow-md p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Subjects at Risk</p>
                            <div className="mt-2 text-3xl font-extrabold text-accent-amber">2</div>
                        </div>
                        <FaCalendarAlt className="text-primary text-3xl" />
                    </div>

                    {/* Upcoming Schedule (No changes here) */}
                    <div className=" rounded-xl shadow-lg p-6  bg-white dark:bg-secondary-lightdarkish/10 ">
                        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Upcoming Schedule</h3>
                        <ul className="space-y-3">
                            {upcomingClasses.map((cls, idx) => (
                                <li key={idx} className="flex bg-white dark:bg-white/10 items-start justify-between rounded-md border border-gray-200 dark:border-white/10 p-3">
                                    <div >
                                        <p className="font-medium text-text-light dark:text-text-dark">{cls.subject}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{cls.faculty}</p>
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{cls.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subject-wise Breakdown (No changes here) */}
                    <div className="lg:col-span-2 bg-white dark:bg-secondary-lightdarkish/10 rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4">Subject-wise Attendance</h3>
                        <ul className="space-y-3">
                            {subjectData.map((subj, idx) => (
                                <li key={idx} className="flex  bg-white dark:bg-white/10 items-center justify-between rounded-md border border-gray-200 dark:border-white/10 p-3">
                                    <span className="font-medium text-text-light dark:text-text-dark">{subj.name}</span>
                                    <span className={`text-sm font-semibold ${getPercentColor(subj.percentage)}`}>{subj.percentage}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* UPDATED: "Recent Activity" is now "Subjects Under 75%" */}
                    <div className="bg-white dark:bg-secondary-lightdarkish/10 rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                            <FaExclamationTriangle className="text-accent-red" />
                            Subjects Under 75%
                        </h3>
                        <ul className="space-y-3">
                            {atRiskSubjects.length > 0 ? atRiskSubjects.map((subj, idx) => (
                                <li key={idx} className="flex  bg-white dark:bg-white/10 items-center justify-between rounded-md border border-gray-200 dark:border-white/10 p-3">
                                    <span className="font-medium text-text-light dark:text-text-dark">{subj.name}</span>
                                    <span className={`text-sm font-semibold ${getPercentColor(subj.percentage)}`}>{subj.percentage}%</span>
                                </li>
                            )) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No subjects are below the threshold. Keep it up!</p>
                            )}
                        </ul>
                    </div>

                </div>
            </div>
            <QRCodeScannerModal 
                isOpen={isScannerOpen} 
                onClose={() => setIsScannerOpen(false)} 
            />
        </MainLayout>
    );
};

export default DashboardPage;