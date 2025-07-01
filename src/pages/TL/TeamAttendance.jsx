import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function AttendanceDayRow({ day }) {
  const [open, setOpen] = React.useState(false);

  const presentCount = day.records.filter(m => m.status === 'Present').length;
  const lateCount = day.records.filter(m => m.status === 'Late').length;
  const absentCount = day.records.filter(m => m.status === 'Absent').length;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px 20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '10px',
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}
      >
        <span>{day.date}</span>
        <span>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{ marginTop: '10px' }}>
          {day.records.map((r, i) => (
            <div key={i} style={{ borderTop: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>{r.name}</span>
              <span>{r.status}</span>
              <span>{r.timeIn}</span>
              <span>{r.timeOut}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Present: {presentCount} | Late: {lateCount} | Absent: {absentCount}
      </div>
    </div>
  );
}

function TeamAttendancePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isClockedIn, setClockedIn] = useState(false);
  const [timeIn, setTimeIn] = useState('--');
  const [timeOut, setTimeOut] = useState('--');

  const teamAttendance = [
    { id: 1, name: 'Alice Johnson', timeIn: '09:00', timeOut: '17:00', status: 'Present' },
    { id: 2, name: 'Bob Singh', timeIn: '10:15', timeOut: '17:00', status: 'Late' },
    { id: 3, name: 'Carla Mendes', timeIn: '--', timeOut: '--', status: 'Absent' },
    { id: 4, name: 'You (Team Lead)', timeIn, timeOut, status: isClockedIn ? 'Present' : (timeIn !== '--' ? 'Present' : 'Absent') },
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
          <h2 style={styles.title}>Team Attendance (Today)</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Time In</th>
                <th style={styles.th}>Time Out</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamAttendance.map((member) => (
                <tr key={member.id}>
                  <td style={styles.td}>{member.name}</td>
                  <td style={styles.td}>{member.timeIn}</td>
                  <td style={styles.td}>{member.timeOut}</td>
                  <td style={styles.td}>{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '40px',
          }}>
            <h3 style={styles.title}>Your Attendance (Today)</h3>
            <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
              <input
                type="checkbox"
                checked={isClockedIn}
                onChange={() => {
                  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  if (!isClockedIn) {
                    setTimeIn(now);
                    alert('Clocked In at ' + now);
                  } else {
                    setTimeOut(now);
                    alert('Clocked Out at ' + now);
                  }
                  setClockedIn(prev => !prev);
                }}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isClockedIn ? '#44bd32' : '#ccc',
                transition: '.4s',
                borderRadius: '34px',
              }}>
                <span style={{
                  position: 'absolute',
                  height: '26px',
                  width: '26px',
                  left: isClockedIn ? '26px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%',
                }} />
              </span>
            </label>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', gap: '40px' }}>
              <p><strong>Time In:</strong> {timeIn}</p>
              <p><strong>Time Out:</strong> {timeOut}</p>
            </div>
          </div>

          <h3 style={{ ...styles.title, marginTop: '40px' }}>Total Team Attendance</h3>
          {[
            {
              date: '2024-06-28',
              records: [
                { name: 'Alice Johnson', status: 'Present', timeIn: '09:00', timeOut: '17:00' },
                { name: 'Bob Singh', status: 'Late', timeIn: '10:15', timeOut: '17:00' },
                { name: 'Carla Mendes', status: 'Absent', timeIn: '--', timeOut: '--' },
                { name: 'You (Team Lead)', status: 'Present', timeIn: '08:55', timeOut: '17:00' },
              ],
            },
            {
              date: '2024-06-27',
              records: [
                { name: 'Alice Johnson', status: 'Present', timeIn: '09:00', timeOut: '17:00' },
                { name: 'Bob Singh', status: 'Present', timeIn: '09:10', timeOut: '17:00' },
                { name: 'Carla Mendes', status: 'Late', timeIn: '10:45', timeOut: '17:00' },
                { name: 'You (Team Lead)', status: 'Present', timeIn: '08:55', timeOut: '17:00' },
              ],
            },
          ].map((day, idx) => (
            <AttendanceDayRow key={idx} day={day} />
          ))}
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

export default TeamAttendancePage;
