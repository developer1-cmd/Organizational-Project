import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPeople, MdAccessTime, MdCalendarToday, MdAttachMoney, MdTaskAlt, MdCampaign } from 'react-icons/md';

function Sidebar({ isOpen, onClose, userRole }) {
  // Helper function for route redirection
  const getRedirectPath = (label, path, isEmployeeView, isTeamLeadView) => {
    if (isEmployeeView) {
      switch (label) {
        case 'Employees': return '/employee/team-members';
        case 'Attendance': return '/employee/attendance';
        case 'Leaves': return '/employee/leaves';
        case 'Tasks': return '/employee/tasks';
        case 'Announcements': return '/employee/employeeannouncements';
        default: return `/employee${path}`;
      }
    }
    if (isTeamLeadView) {
      switch (label) {
        case 'Employees': return '/tl/team-members';
        case 'Attendance': return '/tl/team-attendance';
        case 'Leaves': return '/tl/team-leaves';
        case 'Tasks': return '/tl/tasks';
        case 'Announcements': return '/tl/team-announcements';
        default: return `/tl${path}`;
      }
    }
    return path;
  };

  const styles = {
    sidebar: {
      width: '100%',
      height: '100%',
      backgroundColor: '#1e272e',
      color: '#fff',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      gap: '15px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    navLink: {
      color: '#dcdde1',
      textDecoration: 'none',
      fontSize: '16px',
      padding: '8px 12px',
      borderRadius: '6px',
      transition: 'background 0.2s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    navLinkHover: {
      backgroundColor: '#353b48',
    },
    activeDot: {
      height: '8px',
      width: '8px',
      backgroundColor: '#44bd32',
      borderRadius: '50%',
      marginRight: '8px',
    },
  };

  const [hoveredPath, setHoveredPath] = useState(null);

  const allItems = [
    [<MdDashboard />, 'Dashboard', '/dashboard'],
    [<MdPeople />, 'Employees', '/employees'],
    [<MdAccessTime />, 'Attendance', '/attendance'],
    [<MdCalendarToday />, 'Leaves', '/leaves'],
    [<MdAttachMoney />, 'Payroll', '/payroll'],
    [<MdTaskAlt />, 'Tasks', '/tasks'],
    [<MdCampaign />, 'Announcements', '/announcements'],
  ];

  const isEmployeeView = userRole === 'EMPLOYEE';
  const isTeamLeadView = userRole === 'TL';

  const items = isEmployeeView
    ? allItems.filter(([, label]) => !['Employees', 'Payroll'].includes(label))
    : isTeamLeadView
    ? allItems.filter(([, label]) => label !== 'Payroll')
    : allItems;

  // Track window size for mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        style={{
          ...styles.sidebar,
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '240px',
          zIndex: 999,
          backgroundColor: '#1e272e',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div style={styles.container}>
          <div style={styles.logo}>HRMS</div>
          {items.map(([icon, label, path]) => (
            <NavLink
              key={path}
              to={getRedirectPath(label, path, isEmployeeView, isTeamLeadView)}
              onClick={onClose}
              onMouseEnter={() => setHoveredPath(path)}
              onMouseLeave={() => setHoveredPath(null)}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(hoveredPath === path ? styles.navLinkHover : {}),
                backgroundColor: isActive ? '#2f3640' : hoveredPath === path ? '#353b48' : 'transparent',
                color: isActive ? '#fff' : '#dcdde1',
              })}
            >
              {({ isActive }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isActive && <div style={styles.activeDot} />}
                  {icon}
                  <span style={{ marginLeft: 8 }}>{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      {/* Bottom navigation bar for mobile */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: '#1e272e',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 999,
            borderTop: '1px solid #353b48',
          }}
        >
          {items.map(([icon, label, path]) => (
            <NavLink
              key={path}
              to={getRedirectPath(label, path, isEmployeeView, isTeamLeadView)}
              onClick={onClose}
              style={({ isActive }) => ({
                color: isActive ? '#44bd32' : '#dcdde1',
                textDecoration: 'none',
                fontSize: '24px',
                fontWeight: isActive ? 'bold' : 'normal',
                backgroundColor: isActive ? '#2f3640' : 'transparent',
                padding: '6px 12px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              })}
            >
              {icon}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

export default Sidebar;
