import React, { useMemo, useState } from 'react';
import MainLayout from '../../components/student/MainLayout';
import { FaCalendarAlt, FaListUl } from 'react-icons/fa';

const SAMPLE_SUBJECTS = ['All Subjects', 'Data Structures', 'Operating Systems', 'Database Management', 'Computer Networks'];
const SAMPLE_RECORDS = [
	{ datetime: '2025-09-08T11:00:00', subject: 'Data Structures', status: 'Present' },
	{ datetime: '2025-09-08T14:00:00', subject: 'Database Management', status: 'Present' },
	{ datetime: '2025-09-09T09:00:00', subject: 'Operating Systems', status: 'Absent' },
	{ datetime: '2025-09-10T10:00:00', subject: 'Computer Networks', status: 'On Leave' },
	{ datetime: '2025-09-10T12:00:00', subject: 'Data Structures', status: 'Present' },
	{ datetime: '2025-09-11T11:00:00', subject: 'Operating Systems', status: 'Present' },
];

const STATUS_COLORS = {
	Present: 'text-accent-green bg-accent-green/10',
	Absent: 'text-accent-red bg-accent-red/10',
	'On Leave': 'text-accent-amber bg-accent-amber/10',
};

const getDayStatus = (dayRecords) => {
	if (!dayRecords.length) return null;
	if (dayRecords.some((r) => r.status === 'Absent')) return 'Absent';
	if (dayRecords.some((r) => r.status === 'On Leave')) return 'On Leave';
	if (dayRecords.every((r) => r.status === 'Present')) return 'Present';
	return 'Present';
};

