import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function LeavesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editableLeave, setEditableLeave] = useState({});
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState({});

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
      padding: '8px 16px',
      backgroundColor: '#2f3640',
      color: '#fff', // light text on dark button
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
      color: '#fff', // light text on dark background
      padding: '12px',
      textAlign: 'left',
      fontSize: '14px',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #eee',
      fontSize: '14px',
      color: '#000', // dark text for light background
      backgroundColor: '#fff',
    },
  };

  const dummyLeaves = [
    {
      id: 1,
      name: 'Alice Johnson',
      type: 'Sick Leave',
      from: '2025-06-20',
      to: '2025-06-22',
      reason: 'Fever and rest',
      status: 'Approved',
    },
    {
      id: 2,
      name: 'Bob Singh',
      type: 'Casual Leave',
      from: '2025-06-25',
      to: '2025-06-26',
      reason: 'Family Function',
      status: 'Pending',
    },
  ];

  // Group dummyLeaves by month and year of 'from' date, sorted by date
  const groupedLeaves = dummyLeaves
    .slice()
    .sort((a, b) => new Date(a.from) - new Date(b.from))
    .reduce((acc, leave) => {
      const date = new Date(leave.from);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(leave);
      return acc;
    }, {});

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>Leave Requests</h2>
            <button style={styles.button} onClick={() => setShowLeaveForm(true)}>+ Apply Leave</button>
          </div>

          {/* Leave Application Form */}
          {showLeaveForm && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
              onClick={() => setShowLeaveForm(false)}
            >
              <form
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  width: '90%',
                  maxWidth: '500px'
                }}
              >
                <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', color: '#2f3640', gap: '8px' }}>
                  Employee:
                  <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}>
                    <option>Alice Johnson</option>
                    <option>Bob Singh</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', color: '#2f3640', gap: '8px' }}>
                  Leave Type:
                  <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Earned Leave</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', color: '#2f3640', gap: '8px' }}>
                  From Date:
                  <input type="date" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', color: '#2f3640', gap: '8px' }}>
                  To Date:
                  <input type="date" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', color: '#2f3640', gap: '8px' }}>
                  Status:
                  <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', color: '#2f3640', gap: '8px' }}>
                  Reason:
                  <textarea rows="3" placeholder="Enter reason..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} />
                </label>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2f3640',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    alignSelf: 'flex-end'
                  }}
                >
                  Submit Leave
                </button>
              </form>
            </div>
          )}

          {Object.keys(groupedLeaves).map(monthYear => {
            const isExpanded = expandedMonths[monthYear] ?? true;
            return (
              <div key={monthYear}>
                <div
                  onClick={() =>
                    setExpandedMonths((prev) => ({
                      ...prev,
                      [monthYear]: !prev[monthYear],
                    }))
                  }
                  style={{
                    cursor: 'pointer',
                    marginTop: '20px',
                    fontWeight: 'bold',
                    color: '#2f3640',
                  }}
                >
                  {isExpanded ? '▼' : '►'} {monthYear}
                </div>
                {isExpanded && (
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={{ ...styles.th, display: 'table-cell' }}>Employee</th>
                        <th style={{ ...styles.th, display: 'table-cell' }}>Leave Type</th>
                        <th style={{ ...styles.th, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>From</th>
                        <th style={{ ...styles.th, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>To</th>
                        <th style={{ ...styles.th, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>Reason</th>
                        <th style={{ ...styles.th, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>Status</th>
                        <th style={{ ...styles.th, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedLeaves[monthYear].map((leave) => (
                        <tr key={leave.id}>
                          <td
                            style={{ ...styles.td, display: 'table-cell', cursor: window.innerWidth < 768 ? 'pointer' : 'default' }}
                            onClick={() => window.innerWidth < 768 && setSelectedLeave(leave)}
                          >
                            {leave.name}
                          </td>
                          <td style={{ ...styles.td, display: 'table-cell' }}>
                            {editId === leave.id ? (
                              <select
                                value={editableLeave.type}
                                onChange={(e) => setEditableLeave({ ...editableLeave, type: e.target.value })}
                              >
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Earned Leave">Earned Leave</option>
                              </select>
                            ) : (
                              leave.type
                            )}
                          </td>
                          <td style={{ ...styles.td, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>
                            {editId === leave.id ? (
                              <input
                                type="date"
                                value={editableLeave.from}
                                onChange={(e) => setEditableLeave({ ...editableLeave, from: e.target.value })}
                              />
                            ) : (
                              leave.from
                            )}
                          </td>
                          <td style={{ ...styles.td, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>
                            {editId === leave.id ? (
                              <input
                                type="date"
                                value={editableLeave.to}
                                onChange={(e) => setEditableLeave({ ...editableLeave, to: e.target.value })}
                              />
                            ) : (
                              leave.to
                            )}
                          </td>
                          <td style={{ ...styles.td, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>{leave.reason}</td>
                          <td style={{ ...styles.td, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>
                            {editId === leave.id ? (
                              <select
                                value={editableLeave.status}
                                onChange={(e) => setEditableLeave({ ...editableLeave, status: e.target.value })}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            ) : (
                              leave.status
                            )}
                          </td>
                          <td style={{ ...styles.td, display: window.innerWidth < 768 ? 'none' : 'table-cell' }}>
                            {editId === leave.id ? (
                              <button
                                onClick={() => {
                                  // save logic here
                                  const index = dummyLeaves.findIndex((l) => l.id === leave.id);
                                  dummyLeaves[index] = { ...dummyLeaves[index], ...editableLeave };
                                  setEditId(null);
                                }}
                                style={{ marginRight: 5 }}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditId(leave.id);
                                  setEditableLeave({ ...leave });
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
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
      {selectedLeave && (
        <div
          style={{
            position: 'fixed',
            top: '10%',
            left: '10%',
            width: '80%',
            backgroundColor: 'white',
            color: '#000', // ensure text is visible
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 999,
          }}
        >
          <h3>Leave Details</h3>
          <label>
            <strong>Employee:</strong>
            <div style={{ marginBottom: '8px' }}>{selectedLeave.name}</div>
          </label>
          <label>
            <strong>Type:</strong>
            <select
              value={selectedLeave.type}
              onChange={(e) =>
                setSelectedLeave({ ...selectedLeave, type: e.target.value })
              }
              style={{ display: 'block', marginBottom: '8px', width: '100%' }}
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </label>
          <label>
            <strong>From:</strong>
            <input
              type="date"
              value={selectedLeave.from}
              onChange={(e) =>
                setSelectedLeave({ ...selectedLeave, from: e.target.value })
              }
              style={{ display: 'block', marginBottom: '8px', width: '100%' }}
            />
          </label>
          <label>
            <strong>To:</strong>
            <input
              type="date"
              value={selectedLeave.to}
              onChange={(e) =>
                setSelectedLeave({ ...selectedLeave, to: e.target.value })
              }
              style={{ display: 'block', marginBottom: '8px', width: '100%' }}
            />
          </label>
          <label>
            <strong>Reason:</strong>
            <div style={{ marginBottom: '8px' }}>{selectedLeave.reason}</div>
          </label>
          <label>
            <strong>Status:</strong>
            <select
              value={selectedLeave.status}
              onChange={(e) =>
                setSelectedLeave({ ...selectedLeave, status: e.target.value })
              }
              style={{ display: 'block', marginBottom: '8px', width: '100%' }}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
          <button
            onClick={() => {
              const index = dummyLeaves.findIndex(
                (l) => l.id === selectedLeave.id
              );
              dummyLeaves[index] = {
                ...dummyLeaves[index],
                ...selectedLeave,
              };
              setSelectedLeave(null);
            }}
            style={{ marginTop: '10px', marginRight: '8px' }}
          >
            Save
          </button>
          <button
            onClick={() => setSelectedLeave(null)}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default LeavesPage;
