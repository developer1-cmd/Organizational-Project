import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function PayrollPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [editPayroll, setEditPayroll] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const dummyPayrolls = [
    {
      id: 1,
      name: 'Alice Johnson',
      month: 'June 2025',
      base: 50000,
      bonus: 5000,
      deductions: 2000,
      net: 53000,
    },
    {
      id: 2,
      name: 'Bob Singh',
      month: 'June 2025',
      base: 60000,
      bonus: 3000,
      deductions: 2500,
      net: 60500,
    },
  ];

  const checkPassword = () => {
    if (password === 'admin123') {
      setHasAccess(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!hasAccess) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          <h2 style={{ marginBottom: '20px', color: '#2f3640' }}>Enter Password to Access Payroll</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={checkPassword}
            style={{ padding: '10px 20px', backgroundColor: '#2f3640', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>Payroll</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <button
              onClick={() => {
                setEditPayroll({
                  id: Date.now(),
                  name: '',
                  month: '',
                  base: 0,
                  bonus: 0,
                  deductions: 0,
                  net: 0
                });
                setSelectedPayroll({ name: 'New Employee' });
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#27ae60',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Create Payroll
            </button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee</th>
                {!isMobile && (
                  <>
                    <th style={styles.th}>Month</th>
                    <th style={styles.th}>Base Salary</th>
                    <th style={styles.th}>Bonus</th>
                    <th style={styles.th}>Deductions</th>
                  </>
                )}
                <th style={styles.th}>Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {dummyPayrolls.map((pay) => (
                <tr key={pay.id}>
                  <td
                    style={{ ...styles.td, cursor: 'pointer', color: '#0984e3' }}
                    onClick={() => {
                      setSelectedPayroll(pay);
                      setEditPayroll({ ...pay });
                    }}
                  >
                    {pay.name}
                  </td>
                  {!isMobile && (
                    <>
                      <td style={styles.td}>{pay.month}</td>
                      <td style={styles.td}>₹{pay.base}</td>
                      <td style={styles.td}>₹{pay.bonus}</td>
                      <td style={styles.td}>₹{pay.deductions}</td>
                    </>
                  )}
                  <td style={styles.td}>₹{pay.net}</td>
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
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />

      {selectedPayroll && (
        <div
          style={{
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
          }}
          onClick={() => setSelectedPayroll(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              color: '#2f3640',
              padding: '30px',
              borderRadius: '10px',
              minWidth: '300px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: '15px', color: '#2f3640' }}>
              Payroll for {editPayroll.name || selectedPayroll.name}
            </h3>
            {selectedPayroll.name === 'New Employee' && (
              <>
                <label style={{ display: 'block', marginBottom: '5px', color: '#2f3640' }}>Employee Name</label>
                <input
                  type="text"
                  value={editPayroll?.name || ''}
                  onChange={(e) => setEditPayroll({ ...editPayroll, name: e.target.value })}
                  placeholder="Employee Name"
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </>
            )}
            <>
              <label style={{ display: 'block', marginBottom: '5px', color: '#2f3640' }}>Month</label>
              <input
                type="text"
                value={editPayroll?.month || ''}
                onChange={(e) => setEditPayroll({ ...editPayroll, month: e.target.value })}
                style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </>
            <>
              <label style={{ display: 'block', marginBottom: '5px', color: '#2f3640' }}>Base Salary</label>
              <input
                type="number"
                value={editPayroll?.base || ''}
                onChange={(e) => setEditPayroll({ ...editPayroll, base: Number(e.target.value) })}
                style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </>
            <>
              <label style={{ display: 'block', marginBottom: '5px', color: '#2f3640' }}>Bonus</label>
              <input
                type="number"
                value={editPayroll?.bonus || ''}
                onChange={(e) => setEditPayroll({ ...editPayroll, bonus: Number(e.target.value) })}
                style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </>
            <>
              <label style={{ display: 'block', marginBottom: '5px', color: '#2f3640' }}>Deductions</label>
              <input
                type="number"
                value={editPayroll?.deductions || ''}
                onChange={(e) => setEditPayroll({ ...editPayroll, deductions: Number(e.target.value) })}
                style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </>
            <p style={{ color: '#2f3640' }}>
              <strong>Net Pay:</strong> ₹{(editPayroll.base + editPayroll.bonus - editPayroll.deductions)}
            </p>
            <button
              onClick={() => {
                const updated = dummyPayrolls.map(p =>
                  p.id === editPayroll.id ? { ...editPayroll, net: editPayroll.base + editPayroll.bonus - editPayroll.deductions } : p
                );
                // For now, just close the modal and log the updated state
                console.log('Updated Payroll:', updated);
                setSelectedPayroll(null);
              }}
              style={{
                marginTop: '20px',
                padding: '10px 15px',
                backgroundColor: '#2f3640',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Save Payroll
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayrollPage;
