import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function EmployeeAttendancePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isClockedIn, setClockedIn] = useState(false);
  // TODO: Replace this with actual employee work type from user context or props
  const employeeWorkType = 'WFH'; // or 'ONSITE'

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
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2f3640',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#2f3640',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
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

  const dummyAttendance = [
    { date: '2025-06-24', timeIn: '09:00', timeOut: '17:00', status: 'Present' },
    { date: '2025-06-23', timeIn: '09:10', timeOut: '17:00', status: 'Present' },
    { date: '2025-06-22', timeIn: '--', timeOut: '--', status: 'Absent' },
  ];

  // Helper: get current geolocation
  const getLocation = (callback) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        if (callback) callback(coords);
      },
      () => {
        alert('Location permission denied or unavailable.');
        if (callback) callback(null);
      }
    );
  };

  // Helper: distance between two coords in meters
  function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    const R = 6371000; // meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Unified handler for clock in/out
  const handleClockToggle = () => {
    getLocation((coords) => {
      const newClockState = !isClockedIn;

      if (employeeWorkType === 'WFH') {
        setClockedIn(newClockState);
        console.log((newClockState ? 'Clock In' : 'Clock Out') + ' from WFH', coords);
      } else {
        // Office boundary: BLR, e.g., 17.407499, 78.489847
        const allowedLat = 17.407499, allowedLng = 78.489847;
        const radiusInMeters = 500;
        if (
          coords &&
          getDistanceFromLatLonInM(coords.lat, coords.lng, allowedLat, allowedLng) <= radiusInMeters
        ) {
          setClockedIn(newClockState);
          console.log((newClockState ? 'Clock In' : 'Clock Out') + ' from Office', coords);
        } else {
          alert('You must be within the office premises to clock in/out.');
        }
      }
    });
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>My Attendance</h2>
            <div
              onClick={handleClockToggle}
              style={{
                width: '60px',
                height: '32px',
                backgroundColor: isClockedIn ? '#44bd32' : '#ccc',
                borderRadius: '999px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              title={isClockedIn ? 'Clocked In' : 'Clocked Out'}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: isClockedIn ? '30px' : '4px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time In</th>
                <th style={styles.th}>Time Out</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyAttendance.map((entry, index) => (
                <tr key={index}>
                  <td style={styles.td}>{entry.date}</td>
                  <td style={styles.td}>{entry.timeIn}</td>
                  <td style={styles.td}>{entry.timeOut}</td>
                  <td style={styles.td}>{entry.status}</td>
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
        role="EMPLOYEE"
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default EmployeeAttendancePage;