const AttendancePage = () => {
	const [subjectFilter, setSubjectFilter] = useState('All Subjects');
	const [statusFilter, setStatusFilter] = useState('All');
	const [range, setRange] = useState('This Month'); // 'This Week' | 'This Month'
	const [view, setView] = useState('calendar'); // 'calendar' | 'list'
	const [customFrom, setCustomFrom] = useState('');
	const [customTo, setCustomTo] = useState('');

	const filteredRecords = useMemo(() => {
		const now = new Date();
		let start = new Date(now.getFullYear(), now.getMonth(), 1);
		let end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
		if (range === 'This Week') {
			const day = now.getDay();
			const diffToMonday = (day + 6) % 7;
			start = new Date(now);
			start.setDate(now.getDate() - diffToMonday);
			start.setHours(0, 0, 0, 0);
			end = new Date(start);
			end.setDate(start.getDate() + 6);
			end.setHours(23, 59, 59, 999);
		}
		if (customFrom && customTo) {
			start = new Date(customFrom);
			end = new Date(customTo);
			end.setHours(23, 59, 59, 999);
		}
		return SAMPLE_RECORDS.filter((rec) => {
			const dt = new Date(rec.datetime);
			const inRange = dt >= start && dt <= end;
			const matchSub = subjectFilter === 'All Subjects' || rec.subject === subjectFilter;
			const matchStatus = statusFilter === 'All' || rec.status === statusFilter;
			return inRange && matchSub && matchStatus;
		}).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
	}, [subjectFilter, statusFilter, range, customFrom, customTo]);

	const stats = useMemo(() => {
		const total = filteredRecords.length;
		const attended = filteredRecords.filter((r) => r.status === 'Present').length;
		const percentage = total ? Math.round((attended / total) * 100) : 0;
		return { total, attended, percentage };
	}, [filteredRecords]);

	// Build a simple month grid for the calendar view (current month)
	const calendarDays = useMemo(() => {
		const today = new Date();
		const y = today.getFullYear();
		const m = today.getMonth();
		const firstDay = new Date(y, m, 1);
		const lastDay = new Date(y, m + 1, 0);
		const startWeekday = (firstDay.getDay() + 6) % 7; // Monday=0
		const daysInMonth = lastDay.getDate();
		const cells = [];
		for (let i = 0; i < startWeekday; i++) cells.push(null);
		for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
		return cells;
	}, []);

	const recordsByDay = useMemo(() => {
		const map = new Map();
		filteredRecords.forEach((r) => {
			const d = new Date(r.datetime);
			const key = d.toDateString();
			if (!map.has(key)) map.set(key, []);
			map.get(key).push(r);
		});
		return map;
	}, [filteredRecords]);

	return (
		<MainLayout>
			<div className="max-w-6xl mx-auto p-6">
				{/* Header + Filters */}
				<div className="bg-white dark:bg-secondary-dark rounded-xl shadow-md p-4 mb-6">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
						<div>
							<h2 className="text-xl font-bold text-text-light dark:text-text-dark">My Attendance</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">Filter and explore your attendance records.</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full md:w-auto">
							<select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-secondary-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
								{SAMPLE_SUBJECTS.map((s) => (
									<option key={s} value={s}>{s}</option>
								))}
							</select>
							<select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-secondary-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
								<option>All</option>
								<option>Present</option>
								<option>Absent</option>
								<option>On Leave</option>
							</select>
							<div className="flex items-center gap-2">
								<button onClick={() => setRange('This Week')} className={`px-3 py-2 rounded-md border ${range === 'This Week' ? 'bg-primary text-white border-primary' : 'border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200'}`}>This Week</button>
								<button onClick={() => setRange('This Month')} className={`px-3 py-2 rounded-md border ${range === 'This Month' ? 'bg-primary text-white border-primary' : 'border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200'}`}>This Month</button>
							</div>
							<div className="flex items-center gap-2">
								<input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-secondary-dark text-gray-800 dark:text-white" />
								<span className="text-gray-500">to</span>
								<input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-secondary-dark text-gray-800 dark:text-white" />
							</div>
						</div>
					</div>
				</div>

				{/* Summary Statistics */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
					<div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
						<p className="text-sm text-gray-700 dark:text-gray-300">Total Classes Held</p>
						<p className="text-2xl font-bold text-text-light dark:text-text-dark">{stats.total}</p>
					</div>
					<div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
						<p className="text-sm text-gray-700 dark:text-gray-300">Classes Attended</p>
						<p className="text-2xl font-bold text-accent-green">{stats.attended}</p>
					</div>
					<div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
						<p className="text-sm text-gray-700 dark:text-gray-300">Attendance Percentage</p>
						<p className={`text-2xl font-bold ${stats.percentage >= 85 ? 'text-accent-green' : stats.percentage >= 70 ? 'text-accent-amber' : 'text-accent-red'}`}>{stats.percentage}%</p>
					</div>
				</div>

				{/* View Toggle */}
				<div className="flex items-center gap-2 mb-4">
					<button onClick={() => setView('calendar')} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border ${view === 'calendar' ? 'bg-primary text-white border-primary' : 'border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200'}`}>
						<FaCalendarAlt /> Calendar View
					</button>
					<button onClick={() => setView('list')} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border ${view === 'list' ? 'bg-primary text-white border-primary' : 'border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200'}`}>
						<FaListUl /> List View
					</button>
				</div>

				{/* Calendar or List */}
				{view === 'calendar' ? (
					<div className="bg-white dark:bg-secondary-dark rounded-xl shadow-md p-4">
						{/* Simple calendar grid for current month */}
						<div className="grid grid-cols-7 gap-2">
							{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
								<div key={d} className="text-xs font-semibold text-center text-gray-600 dark:text-gray-400">{d}</div>
							))}
							{calendarDays.map((date, idx) => {
								if (!date) return <div key={idx} />;
								const key = date.toDateString();
								const dayRecs = recordsByDay.get(key) || [];
								const status = getDayStatus(dayRecs);
								const bg = status === 'Present' ? 'bg-accent-green/15' : status === 'Absent' ? 'bg-accent-red/15' : status === 'On Leave' ? 'bg-accent-amber/15' : 'bg-transparent';
								return (
									<button key={idx} className={`h-20 rounded-md border border-gray-200 dark:border-white/10 p-2 text-left ${bg}`} title={key}>
										<div className="text-xs text-gray-600 dark:text-gray-400">{date.getDate()}</div>
										<div className="mt-1 space-y-0.5 overflow-hidden">
											{dayRecs.slice(0, 2).map((r, i) => (
												<div key={i} className={`text-[10px] px-1 py-0.5 rounded ${STATUS_COLORS[r.status]}`}>{r.subject} • {r.status}</div>
											))}
											{dayRecs.length > 2 && <div className="text-[10px] text-gray-500">+{dayRecs.length - 2} more</div>}
										</div>
									</button>
								);
							})}
						</div>
					</div>
				) : (
					<div className="bg-white dark:bg-secondary-dark rounded-xl shadow-md p-4">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
								<thead>
									<tr className="text-left text-sm text-gray-600 dark:text-gray-300">
										<th className="py-2 pr-4">Date & Time</th>
										<th className="py-2 pr-4">Subject</th>
										<th className="py-2">Status</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 dark:divide-white/10">
									{filteredRecords.map((r, idx) => (
										<tr key={idx} className="text-sm text-gray-700 dark:text-gray-200">
											<td className="py-2 pr-4 whitespace-nowrap">{new Date(r.datetime).toLocaleString()}</td>
											<td className="py-2 pr-4 whitespace-nowrap">{r.subject}</td>
											<td className="py-2">
												<span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[r.status]}`}>{r.status}</span>
											</td>
										</tr>
									))}
									{filteredRecords.length === 0 && (
										<tr>
											<td colSpan={3} className="py-6 text-center text-gray-500">No records found for selected filters.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default AttendancePage; 