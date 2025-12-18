import React from 'react'
import '../components/HabitCard.css'

const HabitCard = ({ habit, onComplete }) => {
    if (!habit || !habit.id || !habit.name) {
        return null;
    }

    return (
        <div className="habit-card">
            <span>{habit.name}</span>
            <button onClick={() => onComplete(habit.id)}>Mark Complete</button>
        </div>
    )
}

export default HabitCard