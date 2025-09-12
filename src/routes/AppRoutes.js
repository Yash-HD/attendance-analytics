import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelectionPage from '../pages/RoleSelectionPage';
import StudentLoginPage from '../pages/StudentLoginPage';
import FacultyLoginPage from '../pages/FacultyLoginPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import DashboardPage from '../pages/student/DashboardPage';
import AttendancePage from '../pages/student/AttendancePage';
import LeavePage from '../pages/student/LeavePage';
import ProfilePage from '../pages/student/ProfilePage';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RoleSelectionPage />} />
				<Route path="/login/student" element={<StudentLoginPage />} />
				<Route path="/login/faculty" element={<FacultyLoginPage />} />
				<Route path="/login/admin" element={<AdminLoginPage />} />

				{/* Student Portal Routes */}
				<Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
				<Route path="/student/dashboard" element={<DashboardPage />} />
				<Route path="/student/attendance" element={<AttendancePage />} />
				<Route path="/student/leave" element={<LeavePage />} />
				<Route path="/student/profile" element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
} 