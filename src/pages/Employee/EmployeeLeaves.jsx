import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function EmployeeLeavesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    from: '',
    to: '',
    reason: '',
    leaveType: '',
    halfDayType: '',
    partialDayType: '',
    partialDayTime: '',
    teamLeadId: '',
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const [isHalfDayToggle, setHalfDayToggle] = useState(false);
  const [availableLeaves, setAvailableLeaves] = useState([]);
  const [validCompOffDates, setValidCompOffDates] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  // Expanded row index for leave details panel
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  useEffect(() => {
    // Simulate fetching from backend
    setTeamLeads([
      { id: 'lead1', name: 'Alice Johnson' },
      { id: 'lead2', name: 'Bob Smith' },
    ]);
  }, []);

  const getHalfYearPeriod = (date = new Date()) => {
    const month = date.getMonth() + 1;
    return month <= 6 ? 'H1' : 'H2';
  };

  const getQuarter = (date = new Date()) => {
    const month = date.getMonth() + 1;
    if (month <= 3) return 'Q1';
    if (month <= 6) return 'Q2';
    if (month <= 9) return 'Q3';
    return 'Q4';
  };

  const [leaveQuotas] = useState({
    "Casual Leave": { quota: 5 }, // per half-year
    "Half Day Leaves": { quota: 10 }, // per half-year
    "Extraordinary Leave": { quota: 3 },
    "Unpaid Leaves": { quota: 'Unlimited' },
    "Paternity Leave": { quota: 15 },
    "Maternity Leave": { quota: 180 },
    "Child Adoption Leave": { quota: 135 },
    "Marriage Leave": { quota: 5 },
    "Compensatory Leaves": { quota: 3 }, // per week
    "Work From Home": { quota: 3 }, // per quarter
    "Floater Leaves": { quota: 'N/A' },
    "Partial Day Leave": { quota: 10 }
  });

  // Simulate already used leave quotas for the session broken down by period (would come from DB in real app)
  const [usedQuotasBreakdown] = useState({
    "Casual Leave": {
      H1: 2,
      H2: 1,
    },
    "Half Day Leaves": {
      H1: 5,
      H2: 2,
    },
    "Extraordinary Leave": 1,
    "Work From Home": {
      Q1: 1,
      Q2: 0,
      Q3: 0,
      Q4: 0,
    },
    "Compensatory Leaves": {
      // week string keys like '2025-W25'
      '2025-W25': 1,
      '2025-W26': 0,
    },
    "Unpaid Leaves": 0,
    "Marriage Leave": 0,
    "Child Adoption Leave": 0,
    "Maternity Leave": 0,
    "Paternity Leave": 0
  });

  // Helper to get ISO week string (e.g. '2025-W25') for a date
  const getWeekString = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0,0,0,0);
    // Thursday in current week decides the year.
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    const weekNumber = 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    return `${tempDate.getFullYear()}-W${weekNumber}`;
  };

  const fetchValidCompOffDates = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const simulatedWorkOnHolidayDates = ['2025-06-16', '2025-06-22']; // Example past Sunday/public holiday worked
    const eligibleDates = simulatedWorkOnHolidayDates.filter(dateStr => {
      const date = new Date(dateStr);
      return date >= oneWeekAgo && date <= today;
    });
    setValidCompOffDates(eligibleDates);
  };

  const getAvailableLeaveTypes = (days, isHalfDayToggle = false) => {
    // If half day toggle is active and dates are valid, recalculate days as 0.5 for same day
    if (isHalfDayToggle && leaveForm.from && leaveForm.to) {
      const fromDate = new Date(leaveForm.from);
      const toDate = new Date(leaveForm.to);
      if (fromDate.getTime() === toDate.getTime()) {
        days = 0.5;
      }
    }
    const options = [];
    const addOption = (type, condition) => {
      options.push({
        value: type,
        label: `${type} (${leaveQuotas[type]?.quota ?? '-'})`,
        disabled: !condition
      });
    };

    if (isHalfDayToggle) {
      // Allow half day/partial day leave selection if days <= 0.5 (including exactly 0.5)
      addOption("Half Day Leaves", days <= 0.5);
      addOption("Partial Day Leave", days <= 0.5);
    } else {
      addOption("Casual Leave", days <= 5);
      addOption("Compensatory Leaves", days <= 1 && validCompOffDates.length > 0);
      addOption("Work From Home", days <= 1);
      addOption("Extraordinary Leave", days <= 3);
      addOption("Unpaid Leaves", days <= 3);
      addOption("Paternity Leave", days <= 15);
      addOption("Marriage Leave", days <= 5);
      addOption("Child Adoption Leave", days <= 135);
      addOption("Maternity Leave", days <= 180);
      addOption("Floater Leaves", true);
    }

    return options;
  };

  useEffect(() => {
    fetchValidCompOffDates();

    if (leaveForm.from && leaveForm.to) {
      const fromDate = new Date(leaveForm.from);
      const toDate = new Date(leaveForm.to);
      let days = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;
      // If half day toggle is active and from/to are same day, set days to 0.5
      if (isHalfDayToggle && fromDate.getTime() === toDate.getTime()) {
        days = 0.5;
      }
      if (!isNaN(days)) {
        setAvailableLeaves(getAvailableLeaveTypes(days, isHalfDayToggle));
      }
    }
  }, [leaveForm.from, leaveForm.to, isHalfDayToggle]);

  useEffect(() => {
    if (isHalfDayToggle) {
      setLeaveForm((prev) => ({
        ...prev,
        to: prev.from // always sync to from
      }));
    }
  }, [isHalfDayToggle, leaveForm.from]);


  const [employeeLeaves, setEmployeeLeaves] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    setEmployeeLeaves([
      { from: '2025-06-10', to: '2025-06-11', reason: 'Medical', status: 'Approved' },
      { from: '2025-06-20', to: '2025-06-21', reason: 'Family Function', status: 'Pending' },
    ]);
  }, []);

  // Helper to calculate duration
  const calculateDuration = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, leaveType } = leaveForm;
    // Determine if half/partial toggle is on
    const isHalfDayOrPartial = isHalfDayToggle;
    // Duration calculation
    const duration = isHalfDayOrPartial ? 0.5 : calculateDuration(from, to);
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Determine periods
    const halfYear = getHalfYearPeriod(fromDate);
    const quarter = getQuarter(fromDate);

    // Calculate week strings for Compensatory Leaves date range
    const compOffWeeks = [];
    if (leaveType === 'Compensatory Leaves') {
      let current = new Date(fromDate.getTime());
      while (current <= toDate) {
        compOffWeeks.push(getWeekString(current));
        current.setDate(current.getDate() + 1);
      }
    }

    // Enforce quota usage BEFORE other leave policy checks, considering breakdowns
    if (leaveType === 'Casual Leave') {
      // Enforce 7 days advance for Casual Leave
      const today = new Date();
      const advanceNoticeDate = new Date(fromDate);
      advanceNoticeDate.setDate(advanceNoticeDate.getDate() - 7);
      if (today > advanceNoticeDate) {
        alert('Casual Leave must be applied at least 7 days in advance.');
        return;
      }
      const used = usedQuotasBreakdown["Casual Leave"]?.[halfYear] || 0;
      const quota = leaveQuotas["Casual Leave"]?.quota;
      if (typeof quota === 'number' && used + duration > quota) {
        alert(`Casual Leave exceeds quota for ${halfYear}. Available: ${quota - used} days`);
        return;
      }
    } else if (leaveType === 'Half Day Leaves') {
      const used = usedQuotasBreakdown["Half Day Leaves"]?.[halfYear] || 0;
      const quota = leaveQuotas["Half Day Leaves"]?.quota;
      if (typeof quota === 'number' && used + duration > quota) {
        alert(`Half Day Leaves exceeds quota for ${halfYear}. Available: ${quota - used} days`);
        return;
      }
    } else if (leaveType === 'Work From Home') {
      const used = usedQuotasBreakdown["Work From Home"]?.[quarter] || 0;
      const quota = leaveQuotas["Work From Home"]?.quota;
      if (typeof quota === 'number' && used + duration > quota) {
        alert(`Work From Home exceeds quota for ${quarter}. Available: ${quota - used} days`);
        return;
      }
    } else if (leaveType === 'Compensatory Leaves') {
      // Sum usage for all weeks in compOffWeeks
      const quota = leaveQuotas["Compensatory Leaves"]?.quota;
      let totalUsed = 0;
      for (const week of compOffWeeks) {
        totalUsed += usedQuotasBreakdown["Compensatory Leaves"]?.[week] || 0;
      }
      if (typeof quota === 'number' && totalUsed + duration > quota) {
        alert(`Compensatory Leaves exceeds weekly quota. Available: ${quota - totalUsed} days in selected week(s)`);
        return;
      }
    } else {
      const used = usedQuotasBreakdown[leaveType] || 0;
      const quota = leaveQuotas[leaveType]?.quota;
      if (typeof quota === 'number' && used + duration > quota) {
        alert(`${leaveType} exceeds quota. Available: ${quota - used} days`);
        return;
      }
    }

    if (leaveType === 'Compensatory Leaves') {
      if (validCompOffDates.length === 0) {
        alert('No valid compensatory leaves available. Must work on Sunday/holiday to earn it.');
        return;
      }
    }
    if (leaveType === 'Casual Leave' && duration > 5) {
      alert('Casual Leave cannot exceed 5 days per half-year.');
      return;
    }
    if (leaveType === 'Unpaid Leaves' && duration > 3) {
      alert('Unpaid Leaves cannot exceed 3 consecutive days.');
      return;
    }
    if (leaveType === 'Extraordinary Leave' && duration > 3) {
      alert('Extraordinary Leaves are limited to 3 per year.');
      return;
    }
    if (leaveType === 'Half Day Leaves' && duration !== 0.5) {
      alert('Half Day Leave must be exactly 0.5 day.');
      return;
    }
    if (leaveType === 'Work From Home' && duration > 1) {
      alert('Work From Home is limited to 1 day at a time.');
      return;
    }
    if (leaveType === 'Paternity Leave' && duration > 15) {
      alert('Paternity Leave is limited to 15 days.');
      return;
    }
    if (leaveType === 'Maternity Leave' && duration > 180) {
      alert('Maternity Leave is limited to 180 days.');
      return;
    }
    if (leaveType === 'Marriage Leave' && duration > 5) {
      alert('Marriage Leave is limited to 5 days.');
      return;
    }
    if (leaveType === 'Child Adoption Leave' && duration > 135) {
      alert('Child Adoption Leave is limited to 135 days.');
      return;
    }
    if (leaveType === 'Compensatory Leaves' && duration > 1) {
      alert('Compensatory Leave must be availed one at a time within 7 days.');
      return;
    }

    alert(`Leave applied from ${from} to ${to} for ${leaveType}`);
    setLeaveForm({ from: '', to: '', reason: '', leaveType: '' });
    setFormOpen(false);
  };

  return (
    <div className="leave-layout">
      <div className="leave-main-content">
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <div className="leave-page-body">
          <h2 className="form-title">My Leaves</h2>

          {isFormOpen && (
            <>
              <div
                className="leave-form-modal-overlay"
                onClick={() => setFormOpen(false)}
              />
              <div className="leave-form-modal">
                {/* Half/Partial Day Toggle Switch */}
                <div className="form-section">
                  <label className="form-label">
                    Apply for Half/Partial Day Leave
                  </label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isHalfDayToggle}
                      onChange={() => setHalfDayToggle(prev => !prev)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <form className="leave-form-container" onSubmit={handleSubmit}>
                  <h3 className="form-title">Apply for Leave</h3>

                  {isHalfDayToggle ? (
                    <div className="form-section">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={leaveForm.from}
                        onChange={(e) =>
                          setLeaveForm({ ...leaveForm, from: e.target.value, to: e.target.value })
                        }
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <div className="form-section">
                        <label className="form-label">From Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={leaveForm.from}
                          onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-section">
                        <label className="form-label">To Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={leaveForm.to}
                          onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="form-section">
                    <label className="form-label">Leave Type</label>
                    <select
                      className="form-input"
                      value={leaveForm.leaveType}
                      onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                      required
                    >
                      <option value="">Select Leave Type</option>
                      {availableLeaves.map(({ value, label, disabled }) => (
                        <option key={value} value={value} disabled={disabled}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Half Day and Partial Day Section */}
                  {leaveForm.leaveType === 'Half Day Leaves' && (
                    <div className="form-section">
                      <label className="form-label">Select Half</label>
                      <label className="form-radio">
                        <input
                          type="radio"
                          name="halfDay"
                          value="First Half"
                          checked={leaveForm.halfDayType === 'First Half'}
                          onChange={(e) =>
                            setLeaveForm({ ...leaveForm, halfDayType: e.target.value })
                          }
                        />
                        <span>First Half</span>
                      </label>
                      <label className="form-radio">
                        <input
                          type="radio"
                          name="halfDay"
                          value="Second Half"
                          checked={leaveForm.halfDayType === 'Second Half'}
                          onChange={(e) =>
                            setLeaveForm({ ...leaveForm, halfDayType: e.target.value })
                          }
                        />
                        <span>Second Half</span>
                      </label>
                    </div>
                  )}

                  {leaveForm.leaveType === 'Partial Day Leave' && (
                    <>
                      <div className="form-section">
                        <label className="form-label">
                          Select Partial Type
                        </label>
                        <select
                          className="form-input"
                          value={leaveForm.partialDayType}
                          onChange={(e) =>
                            setLeaveForm({ ...leaveForm, partialDayType: e.target.value })
                          }
                        >
                          <option value="">Select Type</option>
                          <option value="Clock In Late">Clock In Late</option>
                          <option value="Clock Out Early">Clock Out Early</option>
                        </select>
                      </div>
                      {leaveForm.partialDayType && (
                        <div className="form-section">
                          <label className="form-label">
                            {leaveForm.partialDayType === 'Clock In Late'
                              ? 'Expected Clock In Time'
                              : 'Expected Clock Out Time'}
                          </label>
                          <input
                            type="time"
                            className="form-input"
                            value={leaveForm.partialDayTime}
                            onChange={(e) =>
                              setLeaveForm({ ...leaveForm, partialDayTime: e.target.value })
                            }
                            required
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="form-section">
                    <label className="form-label">
                      Select Team Lead
                    </label>
                    <select
                      className="form-input"
                      value={leaveForm.teamLeadId}
                      onChange={(e) => setLeaveForm({ ...leaveForm, teamLeadId: e.target.value })}
                      required
                    >
                      <option value="">Select Team Lead</option>
                      {teamLeads.map((lead) => (
                        <option key={lead.id} value={lead.id}>
                          {lead.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-section">
                    <label className="form-label">Reason</label>
                    <input
                      type="text"
                      className="form-input"
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="form-button">Apply</button>
                </form>
              </div>
            </>
          )}
          <button className="form-button" onClick={() => setFormOpen(prev => !prev)}>
            {isFormOpen ? 'Close Form' : 'Apply for Leave'}
          </button>

          {/* Leave History Table */}
          <div className="table-container">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeLeaves.map((leave, index) => (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() =>
                        setExpandedRowIndex(prev => prev === index ? null : index)
                      }
                    >
                      <td>{leave.from}</td>
                      <td>{leave.to}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.status}</td>
                    </tr>
                    <tr className="expandable-row">
                      <td colSpan="4" style={{ padding: 0, border: 0 }}>
                        <div
                          className={`expandable-panel ${expandedRowIndex === index ? 'expanded' : ''}`}
                        >
                          <div className="expandable-content">
                            <strong>Detailed Leave Info:</strong>
                            <span><strong>From:</strong> {leave.from}</span>
                            <span><strong>To:</strong> {leave.to}</span>
                            <span><strong>Reason:</strong> {leave.reason}</span>
                            <span><strong>Status:</strong> {leave.status}</span>
                            <span><strong>Duration:</strong> {calculateDuration(leave.from, leave.to)} day(s)</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
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


export default EmployeeLeavesPage;

// --- STYLES ---
// For best practice, move this to EmployeeLeaves.css and import, but for code brevity here:
const styleSheet = `
.leave-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  background: #f5f6fa;
}
.leave-main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #f5f6fa;
  overflow: hidden;
}
.leave-page-body {
  flex: 1;
  overflow-y: auto;
  padding: 32px 20px 20px 20px;
  min-height: 0;
}
.form-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2f3640;
  letter-spacing: 0.02em;
}
.leave-form-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}
.leave-form-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 32px 30px 24px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.14);
  z-index: 1000;
  width: 90%;
  max-width: 500px;
  min-width: 280px;
  animation: fadein 0.2s;
}
@keyframes fadein {
  from { opacity: 0; transform: translate(-50%, -60%);}
  to { opacity: 1; transform: translate(-50%, -50%);}
}
.leave-form-container {
  background: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
}
.form-section {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.form-label {
  font-weight: 500;
  color: #2f3640;
  margin-bottom: 2px;
  font-size: 1rem;
  letter-spacing: 0.01em;
}
.form-input,
.form-input:focus {
  padding: 10px 12px;
  margin: 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #d2dae2;
  background: #fafbfc;
  font-size: 1rem;
  transition: border 0.2s;
  outline: none;
  color: #2f3640;
}
.form-input:focus {
  border: 1.5px solid #4CAF50;
  background: #fff;
}
.form-button {
  padding: 12px 32px;
  background: #2f3640;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(47,54,64,0.06);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
}
.form-button:hover {
  background: #4CAF50;
  box-shadow: 0 4px 12px rgba(76,175,80,0.12);
  transform: translateY(-2px) scale(1.03);
}
.form-radio {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  gap: 6px;
  font-size: 0.98rem;
  font-weight: 400;
  cursor: pointer;
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  vertical-align: middle;
  margin-left: 10px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #ccc;
  transition: background .3s;
  border-radius: 24px;
}
.toggle-switch input:checked + .toggle-slider {
  background: #4CAF50;
}
.toggle-slider:before {
  content: "";
  position: absolute;
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: #fff;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(26px);
}
.table-container {
  margin-top: 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(47,54,64,0.07);
  padding: 0;
  overflow-x: auto;
}
.leave-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  font-size: 1rem;
}
.leave-table th, .leave-table td {
  padding: 14px 16px;
  text-align: left;
}
.leave-table th {
  background: #2f3640;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border-top: none;
  border-bottom: 2px solid #e1e4ea;
  letter-spacing: 0.01em;
}
.leave-table td {
  color: #333;
  border-bottom: 1px solid #f0f1f5;
  background: #fff;
  font-size: 0.97rem;
}
.leave-table tbody tr {
  transition: background 0.18s;
  cursor: pointer;
}
.leave-table tbody tr:hover {
  background: #f6f7fa;
}
.sidebar-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 998;
}
/* --- Expandable Animated Row Styles --- */
.expandable-panel {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
  background: #f9f9f9;
}

.expandable-panel.expanded {
  height: auto;
  animation: expandDown 0.3s ease forwards;
}

@keyframes expandDown {
  0% {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: top;
  }
}

.expandable-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}
`;
if (typeof document !== "undefined" && !document.getElementById("employee-leaves-style")) {
  const style = document.createElement("style");
  style.id = "employee-leaves-style";
  style.innerHTML = styleSheet;
  document.head.appendChild(style);
}