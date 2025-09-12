import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeProvider';
import { useNavigate } from 'react-router-dom';

/**
 * @typedef {Object} RoleCardProps
 * @property {React.ElementType} icon - Icon component to render
 * @property {string} title - Title text for the role card
 * @property {string} description - Description text for the role card
 * @property {() => void} onClick - Click handler for the card
 */

/**
 * Reusable role card component
 * @param {RoleCardProps} props
 */
const RoleCard = ({ icon: Icon, title, description, onClick }) => {
	return (
		<div
			className="bg-white/90 dark:bg-white/10 backdrop-blur rounded-xl shadow-xl hover:shadow-2xl p-6 w-full max-w-sm text-center cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100 dark:border-white/10"
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick && onClick();
				}
			}}
		>
			<div className="text-primary text-5xl mx-auto mb-4">
				{Icon ? <Icon aria-hidden="true" className="mx-auto" /> : null}
			</div>
			<h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">{title}</h3>
			<p className="text-gray-500 dark:text-gray-400 hidden md:block">{description}</p>
		</div>
	);
};

const RoleSelectionPage = () => {
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();

	// Typewriter effect for the title only
	const fullTitle = 'Welcome! Choose Your Role';
	const fullSubtitle = 'Select a role to continue to the appropriate experience.';
	const [titleIndex, setTitleIndex] = useState(0);
	const [subtitleVisible, setSubtitleVisible] = useState(false);
	const titleDone = titleIndex >= fullTitle.length;

	useEffect(() => {
		if (!titleDone) {
			const id = setTimeout(() => setTitleIndex((i) => i + 1), 40);
			return () => clearTimeout(id);
		}
		// When title is done, reveal subtitle with fade-in
		const showId = setTimeout(() => setSubtitleVisible(true), 150);
		return () => clearTimeout(showId);
	}, [titleDone, titleIndex]);

	const handleRoleSelection = (role) => {
		switch (role) {
			case 'Student':
				navigate('/login/student');
				break;
			case 'Faculty':
				navigate('/login/faculty');
				break;
			case 'Admin':
				navigate('/login/admin');
				break;
			default:
				break;
		}
	};

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-primary/30 via-primary/15 to-background-light dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90 flex flex-col items-center justify-center p-4">
			{/* Top-right theme toggle */}
			<button
				className="absolute top-4 right-4 inline-flex items-center justify-center p-2 rounded-full bg-white dark:bg-secondary-dark text-text-light dark:text-text-dark shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
				onClick={toggleTheme}
				aria-label="Toggle theme"
			>
				{theme === 'dark' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
			</button>

			<header className="text-center mb-12">
				<h1 className="text-4xl font-bold text-text-light dark:text-text-dark" aria-live="polite">
					{fullTitle.slice(0, titleIndex)}
					{!titleDone && <span className="ml-1 border-r-2 border-primary align-middle" />}
				</h1>
				<p
					className={`mt-2 text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-opacity duration-500 ${subtitleVisible ? 'opacity-100' : 'opacity-0'}`}
					aria-live="polite"
				>
					{fullSubtitle}
				</p>
			</header>

			<main className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
				<RoleCard
					icon={FaUserGraduate}
					title="Student"
					description="Access courses, assignments, and academic resources tailored for students."
					onClick={() => handleRoleSelection('Student')}
				/>
				<RoleCard
					icon={FaChalkboardTeacher}
					title="Faculty"
					description="Manage classes, create content, and track student progress efficiently."
					onClick={() => handleRoleSelection('Faculty')}
				/>
				<RoleCard
					icon={FaUserShield}
					title="Admin"
					description="Oversee system settings, user roles, and platform-wide configurations."
					onClick={() => handleRoleSelection('Admin')}
				/>
			</main>
		</div>
	);
};

export default RoleSelectionPage;

export { RoleCard }; 