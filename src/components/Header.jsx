import React, { useState, useEffect, useRef } from 'react';

function Header({ onToggleSidebar }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const styles = {
    header: {
      height: '60px',
      backgroundColor: '#2f3640',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
    },
    left: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    avatar: {
      backgroundColor: '#dcdde1',
      color: '#2f3640',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      textAlign: 'center',
      lineHeight: '32px',
      fontWeight: 'bold',
    },
    dropdown: {
      position: 'relative',
    },
    button: {
      background: 'none',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    },
    menu: {
      position: 'absolute',
      top: '36px',
      right: '0',
      background: 'white',
      color: '#2f3640',
      borderRadius: '4px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      flexDirection: 'column',
    },
    menuItem: {
      padding: '10px 16px',
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
    },
    menuItemHover: {
      backgroundColor: '#f1f2f6',
    },
  };

  return (
    <div style={styles.header}>
      <div style={styles.left}>HRMS Portal</div>
      <div style={styles.right}>
        {!isMobile && <span>Welcome, Admin</span>}
        <div style={styles.avatar}>A</div>
        {isMobile && (
          <button style={styles.button} title="Logout">
            🔓
          </button>
        )}
        {!isMobile && (
          <button style={styles.button} onClick={onToggleSidebar} title="Menu">
            ☰
          </button>
        )}
        <div style={styles.dropdown} ref={dropdownRef}>
          <button style={styles.button} onClick={() => setMenuVisible(!isMenuVisible)}>▼</button>
          {isMenuVisible && (
            <div style={styles.menu}>
              <a
                href="#"
                style={styles.menuItem}
              >
                Profile
              </a>
              <a
                href="#"
                style={styles.menuItem}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
