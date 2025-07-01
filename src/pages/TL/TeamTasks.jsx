import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function TeamLeadTasksPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', due: '', status: 'Pending' });

  const tasks = [
    { id: 1, title: 'Prepare project report', assignedTo: 'Alice Johnson', due: '2025-06-26', status: 'In Progress' },
    { id: 2, title: 'Fix login issue', assignedTo: 'Bob Singh', due: '2025-06-25', status: 'Completed' },
    { id: 3, title: 'Review UI updates', assignedTo: 'Carla Mendes', due: '2025-06-27', status: 'Pending' },
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
    status: (status) => ({
      color:
        status === 'Completed'
          ? 'green'
          : status === 'Pending'
          ? 'orange'
          : '#2980b9',
      fontWeight: 'bold',
    }),
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div style={styles.pageBody}>
          <h2 style={styles.title}>Team Tasks</h2>

          <div style={{ marginBottom: '20px', background: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Create New Task</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                style={{ flex: 1, padding: '8px' }}
              />
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                style={{ flex: 1, padding: '8px' }}
              >
                <option value="">Select Team Member</option>
                <option value="Alice Johnson">Alice Johnson</option>
                <option value="Bob Singh">Bob Singh</option>
                <option value="Carla Mendes">Carla Mendes</option>
                <option value="Myself">Myself</option>
              </select>
              <input
                type="date"
                value={newTask.due}
                onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                style={{ flex: 1, padding: '8px' }}
              />
              <button
                onClick={() => {
                  if (newTask.title && newTask.assignedTo && newTask.due) {
                    const newId = tasks.length + 1;
                    tasks.push({ id: newId, ...newTask });
                    setNewTask({ title: '', assignedTo: '', due: '', status: 'Pending' });
                  }
                }}
                style={{ padding: '8px 16px', backgroundColor: '#2f3640', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Add Task
              </button>
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Task</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td style={styles.td}>{task.title}</td>
                  <td style={styles.td}>{task.assignedTo}</td>
                  <td style={styles.td}>{task.due}</td>
                  <td style={{ ...styles.td, ...styles.status(task.status) }}>{task.status}</td>
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

export default TeamLeadTasksPage;
