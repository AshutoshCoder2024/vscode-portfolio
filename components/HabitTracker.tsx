import { useState, useMemo } from 'react';
import styles from '@/styles/HabitTracker.module.css';

interface Habit {
  id: string;
  name: string;
  category: 'creative' | 'work';
}

const HABITS: Habit[] = [
  { id: '1', name: 'Practice painting', category: 'creative' },
  { id: '2', name: 'Practice guitar', category: 'creative' },
  { id: '3', name: 'Stretch at least once', category: 'creative' },
  { id: '4', name: 'Practice embroidery', category: 'creative' },
  { id: '5', name: 'Learn code', category: 'work' },
  { id: '6', name: 'Connect with virtual team', category: 'work' },
  { id: '7', name: 'Complete daily tasks by EOD', category: 'work' },
  { id: '8', name: 'Check all emails by EOD', category: 'work' },
];

const WEEK_COLORS = ['#4A90E2', '#F5A623', '#F8E71C', '#9013FE', '#50E3C2'];

export default function HabitTracker() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});

  // Calculate days in month and organize by weeks
  const calendarData = useMemo(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    
    const weeks: Array<Array<{ day: number; date: number; dayName: string }>> = [];
    let currentWeek: Array<{ day: number; date: number; dayName: string }> = [];
    
    // Fill first week with empty days if needed
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ day: 0, date: 0, dayName: '' });
    }
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let date = 1; date <= daysInMonth; date++) {
      const dayOfWeek = new Date(selectedYear, selectedMonth, date).getDay();
      currentWeek.push({
        day: dayOfWeek,
        date,
        dayName: dayNames[dayOfWeek],
      });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    // Add remaining days to last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ day: 0, date: 0, dayName: '' });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  }, [selectedMonth, selectedYear]);

  const toggleHabit = (habitId: string, date: number) => {
    const key = `${habitId}-${selectedYear}-${selectedMonth}-${date}`;
    setCompletedHabits((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const calculateDayCompletion = (date: number): number => {
    if (date === 0) return 0;
    const completed = HABITS.filter((habit) => {
      const key = `${habit.id}-${selectedYear}-${selectedMonth}-${date}`;
      return completedHabits[key];
    }).length;
    return Math.round((completed / HABITS.length) * 100);
  };

  const calculateWeekCompletion = (week: Array<{ date: number }>): number => {
    const validDays = week.filter((day) => day.date > 0);
    if (validDays.length === 0) return 0;
    
    const totalCompletion = validDays.reduce((sum, day) => {
      return sum + calculateDayCompletion(day.date);
    }, 0);
    
    return Math.round(totalCompletion / validDays.length);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Monthly Habit Tracker</h1>
        <div className={styles.monthSelector}>
          <button
            onClick={() => {
              if (selectedMonth === 0) {
                setSelectedMonth(11);
                setSelectedYear(selectedYear - 1);
              } else {
                setSelectedMonth(selectedMonth - 1);
              }
            }}
            className={styles.navButton}
          >
            ←
          </button>
          <span className={styles.monthYear}>
            {monthNames[selectedMonth]} {selectedYear}
          </span>
          <button
            onClick={() => {
              if (selectedMonth === 11) {
                setSelectedMonth(0);
                setSelectedYear(selectedYear + 1);
              } else {
                setSelectedMonth(selectedMonth + 1);
              }
            }}
            className={styles.navButton}
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.trackerGrid}>
        {/* Left column - Habits */}
        <div className={styles.habitsColumn}>
          <div className={styles.habitsHeader}>Daily habits</div>
          <div className={styles.percentageLabelRow}>completed (%)</div>
          <div className={styles.dayLabelRow}></div>
          {HABITS.map((habit) => (
            <div
              key={habit.id}
              className={`${styles.habitRow} ${
                habit.category === 'creative' ? styles.creativeHabit : styles.workHabit
              }`}
            >
              {habit.name}
            </div>
          ))}
        </div>

        {/* Calendar grid - Weeks side by side */}
        <div className={styles.calendarSection}>
          {calendarData.map((week, weekIndex) => {
            const weekCompletion = calculateWeekCompletion(week);
            const weekColor = WEEK_COLORS[weekIndex % WEEK_COLORS.length];
            
            return (
              <div key={weekIndex} className={styles.weekContainer}>
                {/* Week header */}
                <div
                  className={styles.weekHeader}
                  style={{ backgroundColor: weekColor }}
                >
                  Week {weekIndex + 1} ({weekCompletion}%)
                </div>
                
                {/* Completion percentage row */}
                <div className={styles.percentageRow}>
                  {week.map((day, dayIndex) => (
                    <div key={dayIndex} className={styles.percentageCell}>
                      {day.date > 0 ? `${calculateDayCompletion(day.date)}%` : ''}
                    </div>
                  ))}
                </div>
                
                {/* Day headers */}
                <div className={styles.dayHeadersRow}>
                  {week.map((day, dayIndex) => (
                    <div key={dayIndex} className={styles.dayHeader}>
                      {day.date > 0 ? (
                        <>
                          <div className={styles.dayName}>{day.dayName}</div>
                          <div className={styles.dayDate}>{day.date}</div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
                
                {/* Checkboxes grid for this week */}
                {HABITS.map((habit) => (
                  <div key={habit.id} className={styles.habitWeekRow}>
                    {week.map((day, dayIndex) => {
                      if (day.date === 0) {
                        return <div key={dayIndex} className={styles.emptyCell}></div>;
                      }
                      
                      const key = `${habit.id}-${selectedYear}-${selectedMonth}-${day.date}`;
                      const isCompleted = completedHabits[key] || false;
                      
                      return (
                        <div
                          key={dayIndex}
                          className={styles.checkboxCell}
                          onClick={() => toggleHabit(habit.id, day.date)}
                        >
                          <div
                            className={`${styles.checkbox} ${
                              isCompleted ? styles.checkboxChecked : ''
                            }`}
                          >
                            {isCompleted && <span className={styles.checkmark}>✓</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
