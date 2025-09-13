import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FaUserCheck, FaUserSlash } from 'react-icons/fa';
// import axios from 'axios';

const initialStudents = [
    { id: 'S01', name: 'Rohan Kumar' }, { id: 'S02', name: 'Priya Singh' }, { id: 'S03', name: 'Amit Kumar' }, 
    { id: 'S04', name: 'Anjali Gupta' },{ id: 'S05', name: 'Suresh Patel' }, { id: 'S06', name: 'Meena Reddy' },
    { id: 'S07', name: 'Vikram Sharma' },{ id: 'S08', name: 'Sneha Joshi' },{ id: 'S09', name: 'Rajesh Verma' },
    { id: 'S10', name: 'Pooja Desai' },{ id: 'S11', name: 'Arjun Mehta' },{ id: 'S12', name: 'Kavita Iyer' },
    { id: 'S13', name: 'Manoj Nair' },{ id: 'S14', name: 'Sunita Rao' },{ id: 'S15', name: 'Deepak Choudhary' },
    { id: 'S16', name: 'Neha Agarwal' },{ id: 'S17', name: 'Sanjay Krishnan' },{ id: 'S18', name: 'Geeta Patil' },
    { id: 'S19', name: 'Harish Reddy' },{ id: 'S20', name: 'Lata Menon' }
];

export default function LiveSessionPage() {
    const { classId } = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qrToken, setQrToken] = useState('generating...');
    const [presentStudents, setPresentStudents] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);
    const simulationStudentQueue = useRef([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setAbsentStudents(initialStudents);
                simulationStudentQueue.current = [...initialStudents]; 
                setQrToken(Math.random().toString(36).substring(2));
            } catch (err) {
                setError("Failed to start session. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
        const qrRefreshInterval = setInterval(() => {
            const newToken = Math.random().toString(36).substring(2);
            setQrToken(newToken);
        }, 15000);
        return () => clearInterval(qrRefreshInterval);
    }, [classId]);

    useEffect(() => {
        const simulationInterval = setInterval(() => {
            if (simulationStudentQueue.current.length > 0) {
                const studentToMove = simulationStudentQueue.current.shift();
                setPresentStudents(prev => [studentToMove, ...prev]);
                setAbsentStudents(prev => prev.filter(s => s.id !== studentToMove.id));
            } else {
                clearInterval(simulationInterval);
            }
        }, 3000);
        return () => clearInterval(simulationInterval);
    }, []);

    const handleManualMarkPresent = (studentToMark) => {
        simulationStudentQueue.current = simulationStudentQueue.current.filter(s => s.id !== studentToMark.id);
        setAbsentStudents(current => current.filter(s => s.id !== studentToMark.id));
        setPresentStudents(current => [studentToMark, ...current]);
    };
    const handleManualMarkAbsent = (studentToMark) => {
        setPresentStudents(current => current.filter(s => s.id !== studentToMark.id));
        setAbsentStudents(current => [studentToMark, ...current]);
    };

    if (isLoading) {
        return <div className="p-6">Loading Session...</div>;
    }
    if (error) {
        return <div className="p-6 text-accent-red">{error}</div>;
    }
    const totalStudents = initialStudents.length;

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (Controls) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                 {/* UPDATED: Applied icy glass effect */}
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20 p-6 text-center">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Scan to Mark Attendance</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Code refreshes automatically</p>
                    <div className="p-4 bg-white inline-block rounded-lg">
                        <QRCodeSVG value={qrToken} size={256} />
                    </div>
                </div>
                 {/* UPDATED: Applied icy glass effect */}
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20 p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Live Count</h3>
                    <p className="text-6xl font-bold text-text-light dark:text-text-dark">
                        {presentStudents.length} <span className="text-3xl text-gray-400">/ {totalStudents}</span>
                    </p>
                </div>
                 <button className="w-full bg-accent-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    End Session
                </button>
            </div>

            {/* Right Column (Student Lists) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Present Students */}
                 {/* UPDATED: Applied icy glass effect */}
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20">
                    <h3 className="p-4 text-lg font-semibold border-b border-gray-200 dark:border-white/10 flex items-center gap-2 text-text-light dark:text-text-dark"><FaUserCheck className="text-accent-green" /> Present Students</h3>
                    <ul className="divide-y divide-gray-200 dark:divide-white/10 max-h-64 overflow-y-auto">
                        {presentStudents.map(student => (
                            <li key={student.id} className="p-4 flex justify-between items-center text-text-light dark:text-text-dark">
                                {student.name}
                                <button onClick={() => handleManualMarkAbsent(student)} title="Mark as Absent" className="text-xs text-red-500 px-2 py-1 rounded hover:bg-red-500/10">Mark Absent</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Absent Students */}
                 {/* UPDATED: Applied icy glass effect */}
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20">
                    <h3 className="p-4 text-lg font-semibold border-b border-gray-200 dark:border-white/10 flex items-center gap-2 text-text-light dark:text-text-dark"><FaUserSlash className="text-accent-red" /> Absent Students</h3>
                    <ul className="divide-y divide-gray-200 dark:divide-white/10 max-h-96 overflow-y-auto">
                        {absentStudents.map(student => (
                            <li key={student.id} className="p-4 flex justify-between items-center text-text-light dark:text-text-dark">
                                {student.name}
                                <button onClick={() => handleManualMarkPresent(student)} className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-blue-700">Mark Present</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}