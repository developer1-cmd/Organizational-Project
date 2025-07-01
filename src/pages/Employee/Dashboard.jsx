import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function EmployeeDashboard() {
  // Helper to determine text color based on background brightness
  const getTextColor = (bgColor) => {
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140 ? '#000' : '#fff';
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const styles = {
    layout: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#f5f6fa',
      overflow: 'hidden',
    },
    pageBody: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
    },
    welcome: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: getTextColor('#f5f6fa'),
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    card: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '16px',
      marginBottom: '8px',
      color: 'black',
    },
    cardValue: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: 'black',
    },
    announcements: {
      marginBottom: '20px',
    },
    annTitle: {
      fontSize: '18px',
      marginBottom: '10px',
      fontWeight: 'bold',
      color: getTextColor('#f5f6fa'),
    },
    annItem: {
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      color: 'black',
    },
  };

  const dummyStats = {
    attendance: 'Present',
    pendingTasks: 2,
    approvedLeaves: 5,
  };

  const dummyAnnouncements = [
    { id: 1, text: '📣 HR policy updated — check email.' },
    { id: 2, text: '🎉 Office will remain closed on July 15.' },
  ];

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.welcome}>Welcome back, Employee 👋</div>

          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Today's Attendance</div>
              <div style={styles.cardValue}>{dummyStats.attendance}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Pending Tasks</div>
              <div style={styles.cardValue}>{dummyStats.pendingTasks}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Approved Leaves</div>
              <div style={styles.cardValue}>{dummyStats.approvedLeaves}</div>
            </div>
          </div>

          <div style={styles.announcements}>
            <div style={styles.annTitle}>Latest Announcements</div>
            {dummyAnnouncements.map((a) => (
              <div key={a.id} style={styles.annItem}>
                {a.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 998,
          }}
        />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default EmployeeDashboard;
