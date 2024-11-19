import React, { useEffect, useState } from 'react';
import { fetchStats } from '../services/api';

const Stats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await fetchStats();
        setStats(response.data);
      } catch (error) {
        alert('Error fetching stats');
      }
    };
    getStats();
  }, []);

  return (
    <div>
      <h2>Notification Stats</h2>
      <p>Total Sent: {stats.totalSent}</p>
      <p>Failed: {stats.failed}</p>
    </div>
  );
};

export default Stats;
