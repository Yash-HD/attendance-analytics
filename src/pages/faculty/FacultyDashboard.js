import React, { useState, useEffect } from 'react'; // <-- STEP 1: Import hooks
import { Link } from 'react-router-dom';
import { FaClock, FaExclamationTriangle, FaEnvelopeOpenText, FaArrowRight } from 'react-icons/fa';
// In a real app, you'd import axios
// import axios from 'axios';

const DashboardCard = ({ children, className }) => (
  <div className={`bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-lg dark:shadow-black/20 ${className}`}>
    {children}
  </div>
);

export default function FacultyDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // --- REAL API CALL (re-added as requested) ---
        // const response = await axios.get('/api/faculty/dashboard');
        // setDashboardData(response.data);

        // --- SIMULATING A SUCCESSFUL API CALL WITH MOCK DATA ---
        setTimeout(() => {
          const mockData = {
            todaysClasses: [
              { classId: "CS301", subjectName: "Data Structures", time: "10:00 AM - 11:00 AM", semester: "3rd Sem, CSE" },
              { classId: "EC305", subjectName: "Digital Electronics", time: "01:00 PM - 02:00 PM", semester: "3rd Sem, ECE" },
            ],
            liveSession: { classId: "CS301", subjectName: "Data Structures", presentCount: 45, totalStudents: 60 },
            atRiskStudents: [
              { name: "Priya Singh", attendance: "68%" }, { name: "Amit Kumar", attendance: "71%" },
            ],
            pendingLeaves: [
              { studentName: "Rohan Kumar", forDates: "Sep 15 - Sep 16" }, { studentName: "Anjali Gupta", forDates: "Sep 15" },
            ],
          };
          setDashboardData(mockData);
        }, 1000);

      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-accent-red">{error}</div>;
  }
  if (!dashboardData) {
    return <div className="p-6">No data available.</div>
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Good Afternoon, Dr. Sharma</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Here’s your overview for today.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard>
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-text-light dark:text-text-dark">
                <FaClock /> Today's Schedule
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {dashboardData.todaysClasses.map((cls) => (
                <div key={cls.classId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <div>
                    <p className="font-semibold text-text-light dark:text-text-dark">{cls.subjectName} ({cls.classId})</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cls.time} | {cls.semester}</p>
                  </div>
                  <Link to={`/faculty/session/${cls.classId}`} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Start Session
                  </Link>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          {dashboardData.liveSession && (
            <Link to={`/faculty/session/${dashboardData.liveSession.classId}`} className="bg-green-500 dark:bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors">
              <div className="p-4">
                <p className="font-semibold text-lg">{dashboardData.liveSession.subjectName} - Live</p>
                <p className="text-3xl font-bold">{dashboardData.liveSession.presentCount} / {dashboardData.liveSession.totalStudents}</p>
                <p>Students Present</p>
              </div>
            </Link>
          )}

          <Link to="/faculty/reports">
            <DashboardCard className="hover:shadow-xl transition-shadow">
              <div className="p-4">
                <h3 className="font-semibold flex items-center gap-2 text-text-light dark:text-text-dark"><FaExclamationTriangle className="text-accent-amber" /> At-Risk Students</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  {dashboardData.atRiskStudents.map((student, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{student.name}</span>
                      <span className="font-semibold">{student.attendance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </DashboardCard>
          </Link>

          <Link to="/faculty/leave">
            <DashboardCard className="hover:shadow-xl transition-shadow">
              <div className="p-4">
                <h3 className="font-semibold flex items-center gap-2 text-text-light dark:text-text-dark"><FaEnvelopeOpenText className="text-primary" /> Pending Leave Requests</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  {dashboardData.pendingLeaves.map((leave, index) => (
                    <li key={index}>
                      <span className="font-semibold">{leave.studentName}</span> for {leave.forDates}
                    </li>
                  ))}
                </ul>
                <div className="text-right mt-2 text-primary font-semibold text-sm flex items-center justify-end gap-1">
                  View All <FaArrowRight />
                </div>
              </div>
            </DashboardCard>
          </Link>
        </div>
      </div>
    </div>
  );
}