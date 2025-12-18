import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HabitCard from '../components/HabitCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token');

  // Fetch all habits
  const fetchHabits = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:3000/api/habits', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const validHabits = Array.isArray(res.data)
        ? res.data.filter(habit => habit && habit.id && habit.name)
        : [];
      setHabits(validHabits);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch habits: ' + (err.response?.data?.message || err.message));
      setHabits([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new habit
  const addHabit = async () => {
    if (!habitName.trim()) return;
    try {
      setError('');
      const res = await axios.post(
        'http://localhost:3000/api/habits',
        { name: habitName, frequency: 'daily', category: 'general' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newHabit = res.data.habit || res.data;
      if (newHabit && newHabit.id && newHabit.name) {
        setHabits(prev => [newHabit, ...prev]);
        setHabitName('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to add habit: ' + (err.response?.data?.message || err.message));
    }
  };

  // Mark habit as complete
  const completeHabit = async (id) => {
    try {
      await axios.post(
        'http://localhost:3000/api/habits/complete',
        { habitId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Habit marked as complete!');
      fetchHabits();
    } catch (err) {
      console.error(err);
      setError('Failed to complete habit: ' + (err.response?.data?.message || err.message));
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Habit Tracker</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="dashboard-content">
        {/* Add habit section */}
        <div className="add-habit-section">
          <input
            type="text"
            placeholder="Enter habit name"
            value={habitName}
            onChange={e => setHabitName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addHabit()}
          />
          <button onClick={addHabit}>Add Habit</button>
        </div>

        {/* Error message */}
        {error && <p style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</p>}

        {/* Habits list */}
        <div className="habits-container">
          {isLoading ? (
            <div className="empty-state">
              <p>Loading your habits...</p>
            </div>
          ) : habits.length === 0 ? (
            <div className="empty-state">
              <h2 className="empty-title">You have no habits yet</h2>
              <p className="empty-subtitle">
                Add your first habit using the box above to get started.
              </p>
              <div className="empty-actions">
                <button onClick={addHabit} disabled={!habitName.trim()}>
                  Add Habit
                </button>
              </div>
            </div>
          ) : (
            habits.map(habit => (
              <HabitCard key={habit.id} habit={habit} onComplete={completeHabit} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
