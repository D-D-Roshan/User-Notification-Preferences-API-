import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Notification Preferences Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Manage Preferences</Link>
          </li>
          <li>
            <Link to="/logs/user123">Notification Logs</Link>
          </li>
          <li>
            <Link to="/stats">View Stats</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
