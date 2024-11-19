import React, { useState } from 'react';
import { createPreferences, updatePreferences } from '../services/api';

const PreferencesForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    email: '',
    marketing: false,
    newsletter: false,
    updates: false,
    frequency: 'daily',
    channels: { email: true, sms: false, push: false },
    timezone: 'UTC',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await updatePreferences(userId, formData);
        alert('Preferences updated successfully');
      } else {
        await createPreferences(formData);
        alert('Preferences created successfully');
      }
    } catch (error) {
      alert('Error submitting preferences');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Preferences</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label>
        Marketing
        <input
          type="checkbox"
          name="marketing"
          checked={formData.marketing}
          onChange={handleChange}
        />
      </label>
      <label>
        Newsletter
        <input
          type="checkbox"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
        />
      </label>
      <label>
        Updates
        <input
          type="checkbox"
          name="updates"
          checked={formData.updates}
          onChange={handleChange}
        />
      </label>
      <label>
        Frequency
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="never">Never</option>
        </select>
      </label>
      <label>
        Channels:
        <label>
          Email
          <input
            type="checkbox"
            name="channels.email"
            checked={formData.channels.email}
            onChange={handleChange}
          />
        </label>
        <label>
          SMS
          <input
            type="checkbox"
            name="channels.sms"
            checked={formData.channels.sms}
            onChange={handleChange}
          />
        </label>
        <label>
          Push
          <input
            type="checkbox"
            name="channels.push"
            checked={formData.channels.push}
            onChange={handleChange}
          />
        </label>
      </label>
      <label>
        Timezone
        <input
          type="text"
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default PreferencesForm;
