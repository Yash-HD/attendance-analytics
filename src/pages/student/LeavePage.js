import React from 'react';
import MainLayout from '../../components/student/MainLayout';

const LeavePage = () => {
	return (
		<MainLayout>
			<div className="max-w-6xl mx-auto p-4">
				<div className="bg-white/90 dark:bg-white/10 backdrop-blur rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow">
					<p className="text-gray-700 dark:text-gray-300">Apply for leave and review status here.</p>
				</div>
			</div>
		</MainLayout>
	);
};

export default LeavePage; 