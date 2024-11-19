import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreferencesForm from './components/PreferencesForm';
import NotificationLogs from './components/NotificationLogs';
import Stats from './components/Stats';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreferencesForm />} />
        <Route path="/logs/:userId" element={<NotificationLogs />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
