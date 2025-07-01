import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const styles = {
    layout: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
    },
    sidebar: {
      width: '240px',
      backgroundColor: '#1e272e',
      color: 'white',
      padding: '20px',
      flexShrink: 0,
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
    }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>

          {/* Summary Cards */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
            {['Employees', 'Attendance Today', 'Upcoming Leaves', 'Tasks Due'].map((title, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 200px',
                  backgroundColor: 'white',
                  color: '#000',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <h4>{title}</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>--</p>
              </div>
            ))}
          </div>

          {/* Attendance Chart + Task Summary */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
            <div
              style={{
                flex: '2',
                minWidth: '300px',
                backgroundColor: 'white',
                color: '#000',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h4>Attendance Overview</h4>
              <p>Chart placeholder</p>
            </div>
            <div
              style={{
                flex: '1',
                minWidth: '200px',
                backgroundColor: 'white',
                color: '#000',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h4>Task Summary</h4>
              <ul>
                <li>Pending: --</li>
                <li>Completed: --</li>
              </ul>
            </div>
          </div>

          {/* Announcements */}
          <div
            style={{
              marginTop: '30px',
              backgroundColor: 'white',
              color: '#000',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h4>Announcements</h4>
            <ul>
              <li>📣 HR Policy updated</li>
              <li>📣 Team outing on 15th July</li>
            </ul>
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

export default DashboardPage;
