import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function EmployeeAnnouncementsPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Removed unused searchQuery, filterType, and pinned state
  const [viewEmployees, setViewEmployees] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('Alice Johnson');
  // Track which message index is being reacted to

  const [showEmployeeDrawer, setShowEmployeeDrawer] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState('');
  // Drawer drag state
  const [isDragging, setIsDragging] = useState(false);
  // Drawer position state
  const [drawerPosition] = useState({ x: 100, y: 100 });

  // State for draggable mobile employee toggle button
  const [buttonPosition, setButtonPosition] = useState({ x: 20, y: 500 });

  const [chatData, setChatData] = useState(() => {
    const saved = localStorage.getItem('employeeChatData');
    return saved ? JSON.parse(saved) : {
      'Alice Johnson': [
        { sender: 'Alice', text: 'Hey, have you checked the new HR policy?' },
        { sender: 'You', text: 'Yes, just went through it.' },
        { sender: 'Alice', text: 'Cool! 👌' }
      ],
      'Bob Smith': [],
      'Carol Williams': []
    };
  });

  const [inputMessage, setInputMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    localStorage.setItem('employeeChatData', JSON.stringify(chatData));
  }, [chatData]);

  const currentMessages = chatData[selectedEmployee] || [];

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !image) return;
    const timestamp = new Date().toLocaleString();
    const newMessage = { sender: 'You', timestamp };
    if (inputMessage.trim()) newMessage.text = inputMessage.trim();
    if (image) newMessage.imageUrl = URL.createObjectURL(image);

    setChatData(prev => ({
      ...prev,
      [selectedEmployee]: [...(prev[selectedEmployee] || []), newMessage]
    }));
    setInputMessage('');
    setImage(null);
  };

  const announcements = [
    {
      title: 'HR Policy Updated',
      message: 'The HR policy has been revised as of June 15th. Please review it on the portal.',
      date: '2025-06-15',
      type: 'Info',
    },
    {
      title: 'Team Outing',
      message: 'Join us for a team outing at WonderLa on July 15th! RSVP by July 1st.',
      date: '2025-06-20',
      type: 'Event',
    },
    {
      title: 'System Downtime',
      message: 'Server maintenance is scheduled for June 30th, 2 AM to 4 AM.',
      date: '2025-06-23',
      type: 'Alert',
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
      // overflow: 'hidden', // Removed if not required
    },
    pageBody: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
    },
    // titleWrapper: { // Removed if not used
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   marginBottom: '20px',
    // },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#2f3640',
      marginBottom: '30px',
      borderBottom: '2px solid #dcdde1',
      paddingBottom: '10px',
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px',
      transition: 'transform 0.2s ease-in-out',
    },
    badge: {
      padding: '4px 12px',
      fontSize: '13px',
      borderRadius: '20px',
      color: 'white',
      fontWeight: '500',
      backgroundColor: '#40739e',
      display: 'inline-block',
      marginLeft: '12px',
    },
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'Alert': return '#e84118';
      case 'Event': return '#fbc531';
      case 'Info': default: return '#40739e';
    }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.mainContent}>
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div
          style={styles.pageBody}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
              <span style={{ color: '#2f3640' }}>{viewEmployees ? 'View Announcements' : 'Employee Chat'}</span>
              <div
                onClick={() => setViewEmployees(prev => !prev)}
                style={{
                  width: '50px',
                  height: '28px',
                  backgroundColor: viewEmployees ? '#27ae60' : '#7f8c8d',
                  borderRadius: '50px',
                  position: 'relative',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: viewEmployees ? '26px' : '3px',
                    transition: 'left 0.3s ease',
                  }}
                />
              </div>
            </label>
          </div>
          <div
            style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
          >
            {viewEmployees ? (
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ display: 'none' }} className="employee-list-desktop">
                  <div style={{ width: '250px', borderRight: '1px solid #ccc', paddingRight: '16px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#2f3640' }}>Employees</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((emp, i) => (
                        <li
                          key={i}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            marginBottom: '8px',
                            backgroundColor: emp === selectedEmployee ? '#dcdde1' : 'transparent',
                            fontSize: '14px',
                            color: '#2f3640',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={emp}
                          onClick={() => setSelectedEmployee(emp)}
                        >
                          {emp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '400px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#2f3640' }}>
                    Chat with {selectedEmployee}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    style={{ marginBottom: '8px' }}
                  />
                  <div style={{ flex: 1, overflowY: 'auto', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '12px', backgroundColor: '#f5f6fa' }}>
                    {currentMessages.map((msg, idx) => (
                      <div key={idx} style={{ marginBottom: '8px', color: '#2f3640', textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
                        <div>
                          <strong>{msg.sender}:</strong> {msg.text || ''}
                          {msg.imageUrl && (
                            <div style={{ marginTop: '6px' }}>
                              <img src={msg.imageUrl} alt="sent" style={{ maxWidth: '150px', borderRadius: '6px' }} />
                            </div>
                          )}
                          {msg.timestamp && (
                            <div style={{ fontSize: '11px', color: '#7f8c8d', marginTop: '4px' }}>
                              {msg.timestamp}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                    <button onClick={handleSendMessage} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#44bd32', color: '#fff', border: 'none' }}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 style={styles.title}>📢 Company Announcements</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {announcements
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.card,
                          borderLeft: `6px solid ${getBadgeColor(item.type)}`,
                          cursor: 'pointer',
                          padding: '16px 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          transition: 'box-shadow 0.2s ease-in-out',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)')}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)')}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ fontSize: '18px', fontWeight: '600', color: '#2f3640' }}>{item.title}</div>
                          </div>
                          <span style={{ ...styles.badge, backgroundColor: getBadgeColor(item.type) }}>
                            {item.type}
                          </span>
                        </div>
                        <div style={{ color: '#353b48', lineHeight: '1.6' }}>{item.message}</div>
                        <div style={{ fontSize: '13px', color: '#718093' }}>
                          Posted on: {item.date}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
          {viewEmployees && (
            <div
              className="mobile-employee-toggle"
              style={{
                position: 'fixed',
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`,
                backgroundColor: '#44bd32',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '24px',
                zIndex: 999,
                cursor: 'pointer',
                touchAction: 'none'
              }}
              onMouseDown={() => {
                // The event parameter 'e' was removed to resolve the ESLint warning.
                // If drag functionality is still needed, re-add the parameter and logic.
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const offsetX = touch.clientX - buttonPosition.x;
                const offsetY = touch.clientY - buttonPosition.y;
                const onMove = (moveEvent) => {
                  const touchMove = moveEvent.touches[0];
                  setButtonPosition({ x: touchMove.clientX - offsetX, y: touchMove.clientY - offsetY });
                };
                const onEnd = () => {
                  window.removeEventListener('touchmove', onMove);
                  window.removeEventListener('touchend', onEnd);
                };
                window.addEventListener('touchmove', onMove);
                window.addEventListener('touchend', onEnd);
              }}
              onClick={() => {
                setShowEmployeeDrawer(true);
              }}
            >
              👥
            </div>
          )}
          {viewEmployees && showEmployeeDrawer && (
            <div
              style={{
                position: 'absolute',
                left: `${drawerPosition.x}px`,
                top: `${drawerPosition.y}px`,
                width: '90vw',
                maxWidth: '400px',
                height: '70%',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                zIndex: 1000,
                overflowY: 'auto',
                cursor: isDragging ? 'grabbing' : 'default',
                minWidth: '260px',
                minHeight: '260px',
              }}
            >
              {/* Draggable top bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  cursor: 'grab',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                  background: '#f5f6fa',
                  borderBottom: '1px solid #eee',
                  userSelect: 'none',
                }}
                onMouseDown={() => {
                  setIsDragging(true);
                  // setDragOffset removed
                }}
              >
                <strong style={{ fontSize: '16px', color: '#2f3640' }}>Select Employee</strong>
                <button
                  onClick={() => setShowEmployeeDrawer(false)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#2f3640' }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchEmployee}
                  onChange={(e) => setSearchEmployee(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc'
                  }}
                />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Alice Johnson', 'Bob Smith', 'Carol Williams']
                    .filter(name => name.toLowerCase().includes(searchEmployee.toLowerCase()))
                    .map((emp, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setShowEmployeeDrawer(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderBottom: '1px solid #eee',
                          color: '#2f3640',
                          cursor: 'pointer'
                        }}
                      >
                        {emp}
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <style>{`
            @media (min-width: 768px) {
              .mobile-employee-toggle {
                display: none !important;
              }
              .employee-list-desktop {
                display: block !important;
              }
            }

            @media (max-width: 767px) {
              .mobile-employee-toggle {
                display: flex !important;
              }
              .employee-list-desktop {
                display: none !important;
              }
            }
          `}</style>
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

export default EmployeeAnnouncementsPage;
