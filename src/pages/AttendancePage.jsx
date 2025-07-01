import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function AttendancePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [expandedYears, setExpandedYears] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});
  const [expandedDates, setExpandedDates] = useState({});

  // Filter state
  const [filterCriteria, setFilterCriteria] = useState({
    name: '',
    status: '',
    timeIn: '',
    timeOut: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = (setter, key) => setter(prev => ({ ...prev, [key]: !prev[key] }));

  // Filtering function
  const applyFilters = (records) => {
    return records.filter(record =>
      (filterCriteria.name === '' || record.name.toLowerCase().includes(filterCriteria.name.toLowerCase())) &&
      (filterCriteria.status === '' || record.status === filterCriteria.status) &&
      (filterCriteria.timeIn === '' || record.timeIn === filterCriteria.timeIn) &&
      (filterCriteria.timeOut === '' || record.timeOut === filterCriteria.timeOut)
    );
  };

  const sortRecords = (records) => {
    if (!sortConfig.key) return records;
    return [...records].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

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
    yearHeader: {
      cursor: 'pointer',
      backgroundColor: '#dcdde1',
      padding: '10px',
      marginTop: '10px',
      borderRadius: '4px',
      fontWeight: 'bold',
      userSelect: 'none',
      color: '#000',
    },
    monthHeader: {
      cursor: 'pointer',
      backgroundColor: '#f0f0f0',
      padding: '8px 15px',
      marginTop: '6px',
      borderRadius: '4px',
      fontWeight: '600',
      userSelect: 'none',
      color: '#000',
    },
    dateHeader: {
      cursor: 'pointer',
      backgroundColor: '#fafafa',
      padding: '6px 20px',
      marginTop: '4px',
      borderRadius: '4px',
      fontWeight: '500',
      userSelect: 'none',
      color: '#000',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginTop: '8px',
    },
    th: {
      backgroundColor: '#2f3640',
      color: '#fff',
      padding: '12px',
      textAlign: 'left',
      fontSize: '14px',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #eee',
      fontSize: '14px',
      color: '#000',
    },
  };

  const dummyAttendance = [
    { id: 1, name: 'Alice Johnson', date: '2025-06-24', status: 'Present', timeIn: '09:00', timeOut: '17:00' },
    { id: 2, name: 'Bob Singh', date: '2025-06-24', status: 'Late', timeIn: '10:15', timeOut: '17:00' },
    { id: 3, name: 'Carla Mendes', date: '2025-06-24', status: 'Absent', timeIn: '--', timeOut: '--' },
  ];

  // Group attendance by year -> month -> date
  const groupedAttendance = dummyAttendance.reduce((acc, record) => {
    const dateObj = new Date(record.date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = {};
    if (!acc[year][month][record.date]) acc[year][month][record.date] = [];
    acc[year][month][record.date].push(record);
    return acc;
  }, {});

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    const date = today.toISOString().split('T')[0];
    setExpandedYears({ [year]: true });
    setExpandedMonths({ [`${year}-${month}`]: true });
    setExpandedDates({ [`${year}-${month}-${date}`]: true });
  }, []);

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div style={styles.pageBody}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>Attendance</h2>
            <input
              type="text"
              placeholder="Search employee..."
              value={filterCriteria.name}
              onChange={(e) => setFilterCriteria(prev => ({ ...prev, name: e.target.value }))}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px',
                marginLeft: '10px',
                flexShrink: 0,
              }}
            />
          </div>

          {Object.entries(groupedAttendance).map(([year, months]) => (
            <div key={year}>
              <div
                style={styles.yearHeader}
                onClick={() => toggle(setExpandedYears, year)}
              >
                {year} {expandedYears[year] ? '▼' : '▶'}
              </div>
              {expandedYears[year] &&
                Object.entries(months).map(([month, dates]) => {
                  const monthKey = `${year}-${month}`;
                  return (
                    <div key={monthKey} style={{ paddingLeft: '15px' }}>
                      <div
                        style={styles.monthHeader}
                        onClick={() => toggle(setExpandedMonths, monthKey)}
                      >
                        {month} {expandedMonths[monthKey] ? '▼' : '▶'}
                      </div>
                      {expandedMonths[monthKey] &&
                        Object.entries(dates).map(([date, records]) => {
                          const dateKey = `${year}-${month}-${date}`;
                          return (
                            <div key={dateKey} style={{ paddingLeft: '20px' }}>
                              <div
                                style={styles.dateHeader}
                                onClick={() => toggle(setExpandedDates, dateKey)}
                              >
                                {date} {expandedDates[dateKey] ? '▼' : '▶'}
                              </div>
                              {expandedDates[dateKey] && (
                                <table style={styles.table}>
                                  <thead>
                                    <tr>
                                      <th style={styles.th}>
                                        Employee
                                        <button
                                          onClick={() => {
                                            setSortConfig(prev => ({
                                              key: 'name',
                                              direction: prev.key === 'name' && prev.direction === 'asc' ? 'desc' : 'asc',
                                            }));
                                          }}
                                          style={{ marginLeft: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                                        >
                                          ↕
                                        </button>
                                      </th>
                                      { !isSmallScreen && <th style={styles.th}>Date</th> }
                                      <th style={styles.th}>
                                        Status
                                        <button
                                          onClick={() => {
                                            setSortConfig(prev => ({
                                              key: 'status',
                                              direction: prev.key === 'status' && prev.direction === 'asc' ? 'desc' : 'asc',
                                            }));
                                          }}
                                          style={{ marginLeft: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                                        >
                                          ↕
                                        </button>
                                      </th>
                                      <th style={styles.th}>
                                        Time In
                                        <button
                                          onClick={() => {
                                            setSortConfig(prev => ({
                                              key: 'timeIn',
                                              direction: prev.key === 'timeIn' && prev.direction === 'asc' ? 'desc' : 'asc',
                                            }));
                                          }}
                                          style={{ marginLeft: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                                        >
                                          ↕
                                        </button>
                                      </th>
                                      { !isSmallScreen && (
                                        <th style={styles.th}>
                                          Time Out
                                          <button
                                            onClick={() => {
                                              setSortConfig(prev => ({
                                                key: 'timeOut',
                                                direction: prev.key === 'timeOut' && prev.direction === 'asc' ? 'desc' : 'asc',
                                              }));
                                            }}
                                            style={{ marginLeft: 5, background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
                                          >
                                            ↕
                                          </button>
                                        </th>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sortRecords(applyFilters(records)).map(record => (
                                      <tr key={record.id}>
                                        <td style={styles.td}>{record.name}</td>
                                        { !isSmallScreen && <td style={styles.td}>{record.date}</td> }
                                        <td style={styles.td}>{record.status}</td>
                                        <td style={styles.td}>{record.timeIn}</td>
                                        { !isSmallScreen && <td style={styles.td}>{record.timeOut}</td> }
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
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
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default AttendancePage;
