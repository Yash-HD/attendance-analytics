import React, { useMemo, useState } from 'react';
import MainLayout from '../../components/student/MainLayout';

// Mock Data - In a real app, this would come from an API call
const SAMPLE_RECORDS = [
    { datetime: '2025-09-08T11:00:00', subject: 'Data Structures', status: 'Present' },
    { datetime: '2025-09-08T14:00:00', subject: 'Database Management', status: 'Present' },
    { datetime: '2025-09-09T09:00:00', subject: 'Operating Systems', status: 'Absent' },
    { datetime: '2025-09-10T12:00:00', subject: 'Data Structures', status: 'Present' },
    { datetime: '2025-08-11T11:00:00', subject: 'Operating Systems', status: 'Present' },
    { datetime: '2025-08-12T10:00:00', subject: 'Computer Networks', status: 'Present' },
];
const SAMPLE_SUBJECTS = ['All Subjects', 'Data Structures', 'Operating Systems', 'Database Management', 'Computer Networks'];
const MONTHS = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AttendancePage = () => {
    // State for our simplified filters
    const [subjectFilter, setSubjectFilter] = useState('All Subjects');
    // Default to the current month (e.g., 9 for September)
    const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);

    // This hook processes the raw records into the aggregated stats we need for the tiles
    const subjectStats = useMemo(() => {
        // 1. Filter records by the selected month (if not 'All Months')
        const recordsInMonth = monthFilter === 'All Months' 
            ? SAMPLE_RECORDS 
            : SAMPLE_RECORDS.filter(rec => new Date(rec.datetime).getMonth() + 1 === parseInt(monthFilter));
        
        // 2. Group the filtered records by subject
        const groupedBySubject = recordsInMonth.reduce((acc, rec) => {
            if (!acc[rec.subject]) {
                acc[rec.subject] = [];
            }
            acc[rec.subject].push(rec);
            return acc;
        }, {});

        // 3. Calculate stats for each subject
        let stats = Object.keys(groupedBySubject).map(subjectName => {
            const records = groupedBySubject[subjectName];
            const totalLec = records.length;
            const attendedLec = records.filter(r => r.status === 'Present').length;
            const percentage = totalLec > 0 ? Math.round((attendedLec / totalLec) * 100) : 0;
            return { subjectName, totalLec, attendedLec, percentage };
        });
        
        // 4. Apply the subject filter
        if (subjectFilter !== 'All Subjects') {
            stats = stats.filter(s => s.subjectName === subjectFilter);
        }

        return stats;
    }, [subjectFilter, monthFilter]);

    const getPercentColor = (pct) => {
        if (pct >= 85) return 'text-accent-green';
        if (pct >= 70) return 'text-accent-amber';
        return 'text-accent-red';
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto p-6">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">View your subject-wise attendance summary.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select 
                            value={subjectFilter} 
                            onChange={(e) => setSubjectFilter(e.target.value)} 
                            className="w-full md:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-secondary-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {SAMPLE_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select 
                            value={monthFilter} 
                            onChange={(e) => setMonthFilter(e.target.value)} 
                            className="w-full md:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-secondary-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {MONTHS.map((m, i) => <option key={m} value={i === 0 ? 'All Months' : i}>{m}</option>)}
                        </select>
                    </div>
                </div>

                {/* Responsive Tile Grid */}
                {subjectStats.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjectStats.map(stat => (
                            <div key={stat.subjectName} className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{stat.subjectName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Attended: {stat.attendedLec} / {stat.totalLec}
                                    </p>
                                </div>
                                <div className={`mt-4 text-4xl font-extrabold text-right ${getPercentColor(stat.percentage)}`}>
                                    {stat.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        <p>No attendance records found for the selected filters.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};
export default AttendancePage;