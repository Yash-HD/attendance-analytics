import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/student/MainLayout';
import { FaClock } from 'react-icons/fa';

export default function TimetablePage() {
    const [timetable, setTimetable] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeDay, setActiveDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }));

    useEffect(() => {
        // --- DATA FETCHING & PROCESSING (Simulated from localStorage) ---
        const timetableDataString = '{"timetable":[{"timetable_id":1,"teacher_id":"1","subject_id":7,"day_of_week":"Friday","start_time":"10:00:00","end_time":"11:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":3,"day_of_week":"Friday","start_time":"11:00:00","end_time":"12:00:00"},{"timetable_id":1,"teacher_id":"3","subject_id":4,"day_of_week":"Friday","start_time":"12:00:00","end_time":"13:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":8,"day_of_week":"Friday","start_time":"14:00:00","end_time":"16:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":1,"day_of_week":"Monday","start_time":"09:00:00","end_time":"10:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":2,"day_of_week":"Monday","start_time":"10:00:00","end_time":"11:00:00"},{"timetable_id":1,"teacher_id":"3","subject_id":3,"day_of_week":"Monday","start_time":"11:00:00","end_time":"12:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":4,"day_of_week":"Monday","start_time":"12:00:00","end_time":"13:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":5,"day_of_week":"Monday","start_time":"14:00:00","end_time":"15:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":7,"day_of_week":"Thursday","start_time":"09:00:00","end_time":"10:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":6,"day_of_week":"Thursday","start_time":"10:00:00","end_time":"11:00:00"},{"timetable_id":1,"teacher_id":"3","subject_id":10,"day_of_week":"Thursday","start_time":"11:00:00","end_time":"13:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":7,"day_of_week":"Tuesday","start_time":"09:00:00","end_time":"10:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":6,"day_of_week":"Tuesday","start_time":"10:00:00","end_time":"11:00:00"},{"timetable_id":1,"teacher_id":"3","subject_id":11,"day_of_week":"Tuesday","start_time":"11:00:00","end_time":"13:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":5,"day_of_week":"Tuesday","start_time":"14:00:00","end_time":"15:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":9,"day_of_week":"Wednesday","start_time":"09:00:00","end_time":"11:00:00"},{"timetable_id":1,"teacher_id":"3","subject_id":4,"day_of_week":"Wednesday","start_time":"11:00:00","end_time":"12:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":3,"day_of_week":"Wednesday","start_time":"12:00:00","end_time":"13:00:00"},{"timetable_id":1,"teacher_id":"2","subject_id":6,"day_of_week":"Wednesday","start_time":"14:00:00","end_time":"15:00:00"},{"timetable_id":1,"teacher_id":"3","subject_id":5,"day_of_week":"Wednesday","start_time":"15:00:00","end_time":"16:00:00"}]}';
        const subjectsDataString = '{"subjects":[{"subject_id":1,"subject_name":"LLC"},{"subject_id":2,"subject_name":"PDS"},{"subject_id":3,"subject_name":"COA"},{"subject_id":4,"subject_name":"DBMS"},{"subject_id":5,"subject_name":"MS"},{"subject_id":6,"subject_name":"DS"},{"subject_id":7,"subject_name":"DSGT"},{"subject_id":8,"subject_name":"DBMS-Lab"},{"subject_id":9,"subject_name":"DS-Lab"},{"subject_id":10,"subject_name":"COA-Lab"},{"subject_id":11,"subject_name":"PDS-Lab"}]}';
        const teachersDataString = '{"teachers":[{"teacher_id":"1","teacher_name":"Dr. A. Sharma"},{"teacher_id":"2","teacher_name":"Prof. R. Verma"},{"teacher_id":"3","teacher_name":"Dr. S. Gupta"}]}';
        
        const rawTimetable = JSON.parse(timetableDataString).timetable;
        const subjects = JSON.parse(subjectsDataString).subjects;
        const teachers = JSON.parse(teachersDataString).teachers;
        const subjectMap = subjects.reduce((acc, subj) => ({ ...acc, [subj.subject_id]: subj.subject_name }), {});
        const teacherMap = teachers.reduce((acc, t) => ({ ...acc, [t.teacher_id]: t.teacher_name }), {});
        const processedTimetable = rawTimetable.reduce((acc, entry) => {
            const day = entry.day_of_week;
            if (!acc[day]) acc[day] = [];
            acc[day].push({ ...entry, subject_name: subjectMap[entry.subject_id] || 'N/A', teacher_name: teacherMap[entry.teacher_id] || 'N/A' });
            return acc;
        }, {});
        for (const day in processedTimetable) {
            processedTimetable[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
        }
        setTimetable(processedTimetable);
        setIsLoading(false);
    }, []);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const formatTime = (time) => new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    if (isLoading) {
        return <MainLayout><div className="p-6">Loading Timetable...</div></MainLayout>;
    }

    return (
        <MainLayout>
            <div className="p-4 md:p-6">
                
                {/* Mobile Tab View */}
                {/* UPDATED: Wrapped in a subtle glassy container */}
                <div className="md:hidden bg-blue-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl shadow-md p-4">
                    <div className="border-b border-gray-200 dark:border-white/10">
                        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
                            {daysOfWeek.map(day => (
                                <button key={day} onClick={() => setActiveDay(day)}
                                    className={`${activeDay === day ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                                >
                                    {day}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-4 space-y-3">
                        {timetable[activeDay] ? timetable[activeDay].map((entry, index) => (
                             // UPDATED: Applied strong icy glass effect to mobile tiles
                             <div key={index} className="p-4 bg-white/55 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20">
                                 <p className="font-bold text-primary">{entry.subject_name}</p>
                                 <p className="text-sm text-text-light dark:text-text-dark">{entry.teacher_name}</p>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                                     <FaClock /> {formatTime(entry.start_time)} - {formatTime(entry.end_time)}
                                 </p>
                             </div>
                        )) : <p className="text-gray-500 p-4">No classes scheduled for {activeDay}.</p>}
                    </div>
                </div>

                {/* Desktop Grid View */}
                {/* UPDATED: Applied a subtle glassy container */}
                <div className="hidden md:block mt-6 bg-blue-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">
                    <div className="grid grid-cols-5">
                        {daysOfWeek.map(day => (
                             <div key={day} className="text-center font-bold py-4 border-b border-r border-gray-200 dark:border-white/10 text-text-light dark:text-text-dark">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 h-[70vh]">
                        {daysOfWeek.map(day => (
                            <div key={day} className="border-r border-gray-200 dark:border-white/10 p-2 space-y-2 overflow-y-auto">
                                {timetable[day]?.map((entry, index) => (
                                    // UPDATED: Applied strong icy glass effect
                                    <div key={index} className="p-3 bg-white/55 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-lg shadow-md">
                                        <p className="font-bold text-sm text-primary">{entry.subject_name}</p>
                                        <p className="text-xs text-text-light dark:text-text-dark">{entry.teacher_name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatTime(entry.start_time)} - {formatTime(entry.end_time)}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}