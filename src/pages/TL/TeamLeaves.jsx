import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function TeamLeadLeavesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (selectedRowId !== null) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSelectedRowId(null);
      }, 10000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedRowId]);

  const leaveRequests = [
    {
      id: 1,
      name: 'Alice Johnson',
      type: 'Sick Leave',
      from: '2025-06-24',
      to: '2025-06-25',
      status: 'Pending',
      canApprove: true,
    },
    {
      id: 2,
      name: 'Bob Singh',
      type: 'Casual Leave',
      from: '2025-06-28',
      to: '2025-06-29',
      status: 'Approved',
      canApprove: true,
    },
    {
      id: 3,
      name: 'Carla Mendes',
      type: 'Work From Home',
      from: '2025-06-23',
      to: '2025-06-23',
      status: 'Rejected',
      canApprove: true,
    },
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
    status: (value) => ({
      color:
        value === 'Approved'
          ? 'green'
          : value === 'Rejected'
          ? 'red'
          : '#e67e22',
      fontWeight: 'bold',
    }),
  };

  // Dummy handler for approve/reject actions
  const handleApproval = (id, newStatus) => {
    alert(`Leave ${newStatus} for request ID: ${id}`);
    // Logic to update status can be added here
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div style={styles.pageBody}>
          <h2 style={styles.title}>Leave Requests</h2>

          <button
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '10px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '16px',
              fontSize: '14px',
            }}
            onClick={() => setShowModal(true)}
          >
            + Apply for Leave
          </button>

          <button
            style={{
              backgroundColor: '#e67e22',
              color: 'white',
              padding: '8px 14px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '16px',
            }}
            onClick={() => alert('Exporting data...')}
          >
            Export to CSV
          </button>

          <div style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <select style={{ padding: '6px', borderRadius: '4px' }}>
              <option value="">All Types</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Work From Home">Work From Home</option>
            </select>
            <select style={{ padding: '6px', borderRadius: '4px' }}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input type="date" style={{ padding: '6px', borderRadius: '4px' }} />
            <input type="date" style={{ padding: '6px', borderRadius: '4px' }} />
            <button style={{ backgroundColor: '#2ecc71', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px' }}>
              Filter
            </button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>From</th>
                <th style={styles.th}>To</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave) => (
                <tr
                  key={leave.id}
                  onClick={() => {
                    const newSelected = selectedRowId === leave.id ? null : leave.id;
                    setSelectedRowId(newSelected);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    if (newSelected !== null) {
                      timeoutRef.current = setTimeout(() => {
                        setSelectedRowId(null);
                      }, 10000);
                    }
                  }}
                  style={{
                    position: 'relative',
                    backgroundColor: selectedRowId === leave.id ? '#f0f0f0' : 'white',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <td style={styles.td}>{leave.name}</td>
                  <td style={styles.td}>{leave.type}</td>
                  <td style={styles.td}>{leave.from}</td>
                  <td style={styles.td}>{leave.to}</td>
                  <td style={{ ...styles.td, ...styles.status(leave.status) }}>{leave.status}</td>

                  {selectedRowId === leave.id && (
                    <td
                      colSpan={5}
                      className="fadeSlideIn"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255,255,255,0.95)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '6px 18px',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApproval(leave.id, 'Approved');
                          }}
                        >
                          Approve
                        </button>
                        <button
                          style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '6px 18px',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApproval(leave.id, 'Rejected');
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Leave History</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>View past leave requests and statuses here.</p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>From</th>
                  <th style={styles.th}>To</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave) => (
                  <tr key={`history-${leave.id}`}>
                    <td style={styles.td}>{leave.name}</td>
                    <td style={styles.td}>{leave.type}</td>
                    <td style={styles.td}>{leave.from}</td>
                    <td style={styles.td}>{leave.to}</td>
                    <td style={{ ...styles.td, ...styles.status(leave.status) }}>{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
              }}
              onClick={() => setShowModal(false)}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  width: '90%',
                  maxWidth: '400px',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Apply for Leave</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Leave submitted');
                    setShowModal(false);
                  }}
                >
                  <label>Leave Type</label>
                  <select required style={{ width: '100%', marginBottom: '12px' }}>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Work From Home">Work From Home</option>
                  </select>
                  <label>From</label>
                  <input type="date" required style={{ width: '100%', marginBottom: '12px' }} />
                  <label>To</label>
                  <input type="date" required style={{ width: '100%', marginBottom: '16px' }} />
                  <label>Reason</label>
                  <textarea required style={{ width: '100%', marginBottom: '12px', minHeight: '60px' }} placeholder="Explain reason for leave" />

                  <label>Backup Plan</label>
                  <textarea required style={{ width: '100%', marginBottom: '12px', minHeight: '60px' }} placeholder="Who will handle work in your absence?" />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      style={{ padding: '6px 12px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '6px 12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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

export default TeamLeadLeavesPage;

// Animation for action buttons row
// Place this at the root so it applies globally
const styleSheet = `
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .fadeSlideIn {
    animation: fadeSlideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
    /* Ensure smooth fade and slide-in */
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('fade-slidein-style')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'fade-slidein-style';
  styleTag.innerHTML = styleSheet;
  document.head.appendChild(styleTag);
}