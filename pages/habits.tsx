import HabitTracker from '@/components/HabitTracker';

const HabitsPage = () => {
  return <HabitTracker />;
};

export async function getStaticProps() {
  return {
    props: { title: 'Habit Tracker' },
  };
}

export default HabitsPage;
