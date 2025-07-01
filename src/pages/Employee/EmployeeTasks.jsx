import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeTasksPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { title: 'Submit Timesheet', dueDate: '2025-06-25', status: 'Pending', priority: 'High', description: 'Weekly submission', createdAt: new Date().toISOString(), subtasks: [] },
    { title: 'Project Update to Manager', dueDate: '2025-06-26', status: 'In Progress', priority: 'Medium', description: 'Update on project milestones', createdAt: new Date().toISOString(), subtasks: [] },
    { title: 'Complete Training Module', dueDate: '2025-06-28', status: 'Completed', priority: 'Low', description: 'Finish compliance training', createdAt: new Date().toISOString(), subtasks: [] },
  ]);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', status: 'Pending', priority: 'Medium', description: '' });
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  // Remove notification dropdown state

  // Track dismissed reminders for tasks by title
  const [reminderDismissed, setReminderDismissed] = useState({});

  // Responsive: track if mobile screen
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    layout: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#f0f2f5',
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
      maxHeight: '100vh',
      padding: '32px 24px',
      maxWidth: '1150px',
      margin: '0 auto',
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: 800,
      marginBottom: '0px',
      color: '#222d3b',
      letterSpacing: '-1px',
    },
    sectionHeader: {
      fontSize: '1.12rem',
      fontWeight: 700,
      color: '#636e72',
      marginBottom: '13px',
      marginTop: '32px',
      letterSpacing: '0.5px',
    },
    filterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 16px',
      marginBottom: '30px',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    filterLabel: {
      fontWeight: 500,
      color: '#636e72',
      fontSize: '15px',
      marginRight: '4px',
    },
    filterSelect: {
      padding: '10px 20px 10px 12px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #dfe6e9',
      backgroundColor: '#fff',
      minWidth: '150px',
      cursor: 'pointer',
      color: '#222d3b',
      fontWeight: 500,
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    taskListSection: {
      background: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 24px rgba(34,45,59,0.08)',
      padding: '30px 0 0 0',
      marginBottom: '35px',
      border: '1px solid #f1f2f6',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      backgroundColor: 'transparent',
    },
    th: {
      backgroundColor: '#222d3b',
      color: 'white',
      padding: '18px 14px',
      textAlign: 'left',
      fontSize: '16px',
      fontWeight: 700,
      borderTop: 'none',
      borderBottom: '1px solid #e5e8ed',
      letterSpacing: '0.2px',
    },
    td: {
      padding: '18px 14px',
      borderBottom: '1px solid #f1f2f6',
      fontSize: '15px',
      color: '#222d3b',
      verticalAlign: 'top',
      background: 'transparent',
    },
    button: {
      padding: '9px 18px',
      backgroundColor: '#44bd32',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'background 0.18s, box-shadow 0.18s',
      boxShadow: '0 2px 8px rgba(68,189,50,0.09)',
      outline: 'none',
    },
    buttonPrimary: {
      backgroundColor: '#0984e3',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 700,
      transition: 'background 0.18s, box-shadow 0.18s',
      boxShadow: '0 4px 12px rgba(9,132,227,0.12)',
    },
    buttonDisabled: {
      backgroundColor: '#b2bec3',
      cursor: 'not-allowed',
      color: '#fff',
      opacity: 0.7,
    },
    statusIndicator: {
      display: 'inline-block',
      padding: '5px 15px',
      borderRadius: '13px',
      fontWeight: '600',
      fontSize: '14px',
      color: 'white',
      minWidth: '90px',
      textAlign: 'center',
    },
    priorityIndicator: {
      fontWeight: '700',
      fontSize: '15px',
    },
    subtaskList: {
      margin: 0,
      paddingLeft: '30px',
      listStyleType: 'disc',
      marginTop: '10px',
      marginBottom: '10px',
    },
    subtaskItem: {
      marginBottom: '7px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#636e72',
    },
    addSubtaskBtn: {
      padding: '7px 14px',
      fontSize: '14px',
      borderRadius: '8px',
      backgroundColor: '#f1f2f6',
      border: '1px solid #dfe6e9',
      color: '#222d3b',
      cursor: 'pointer',
      fontWeight: 600,
      marginTop: '6px',
      transition: 'background 0.18s',
    },
    progressBarTrack: {
      marginTop: '16px',
      height: '10px',
      backgroundColor: '#dcdde1',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#74b9ff',
      transition: 'width 0.3s ease',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.42)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    modal: {
      backgroundColor: '#fff',
      padding: '38px 36px 30px 36px',
      borderRadius: '16px',
      width: '98%',
      maxWidth: '450px',
      boxShadow: '0 10px 40px rgba(34,45,59,0.16), 0 2px 8px rgba(34,45,59,0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0px',
      border: '1px solid #f1f2f6',
    },
    modalTitle: {
      marginBottom: '22px',
      color: '#222d3b',
      fontWeight: 800,
      fontSize: '1.35rem',
      letterSpacing: '-0.5px',
    },
    modalInput: {
      width: '100%',
      marginBottom: '14px',
      padding: '13px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #dfe6e9',
      background: '#f8fafd',
      color: '#222d3b',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    modalTextarea: {
      width: '100%',
      marginBottom: '14px',
      padding: '13px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #dfe6e9',
      background: '#f8fafd',
      color: '#222d3b',
      minHeight: '80px',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    modalSelect: {
      width: '100%',
      marginBottom: '14px',
      padding: '13px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #dfe6e9',
      background: '#f8fafd',
      color: '#222d3b',
      fontWeight: 500,
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
      gap: '10px',
    },
    modalCancelBtn: {
      padding: '10px 22px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #dfe6e9',
      backgroundColor: '#fff',
      color: '#636e72',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'background 0.18s',
    },
    modalAddBtn: {
      padding: '10px 22px',
      backgroundColor: '#0984e3',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: 700,
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(9,132,227,0.10)',
      transition: 'background 0.18s',
    },
  };

  const statusColors = {
    Pending: '#f39c12',
    'In Progress': '#0984e3',
    Completed: '#44bd32',
  };

  const priorityColors = {
    High: '#e74c3c',
    Medium: '#f39c12',
    Low: '#27ae60',
  };

  const handleMarkComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 'Completed';
    setTasks(updatedTasks);
    toast.success(`Task "${tasks[index].title}" marked as completed!`);
  };

  const handleCreateTask = () => {
    if (newTask.title.trim() === '' || newTask.dueDate.trim() === '') return;
    setTasks(prev => [...prev, { ...newTask, createdAt: new Date().toISOString(), subtasks: [] }]);
    setNewTask({ title: '', dueDate: '', status: 'Pending', priority: 'Medium', description: '' });
    setModalOpen(false);
    toast.success(`🎉 Task "${newTask.title}" created successfully!`);
  };

  const handleStatusChange = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
    toast.info(`Status changed to "${status}" for "${updatedTasks[index].title}"`);
  };

  // Remove notification dropdown effect

  // Real-time reminder for upcoming due dates (within 3 minutes)
  useEffect(() => {
    const now = new Date();
    const reminders = tasks.filter(task => {
      const due = new Date(task.dueDate);
      const timeDiff = due.getTime() - now.getTime();
      return timeDiff > 0 && timeDiff < 3 * 60 * 1000; // within 3 minutes
    });

    reminders.forEach(task => {
      if (!reminderDismissed[task.title]) {
        toast.warn(`⏰ Reminder: Task "${task.title}" is due soon!`, {
          onClose: () => setReminderDismissed(prev => ({ ...prev, [task.title]: true }))
        });
        setReminderDismissed(prev => ({ ...prev, [task.title]: true }));
      }
    });
  // eslint-disable-next-line
  }, [tasks]);

  return (
    <div className="flex flex-col h-screen">
      <div style={styles.layout} className="flex-1 flex flex-col">
        <div style={styles.mainContent} className="flex-1 flex flex-col">
          <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
          <div className="h-[calc(100vh-60px)] overflow-y-auto px-4 pb-20">
            <div style={styles.pageBody}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <h2 style={styles.title}>
                    My Tasks
                    <span style={{
                      backgroundColor: '#e17055',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      marginLeft: '12px',
                      borderRadius: '12px',
                      verticalAlign: 'middle'
                    }}>
                      {tasks.filter(task => task.status !== 'Completed').length} Pending
                    </span>
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => setModalOpen(true)}
                    style={{ ...styles.button, ...styles.buttonPrimary, padding: '13px 30px', fontSize: '16px', fontWeight: 700 }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#54a0ff'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0984e3'}
                  >
                    + Create Task
                  </button>
                </div>
              </div>
              <div style={styles.sectionHeader}>Filter Tasks</div>
              <div style={styles.filterContainer}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={styles.filterLabel}>Status:</span>
                  <select
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    style={styles.filterSelect}
                  >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={styles.filterLabel}>Priority:</span>
                  <select
                    value={filter.priority}
                    onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                    style={styles.filterSelect}
                  >
                    <option value="">All Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div style={styles.sectionHeader}>Task List</div>
              <div style={styles.taskListSection}>
                <table style={styles.table}>
                  {!isMobile && (
                    <thead>
                      <tr>
                        <th style={styles.th}>Task</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Due Date</th>
                        <th style={styles.th}>Priority</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Created</th>
                        <th style={styles.th}>Action</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {tasks.filter(task =>
                      (!filter.status || task.status === filter.status) &&
                      (!filter.priority || task.priority === filter.priority)
                    ).map((task, index) => (
                      isMobile ? (
                        <tr key={index}>
                          <td style={styles.td} colSpan="7">
                            <details style={{ background: '#fff', borderRadius: '10px', marginBottom: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                              <summary style={{ padding: '16px', fontWeight: 700, cursor: 'pointer' }}>
                                {task.title}
                              </summary>
                              <div style={{ padding: '12px 16px', borderTop: '1px solid #eee' }}>
                                <p><strong>Description:</strong> {task.description}</p>
                                <p><strong>Due Date:</strong> {task.dueDate}</p>
                                <p><strong>Priority:</strong> <span style={{ color: priorityColors[task.priority] }}>{task.priority}</span></p>
                                <p><strong>Status:</strong>
                                  <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                    style={{
                                      padding: '6px 12px',
                                      borderRadius: '6px',
                                      marginLeft: '8px',
                                      fontWeight: '600',
                                      background: '#f8fafd',
                                      color: statusColors[task.status],
                                      border: '1px solid #ccc',
                                      fontSize: '14px'
                                    }}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                </p>
                                <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                                <div style={{ marginTop: '12px' }}>
                                  {task.status !== 'Completed' ? (
                                    <button
                                      style={styles.button}
                                      onClick={() => handleMarkComplete(index)}
                                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#00b894'}
                                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#44bd32'}
                                    >
                                      Mark as Complete
                                    </button>
                                  ) : (
                                    <button style={{ ...styles.button, ...styles.buttonDisabled }} disabled>
                                      Completed
                                    </button>
                                  )}
                                </div>
                              </div>
                            </details>
                          </td>
                        </tr>
                      ) : (
                        <React.Fragment key={index}>
                          <tr>
                            <td style={styles.td}>{task.title}</td>
                            <td style={styles.td}>{task.description}</td>
                            <td style={styles.td}>{task.dueDate}</td>
                            <td style={styles.td}>
                              <span style={{ ...styles.priorityIndicator, color: priorityColors[task.priority] || '#000' }}>
                                {task.priority}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                style={{
                                  padding: '10px 14px',
                                  fontSize: '15px',
                                  borderRadius: '8px',
                                  border: '1px solid #dfe6e9',
                                  minWidth: '130px',
                                  color: statusColors[task.status] || '#000',
                                  fontWeight: 700,
                                  background: '#f8fafd',
                                  outline: 'none',
                                }}
                              >
                                <option value="Pending" style={{ color: statusColors.Pending }}>Pending</option>
                                <option value="In Progress" style={{ color: statusColors['In Progress'] }}>In Progress</option>
                                <option value="Completed" style={{ color: statusColors.Completed }}>Completed</option>
                              </select>
                            </td>
                            <td style={styles.td}>{new Date(task.createdAt).toLocaleDateString()}</td>
                            <td style={styles.td}>
                              {task.status !== 'Completed' && (
                                <button
                                  style={styles.button}
                                  onClick={() => handleMarkComplete(index)}
                                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#00b894'}
                                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#44bd32'}
                                >
                                  Mark as Complete
                                </button>
                              )}
                              {task.status === 'Completed' && (
                                <button style={{ ...styles.button, ...styles.buttonDisabled }} disabled>
                                  Completed
                                </button>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="7" style={{ backgroundColor: '#f7f8fa', borderBottom: 'none', padding: 0 }}>
                              <div style={{ padding: '18px 32px 10px 32px', borderLeft: '3px solid #dfe6e9', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                <span style={{ fontWeight: 700, color: '#636e72', fontSize: '15px' }}>Subtasks:</span>
                                <ul style={styles.subtaskList}>
                                  {task.subtasks?.map((sub, i) => (
                                    <li key={i} style={styles.subtaskItem}>
                                      <input
                                        type="checkbox"
                                        checked={sub.done}
                                        onChange={() => {
                                          const updated = [...tasks];
                                          updated[index].subtasks[i].done = !updated[index].subtasks[i].done;
                                          setTasks(updated);
                                        }}
                                        style={{
                                          marginRight: '10px',
                                          accentColor: '#74b9ff',
                                          width: '17px',
                                          height: '17px',
                                          borderRadius: '4px',
                                        }}
                                      />
                                      <span style={{
                                        textDecoration: sub.done ? 'line-through' : 'none',
                                        color: sub.done ? '#b2bec3' : '#636e72'
                                      }}>
                                        {sub.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  onClick={() => {
                                    const subtaskText = prompt('Enter subtask:');
                                    if (subtaskText) {
                                      const updated = [...tasks];
                                      updated[index].subtasks = [...(updated[index].subtasks || []), { text: subtaskText, done: false }];
                                      setTasks(updated);
                                      toast.success('Subtask created successfully!');
                                    }
                                  }}
                                  style={styles.addSubtaskBtn}
                                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dfe6e9'}
                                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f1f2f6'}
                                >
                                  + Add Subtask
                                </button>
                                <div style={styles.progressBarTrack}>
                                  <div
                                    style={{
                                      ...styles.progressBar,
                                      width: `${(task.subtasks?.filter(s => s.done).length || 0) / (task.subtasks?.length || 1) * 100}%`
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
              {isModalOpen && (
                <div style={styles.modalOverlay}>
                  <div style={styles.modal}>
                    <h3 style={styles.modalTitle}>Create Task</h3>
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      style={styles.modalInput}
                    />
                    <textarea
                      placeholder="Description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      style={styles.modalTextarea}
                    />
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      style={styles.modalInput}
                    />
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      style={styles.modalSelect}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      style={{ ...styles.modalSelect, marginBottom: '22px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <div style={styles.modalActions}>
                      <button
                        onClick={() => setModalOpen(false)}
                        style={styles.modalCancelBtn}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f2f6'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                      >Cancel</button>
                      <button
                        onClick={handleCreateTask}
                        style={styles.modalAddBtn}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#54a0ff'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0984e3'}
                      >Add Task</button>
                    </div>
                  </div>
                </div>
              )}
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
        role="EMPLOYEE"
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default EmployeeTasksPage;
