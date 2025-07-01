import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// Pages (sample structure — replace with actual imports)
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import AttendancePage from './pages/AttendancePage';
import LeavesPage from './pages/LeavesPage';
import PayrollPage from './pages/PayrollPage';
import TasksPage from './pages/TasksPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

import EmployeeDashboard from './pages/Employee/Dashboard';
import EmployeeAttendance from './pages/Employee/EmployeeAttendance';
import EmployeeLeaves from './pages/Employee/EmployeeLeaves';
import EmployeeTasks from './pages/Employee/EmployeeTasks';
import EmployeeAnnouncements from './pages/Employee/EmployeeAnnouncements';

import TLDashboard from './pages/TL/DashboardPage';
import TLTeamMembers from './pages/TL/TeamMembers';
import TLAttendance from './pages/TL/TeamAttendance';
import TLLeaves from './pages/TL/TeamLeaves';
import TLTasksPage from './pages/TL/TeamTasks';
import TLAnnouncements from './pages/TL/TeamAnnouncements';

const App = () => {
  return (
    <>
      <SidebarWrapper />
      <div className="main-content">
        <Routes>
          {/* Admin Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/leaves" element={<LeavesPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />

          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/leaves" element={<EmployeeLeaves />} />
          <Route path="/employee/tasks" element={<EmployeeTasks />} />
          <Route path="/employee/announcements" element={<EmployeeAnnouncements />} />

          {/* TL Routes */}
          <Route path="/tl/dashboard" element={<TLDashboard />} />
          <Route path="/tl/team-members" element={<TLTeamMembers />} />
          <Route path="/tl/attendance" element={<AttendancePage />} />
          <Route path="/tl/team-leaves" element={<TLLeaves />} />
          <Route path="/tl/tasks" element={<TLTasksPage />} />
          <Route path="/tl/team-announcements" element={<TLAnnouncements />} />
          <Route path="/tl/team-attendance" element={<TLAttendance />} />
          
          {/* Fallback Route */}
        </Routes>
      </div>
    </>
  );
};

const SidebarWrapper = () => {
  const pathname = window.location.pathname;
  const isEmployeeView = pathname.startsWith('/employee');
  const isTeamLeadView = pathname.startsWith('/tl');

  return <Sidebar isEmployeeView={isEmployeeView} isTeamLeadView={isTeamLeadView} />;
};

export default App;
