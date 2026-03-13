import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarDay, FaUserGraduate, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ClassCard = ({ entry, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative flex flex-col p-5 bg-white/70 dark:bg-onyx-800/50 backdrop-blur-xl border border-platinum-200 dark:border-onyx-700/60 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all overflow-hidden"
        >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-dark-teal-400 to-stormy-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1 pr-2">
                    <h4 className="font-extrabold text-lg tracking-tight text-onyx-900 dark:text-platinum-50 group-hover:text-dark-teal-700 dark:group-hover:text-platinum-200 transition-colors leading-tight">{entry.subject_name}</h4>
                    <span className="text-xs font-bold text-onyx-500 uppercase tracking-widest bg-platinum-100 dark:bg-onyx-900/60 px-2 py-0.5 rounded w-max border border-platinum-200 dark:border-onyx-800">Div {entry.division}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-platinum-50 to-platinum-200 dark:from-onyx-800 dark:to-onyx-900 flex items-center justify-center shadow-inner border border-white dark:border-onyx-700 shrink-0">
                    <FaUserGraduate className="text-dark-teal-600 dark:text-dark-teal-400 text-lg" />
                </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-platinum-200 dark:border-onyx-700/50 flex items-center justify-between">
                <p className="text-sm font-bold text-onyx-600 dark:text-onyx-400 flex items-center gap-2">
                    <FaClock className="text-dark-teal-500 text-xs" /> 
                    {entry.start_time.substring(0,5)} - {entry.end_time.substring(0,5)}
                </p>
                <button className="text-[10px] font-black uppercase tracking-widest text-dark-teal-600 dark:text-dark-teal-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Details <FaChevronRight />
                </button>
            </div>
        </motion.div>
    );
};

