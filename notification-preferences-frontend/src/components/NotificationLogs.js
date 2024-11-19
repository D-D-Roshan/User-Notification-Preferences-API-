import React, { useEffect, useState } from 'react';
import { fetchNotificationLogs } from '../services/api';

const NotificationLogs = ({ userId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetchNotificationLogs(userId);
        setLogs(response.data);
      } catch (error) {
        alert('Error fetching logs');
      }
    };
    fetchLogs();
  }, [userId]);

  return (
    <div>
      <h2>Notification Logs</h2>
      {logs.length === 0 ? (
        <p>No logs available</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log._id}>
              Type: {log.type}, Channel: {log.channel}, Status: {log.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationLogs;
