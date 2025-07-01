import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function TeamMembersPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Dev', email: 'alice@company.com', status: 'Active' },
    { id: 2, name: 'Bob Singh', role: 'Backend Dev', email: 'bob@company.com', status: 'On Leave' },
    { id: 3, name: 'Carla Mendes', role: 'QA Engineer', email: 'carla@company.com', status: 'Active' },
  ];

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
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#2f3640',
      color: 'white',
      padding: '12px',
      textAlign: 'left',
      fontSize: '14px',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #eee',
      fontSize: '14px',
      color: '#333',
    },
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <h2 style={styles.title}>My Team Members</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((emp) => (
                <tr key={emp.id}>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.role}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default TeamMembersPage;