export default function MyClassesPage() {
    const [timetable, setTimetable] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeDay, setActiveDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }));

    useEffect(() => {
        // --- DATA FETCHING & PROCESSING (Simulated) ---
        setTimeout(() => {
            const loggedInTeacherDataString = '{"first_name":"Anjali","middle_name":"","last_name":"Sharma","teacher_id":"1","date_of_birth":"1985-08-22","gender":"female","department":"Computer Engineering"}';
            const timetableDataString = '{"timetable":[{"timetable_id":1,"teacher_id":"1","subject_id":7,"day_of_week":"Friday","start_time":"10:00:00","end_time":"11:00:00"},{"timetable_id":2,"teacher_id":"2","subject_id":3,"day_of_week":"Friday","start_time":"11:00:00","end_time":"12:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":8,"day_of_week":"Friday","start_time":"14:00:00","end_time":"16:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":1,"day_of_week":"Monday","start_time":"09:00:00","end_time":"10:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":4,"day_of_week":"Monday","start_time":"12:00:00","end_time":"13:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":7,"day_of_week":"Thursday","start_time":"09:00:00","end_time":"10:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":7,"day_of_week":"Tuesday","start_time":"09:00:00","end_time":"10:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":5,"day_of_week":"Tuesday","start_time":"14:00:00","end_time":"15:00:00"},{"timetable_id":1,"teacher_id":"1","subject_id":3,"day_of_week":"Wednesday","start_time":"12:00:00","end_time":"13:00:00"}]}';
            const subjectsDataString = '{"subjects":[{"subject_id":1,"subject_name":"Linear Algebra"},{"subject_id":2,"subject_name":"PDS"},{"subject_id":3,"subject_name":"Computer Architecture"},{"subject_id":4,"subject_name":"Database Systems"},{"subject_id":5,"subject_name":"Management Science"},{"subject_id":6,"subject_name":"DS"},{"subject_id":7,"subject_name":"Data Structures"},{"subject_id":8,"subject_name":"Database Lab"},{"subject_id":9,"subject_name":"DS-Lab"},{"subject_id":10,"subject_name":"COA-Lab"},{"subject_id":11,"subject_name":"PDS-Lab"}]}';
            const divisionsMock = { 1: 'A', 2: 'B', 3: 'C' };

            const loggedInTeacher = JSON.parse(loggedInTeacherDataString);
            const currentTeacherId = loggedInTeacher.teacher_id;
            const rawTimetable = JSON.parse(timetableDataString).timetable;
            const subjects = JSON.parse(subjectsDataString).subjects;

            const filteredTimetable = rawTimetable.filter(entry => entry.teacher_id === currentTeacherId);
            const subjectMap = subjects.reduce((acc, subj) => ({ ...acc, [subj.subject_id]: subj.subject_name }), {});
            
            const processedTimetable = filteredTimetable.reduce((acc, entry) => {
                const day = entry.day_of_week;
                if (!acc[day]) acc[day] = [];
                acc[day].push({ ...entry, subject_name: subjectMap[entry.subject_id] || 'N/A', division: divisionsMock[entry.timetable_id] || 'N/A' });
                return acc;
            }, {});

            for (const day in processedTimetable) {
                processedTimetable[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
            }

            // Ensure all days exist
            const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            week.forEach(d => { if(!processedTimetable[d]) processedTimetable[d] = []; });

            setTimetable(processedTimetable);
            setIsLoading(false);
        }, 800);
    }, []);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if (isLoading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-onyx-400 dark:text-onyx-500 font-bold uppercase tracking-widest text-sm animate-pulse">
                    <span className="w-10 h-10 border-4 border-onyx-200 dark:border-onyx-800 border-t-dark-teal-500 rounded-full animate-spin"></span>
                    Loading Timetable...
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* AMBIENT LIGHTING BACKGROUND - Deep Space Effect */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden lg:block">
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-dark-teal-400/20 dark:bg-dark-teal-700/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '14s' }}></div>
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-stormy-teal-300/30 dark:bg-stormy-teal-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50"></div>
            </div>

            <div className="flex flex-col gap-6 relative z-10 w-full text-onyx-900 dark:text-platinum-50">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/60 dark:bg-onyx-800/40 backdrop-blur-2xl rounded-[2rem] border border-platinum-100 dark:border-onyx-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 md:p-10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-dark-teal-300/20 to-transparent dark:from-dark-teal-600/10 rounded-full filter blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-platinum-100 dark:bg-onyx-900 flex items-center justify-center shadow-inner border border-platinum-200 dark:border-onyx-700">
                            <FaCalendarDay className="text-dark-teal-600 dark:text-dark-teal-400 text-2xl" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-onyx-900 dark:text-platinum-50">Master Routine</h2>
                    </div>
                    <p className="text-onyx-600 dark:text-onyx-400 font-bold pl-16">View your complete weekly class schedule across all divisions.</p>
                </motion.div>

                {/* Mobile/Tablet Segmented Control Tab View */}
                <div className="lg:hidden flex flex-col gap-6">
                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-2 p-2 bg-white/50 dark:bg-onyx-800/40 backdrop-blur-xl rounded-2xl border border-platinum-200 dark:border-onyx-700/50 shadow-sm">
                        {daysOfWeek.map(day => (
                            <button 
                                key={day} 
                                onClick={() => setActiveDay(day)}
                                className={`relative px-6 py-3 rounded-xl font-black tracking-wide shrink-0 transition-colors z-10 snap-center ${activeDay === day ? 'text-white' : 'text-onyx-500 hover:text-onyx-800 dark:text-onyx-400 dark:hover:text-platinum-200'}`}
                            >
                                {activeDay === day && (
                                    <motion.div
                                        layoutId="activeTabletTab"
                                        className="absolute inset-0 bg-onyx-900 dark:bg-dark-teal-600 rounded-xl -z-10 shadow-md"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                            {timetable[activeDay] && timetable[activeDay].length > 0 ? timetable[activeDay].map((entry, index) => (
                                <ClassCard key={`${activeDay}-${index}`} entry={entry} index={index} />
                            )) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="col-span-full flex flex-col items-center justify-center p-12 bg-white/30 dark:bg-onyx-800/20 backdrop-blur-sm border border-dashed border-platinum-300 dark:border-onyx-700 rounded-3xl"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-platinum-200/50 dark:bg-onyx-800/50 flex items-center justify-center mb-4 text-onyx-400 text-2xl">
                                        <FaCalendarDay />
                                    </div>
                                    <p className="font-bold text-onyx-500 dark:text-onyx-400 text-lg">No classes scheduled.</p>
                                    <p className="text-sm font-semibold text-onyx-400 dark:text-onyx-500 mt-1">Enjoy your free time.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Laptop First: Advanced Grid View */}
                <div className="hidden lg:grid grid-cols-5 gap-6 mt-4">
                    {daysOfWeek.map((day, dayIndex) => (
                        <div key={day} className="flex flex-col gap-4">
                            {/* Column Header */}
                            <div className="bg-white/80 dark:bg-onyx-800/60 backdrop-blur-xl border border-platinum-200 dark:border-onyx-700 shadow-sm rounded-2xl p-4 text-center sticky top-24 z-20">
                                <h3 className="font-black text-lg text-onyx-900 dark:text-platinum-50 tracking-tight">{day}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-dark-teal-600 dark:text-dark-teal-400">{timetable[day]?.length || 0} Sessions</p>
                            </div>
                            
                            {/* Column Content */}
                            <div className="flex flex-col gap-4 relative">
                                {/* Vertical connecting timeline line */}
                                <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-platinum-300/50 via-platinum-300 to-transparent dark:from-onyx-700/50 dark:via-onyx-700 dark:to-transparent -z-10"></div>
                                
                                {timetable[day] && timetable[day].length > 0 ? timetable[day].map((entry, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (dayIndex * 0.1) + (index * 0.1) }}
                                        key={index} 
                                        className="relative group pl-10"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-onyx-900 border-2 border-dark-teal-500 dark:border-dark-teal-400 group-hover:scale-150 group-hover:bg-dark-teal-500 transition-all shadow-[0_0_10px_rgba(27,218,228,0.4)]"></div>
                                        
                                        <div className="bg-white/70 dark:bg-onyx-800/50 backdrop-blur-md border border-platinum-200 dark:border-onyx-700/60 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all p-4 hover:-translate-y-1">
                                            <p className="font-bold text-sm text-dark-teal-600 dark:text-dark-teal-400 mb-1 leading-none">{entry.start_time.substring(0,5)} - {entry.end_time.substring(0,5)}</p>
                                            <h4 className="font-extrabold text-base tracking-tight text-onyx-900 dark:text-platinum-50 group-hover:text-dark-teal-700 dark:group-hover:text-platinum-200 transition-colors leading-tight mb-2">{entry.subject_name}</h4>
                                            <span className="text-[10px] font-black text-onyx-500 uppercase tracking-widest bg-platinum-100 dark:bg-onyx-900/60 px-2 py-1 rounded-md border border-platinum-200 dark:border-onyx-800">Div {entry.division}</span>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="pl-10 h-32 flex items-center justify-center opacity-50 relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-platinum-200 dark:bg-onyx-700 border-2 border-platinum-300 dark:border-onyx-600"></div>
                                        <p className="text-sm font-bold text-onyx-400 dark:text-onyx-500 italic">No scheduled classes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}