import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaIdBadge, FaLock, FaEye, FaEyeSlash, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeProvider';
import { useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
	const [rollNumber, setRollNumber] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (rollNumber === 'STUDENT01' && password === 'password123') {
				navigate('/student/dashboard');
			} else {
				throw new Error('Invalid roll number or password.');
			}
		} catch (err) {
			setError(err.message || 'An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/30 via-primary/15 to-background-light dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90 p-4">
			{/* Top-right theme toggle */}
			<button
				className="absolute top-4 right-4 inline-flex items-center justify-center p-2 rounded-full bg-white dark:bg-secondary-dark text-text-light dark:text-text-dark shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
				onClick={toggleTheme}
				aria-label="Toggle theme"
			>
				{theme === 'dark' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
			</button>

			<div className="bg-white/90 dark:bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/60 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10 w-full max-w-md transition-transform transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]">
				<h2 className="text-2xl font-bold text-center text-text-light dark:text-text-dark mb-2">Student Login</h2>
				<p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">Access your student dashboard securely</p>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="rollNumber" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
							Roll Number
						</label>
						<div className="relative">
							<span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
								<FaIdBadge />
							</span>
							<input
								type="text"
								id="rollNumber"
								name="rollNumber"
								value={rollNumber}
								onChange={(e) => setRollNumber(e.target.value)}
								className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-white/10 text-text-light dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="Enter your roll number"
								autoComplete="username"
								required
							/>
						</div>
					</div>

					<div className="mb-2">
						<label htmlFor="password" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
							Password
						</label>
						<div className="relative">
							<span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
								<FaLock />
							</span>
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-white/10 text-text-light dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="Enter your password"
								autoComplete="current-password"
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
								onClick={() => setShowPassword((s) => !s)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>

					<div className="mt-3 mb-1 flex items-center justify-between">
						<label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
							<input
								type="checkbox"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
							/>
							Remember me
						</label>
						<Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
							Back to role selection
						</Link>
					</div>

					{error ? (
						<p className="mt-2 text-sm text-accent-red" role="alert">{error}</p>
					) : null}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full mt-4 py-2 px-4 rounded-md bg-primary text-white shadow hover:brightness-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center"
					>
						{isLoading ? (
							<>
								<span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
								Logging in...
							</>
						) : (
							'Sign in'
						)}
					</button>

					<Link to="/forgot-password" className="mt-4 block text-center text-sm text-gray-600 dark:text-gray-400 hover:underline">
						Forgot Password?
					</Link>
				</form>
			</div>
		</div>
	);
};

export default StudentLoginPage; 