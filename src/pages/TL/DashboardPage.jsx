import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function TeamLeadDashboard() {
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
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    label: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '5px',
    },
    value: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#2f3640',
    },
  };

  const dummyStats = {
    teamSize: 5,
    presentToday: 4,
    pendingTasks: 7,
    leaveRequests: 2,
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <h2 style={styles.title}>Team Lead Dashboard</h2>

          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.label}>Team Members</div>
              <div style={styles.value}>{dummyStats.teamSize}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.label}>Present Today</div>
              <div style={styles.value}>{dummyStats.presentToday}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.label}>Pending Tasks</div>
              <div style={styles.value}>{dummyStats.pendingTasks}</div>
            </div>
            <div style={styles.card}>
              <div style={styles.label}>Leave Requests</div>
              <div style={styles.value}>{dummyStats.leaveRequests}</div>
            </div>
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
        role="TEAM_LEAD"
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default TeamLeadDashboard;
