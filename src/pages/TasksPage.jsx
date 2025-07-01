import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function TasksPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    activeButton: {
      padding: '8px 16px',
      backgroundColor: '#44bd32',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    inactiveButton: {
      padding: '8px 16px',
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
    toggleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    toggleLabel: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#2f3640',
    },
    toggleSwitch: {
      position: 'relative',
      width: '50px',
      height: '28px',
    },
    toggleCheckbox: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    toggleSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '.4s',
      borderRadius: '34px',
    },
    toggleSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '20px',
      width: '20px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%',
    },
    toggleSliderChecked: {
      backgroundColor: '#44bd32',
    },
    toggleSliderBeforeChecked: {
      transform: 'translateX(22px)',
    },
  };

  const dummyTasks = [
    {
      id: 1,
      title: 'Complete onboarding process',
      assignedTo: 'Alice Johnson',
      dueDate: '2025-06-28',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Submit attendance report',
      assignedTo: 'Bob Singh',
      dueDate: '2025-06-26',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Update payroll for June',
      assignedTo: 'Carla Mendes',
      dueDate: '2025-06-30',
      status: 'Pending',
    },
  ];

  const [tasks, setTasks] = useState(dummyTasks);

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={styles.button} onClick={() => setShowCreateModal(true)}>+ Create Task</button>
            <div style={styles.toggleWrapper}>
              <label style={styles.toggleLabel}>Edit Mode</label>
              <label style={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={editMode}
                  onChange={() => setEditMode(prev => !prev)}
                  style={styles.toggleCheckbox}
                />
                <span
                  style={{
                    ...styles.toggleSlider,
                    ...(editMode ? styles.toggleSliderChecked : {}),
                  }}
                >
                  <span
                    style={{
                      ...styles.toggleSliderBefore,
                      ...(editMode ? styles.toggleSliderBeforeChecked : {}),
                    }}
                  />
                </span>
              </label>
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td style={styles.td}>
                    {editMode ? (
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) =>
                          setTasks(tasks.map(t =>
                            t.id === task.id ? { ...t, title: e.target.value } : t
                          ))
                        }
                        style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td style={styles.td}>
                    {editMode ? (
                      <input
                        type="text"
                        value={task.assignedTo}
                        onChange={(e) =>
                          setTasks(tasks.map(t =>
                            t.id === task.id ? { ...t, assignedTo: e.target.value } : t
                          ))
                        }
                        style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
                      />
                    ) : (
                      task.assignedTo
                    )}
                  </td>
                  <td style={styles.td}>
                    {editMode ? (
                      <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) =>
                          setTasks(tasks.map(t =>
                            t.id === task.id ? { ...t, dueDate: e.target.value } : t
                          ))
                        }
                        style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
                      />
                    ) : (
                      task.dueDate
                    )}
                  </td>
                  <td style={styles.td}>
                    {editMode ? (
                      <select
                        value={task.status}
                        onChange={(e) =>
                          setTasks(tasks.map(t =>
                            t.id === task.id ? { ...t, status: e.target.value } : t
                          ))
                        }
                        style={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    ) : (
                      task.status
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showCreateModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '8px',
                width: '400px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                <h3 style={{ marginBottom: '16px', color: '#2f3640' }}>Create New Task</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const newTask = {
                    id: Date.now(),
                    title: form.title.value,
                    assignedTo: form.assignedTo.value,
                    dueDate: form.dueDate.value,
                    status: form.status.value
                  };
                  setTasks([...tasks, newTask]);
                  setShowCreateModal(false);
                }}>
                  <label style={{ color: '#2f3640', fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Title</label>
                  <input name="title" required style={{ width: '100%', marginBottom: '10px', padding: '6px', color: '#2f3640' }} />
                  <label style={{ color: '#2f3640', fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Assigned To</label>
                  <input name="assignedTo" required style={{ width: '100%', marginBottom: '10px', padding: '6px', color: '#2f3640' }} />
                  <label style={{ color: '#2f3640', fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Due Date</label>
                  <input type="date" name="dueDate" required style={{ width: '100%', marginBottom: '10px', padding: '6px', color: '#2f3640' }} />
                  <label style={{ color: '#2f3640', fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>Status</label>
                  <select name="status" required style={{ width: '100%', marginBottom: '16px', padding: '6px', color: '#2f3640' }}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" onClick={() => setShowCreateModal(false)} style={{ background: '#ccc', padding: '6px 12px', borderRadius: '4px' }}>Cancel</button>
                    <button type="submit" style={{ background: '#44bd32', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px' }}>Create</button>
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
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default TasksPage;
