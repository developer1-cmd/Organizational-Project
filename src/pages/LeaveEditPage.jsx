

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LeaveEditPage = () => {
  const { leaveId } = useParams();
  const [leaveData, setLeaveData] = useState(null);

  useEffect(() => {
    // Replace with actual API call
    fetch(`/api/leaves/${leaveId}`)
      .then(res => res.json())
      .then(data => setLeaveData(data))
      .catch(err => console.error('Error fetching leave data:', err));
  }, [leaveId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual update API
    fetch(`/api/leaves/${leaveId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leaveData),
    })
      .then(res => res.json())
      .catch(err => console.error('Error updating leave:', err));
  };

  if (!leaveData) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Leave</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <label>
          Employee:
          <input type="text" value={leaveData.employeeName} readOnly style={{ backgroundColor: '#f1f1f1' }} />
        </label>
        <label>
          Leave Type:
          <select name="type" value={leaveData.type} onChange={handleChange}>
            <option value="Sick">Sick</option>
            <option value="Casual">Casual</option>
            <option value="Earned">Earned</option>
          </select>
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={leaveData.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={leaveData.endDate} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="status" value={leaveData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
        <button type="submit">Update Leave</button>
      </form>
    </div>
  );
};

export default LeaveEditPage;