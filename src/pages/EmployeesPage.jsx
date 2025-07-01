import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function EmployeesPage() {
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
      width: '100%',
      boxSizing: 'border-box',
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
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#f0f0f0',
      color: '#000',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 'bold',
      borderBottom: '1px solid #ddd',
    },
    td: {
      color: '#000',
      padding: '12px',
      borderBottom: '1px solid #eee',
    },
    actionButton: {
      padding: '6px 12px',
      marginRight: '8px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '6px',
    },
    cardDetail: {
      fontSize: '14px',
      color: '#555',
    },
  };

  const dummyEmployees = [
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'HR Manager', status: 'Active' },
    { id: 2, name: 'Bob Singh', email: 'bob@company.com', role: 'Developer', status: 'Active' },
    { id: 3, name: 'Carla Mendes', email: 'carla@company.com', role: 'Designer', status: 'Inactive' },
  ];

  // State hooks for employees, modal, and form
  const [employees, setEmployees] = useState(dummyEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', role: '', status: '',
    mobile: '', dateOfJoining: '', department: '',
    probation: '', agreement: false, workType: '',
    shiftPolicy: '', leaves: [],
  });

  // New state for filters
  const [filters, setFilters] = useState({ name: '', role: '', status: '' });

  // Computed filtered employees list
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.role ? emp.role.toLowerCase().includes(filters.role.toLowerCase()) : true) &&
    (filters.status ? emp.status.toLowerCase() === filters.status.toLowerCase() : true)
  );

  // Handlers for add, edit, delete, and form submit
  const handleAddClick = () => {
    setSelectedEmployee(null);
    setFormData({
      name: '', email: '', role: '', status: '',
      mobile: '', dateOfJoining: '', department: '',
      probation: '', agreement: false, workType: '',
      shiftPolicy: '', leaves: [],
    });
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    // Ensure leaves is always an array
    setFormData({
      ...employee,
      leaves: Array.isArray(employee.leaves)
        ? employee.leaves
        : (typeof employee.leaves === 'string' && employee.leaves
            ? employee.leaves.split(',').map(l => l.trim())
            : []),
    });
    setShowForm(true);
  };
  // Handler for leaves checkbox group
  const leaveTypes = [
    "Sick Leave", "Casual Leave", "Earned Leave"
    // Add more leave types as needed
  ];
  const handleLeaveChange = (leaveType) => {
    const updated = formData.leaves.includes(leaveType)
      ? formData.leaves.filter(l => l !== leaveType)
      : [...formData.leaves, leaveType];
    setFormData({ ...formData, leaves: updated });
  };

  const handleDeleteClick = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleFormSubmit = () => {
    if (selectedEmployee) {
      setEmployees(prev =>
        prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp)
      );
    } else {
      const newEmployee = { id: Date.now(), ...formData };
      setEmployees(prev => [...prev, newEmployee]);
    }
    setShowForm(false);
  };

  return (
    <div style={styles.layout}>
      <style>
        {`
          @media (max-width: 768px) {
            .hide-sm { display: none; }
          }
          @media (max-width: 1024px) {
            .hide-md { display: none; }
          }
        `}
      </style>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>Employees</h2>
            <button style={styles.button} onClick={handleAddClick}>+ Add Employee</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <input
              placeholder="Search by name"
              value={filters.name}
              onChange={e => setFilters({ ...filters, name: e.target.value })}
              style={{ padding: 8, flex: '1 1 200px', minWidth: '150px' }}
            />
            <input
              placeholder="Search by role"
              value={filters.role}
              onChange={e => setFilters({ ...filters, role: e.target.value })}
              style={{ padding: 8, flex: '1 1 200px', minWidth: '150px' }}
            />
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
              style={{ padding: 8, flex: '1 1 200px', minWidth: '150px' }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th className="hide-md" style={styles.th}>Email</th>
                  <th className="hide-sm" style={styles.th}>Role</th>
                  <th className="hide-sm" style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <td style={styles.td}>{emp.name}</td>
                    <td className="hide-md" style={styles.td}>{emp.email}</td>
                    <td className="hide-sm" style={styles.td}>{emp.role}</td>
                    <td className="hide-sm" style={styles.td}>{emp.status}</td>
                    <td style={styles.td}>
                      <button
                        style={{ ...styles.actionButton, backgroundColor: '#2f3640', color: '#fff' }}
                        onClick={() => handleEditClick(emp)}
                      >
                        🖉
                      </button>
                      <button
                        style={{ ...styles.actionButton, backgroundColor: '#e74c3c', color: '#fff' }}
                        onClick={() => handleDeleteClick(emp.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      {/* Modal Form for Add/Edit */}
      {showForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 999,
        }}>
          <div style={{
            animation: 'fadeInScale 0.3s ease-out',
            backgroundColor: '#fff',
            color: '#000',
            padding: '30px 40px',
            borderRadius: 8,
            minWidth: 300,
            width: '90%',
            maxWidth: 500,
            boxSizing: 'border-box',
          }}>
            <h3 style={{ marginBottom: 20, fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            />
            <input
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            />
            <input
              type="date"
              placeholder="Date of Joining"
              value={formData.dateOfJoining}
              onChange={e => setFormData({ ...formData, dateOfJoining: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            />
            <select
              value={formData.department}
              onChange={e => setFormData({ ...formData, department: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
            </select>
            <select
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            >
              <option value="">Select Role</option>
              <option value="HR">HR</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="date"
              placeholder="Probation End Date"
              value={formData.probation}
              onChange={e => setFormData({ ...formData, probation: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            />
            <label style={{ display: 'block', marginBottom: 16, color: '#000' }}>
              <input
                type="checkbox"
                checked={formData.agreement}
                onChange={e => setFormData({ ...formData, agreement: e.target.checked })}
              />
              {' '}Agreement Signed
            </label>
            <div style={{ marginBottom: 16, color: '#000' }}>
              Work Type:
              <label style={{ marginRight: 10, color: '#000' }}>
                <input type="radio" name="workType" value="WFH"
                  checked={formData.workType === 'WFH'}
                  onChange={e => setFormData({ ...formData, workType: e.target.value })} /> WFH
              </label>
              <label style={{ marginRight: 10, color: '#000' }}>
                <input type="radio" name="workType" value="Full Time"
                  checked={formData.workType === 'Full Time'}
                  onChange={e => setFormData({ ...formData, workType: e.target.value })} /> Full Time
              </label>
              <label style={{ color: '#000' }}>
                <input type="radio" name="workType" value="Part Time"
                  checked={formData.workType === 'Part Time'}
                  onChange={e => setFormData({ ...formData, workType: e.target.value })} /> Part Time
              </label>
            </div>
            <select
              value={formData.shiftPolicy}
              onChange={e => setFormData({ ...formData, shiftPolicy: e.target.value })}
              style={{ marginBottom: 16, padding: 10, width: '100%', color: '#000', backgroundColor: '#fff' }}
            >
              <option value="">Select Shift Policy</option>
              <option value="Regular Shift">Regular Shift</option>
              <option value="Afternoon Shift">Afternoon Shift</option>
              <option value="Afternoon1 Shift">Afternoon1 Shift</option>
              <option value="Flexible Shift">Flexible Shift</option>
            </select>
            <div style={{ marginBottom: 16, color: '#000' }}>
              <div style={{ color: '#000' }}>Types of Leaves:</div>
              {leaveTypes.map((leave) => (
                <label key={leave} style={{ marginRight: 10, color: '#000' }}>
                  <input
                    type="checkbox"
                    checked={formData.leaves.includes(leave)}
                    onChange={() => handleLeaveChange(leave)}
                  />{' '}{leave}
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button onClick={() => setShowForm(false)} style={{ marginRight: 10 }}>Cancel</button>
              <button onClick={handleFormSubmit} style={{ backgroundColor: '#2f3640', color: '#fff', padding: '6px 12px', borderRadius: '4px' }}>
                {selectedEmployee ? 'Update' : 'Add'}
              </button>
            </div>
            <style>
              {`
                @keyframes fadeInScale {
                  0% {
                    opacity: 0;
                    transform: scale(0.95);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}
            </style>
          </div>
        </div>
      )}
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

export default EmployeesPage;
