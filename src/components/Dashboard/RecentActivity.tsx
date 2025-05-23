import React from 'react';
import styles from './RecentActivity.module.css';

const recentActivity = [
  { date: '04/24/2024', description: 'Submitted site inspection report' },
  { date: '04/24/2024', description: 'Assigned workers to Project D' },
  { date: '04/28/2024', description: 'Approved material requisition' },
];

const delayedTasks = [
  { task: 'Electrical installation', due: '04/20/2024' },
  { task: 'Foundation work', due: '04/18/2024' },
  { task: 'Roofing work', due: '04/17/2024' },
];

const RecentActivity: React.FC = () => (
  <div className={styles.activityRow}>
    <div className={styles.activityCard}>
      <div className={styles.cardTitle}>Recent Activity</div>
      <table className={styles.table}>
        <thead>
          <tr><th>Date</th><th>Description</th></tr>
        </thead>
        <tbody>
          {recentActivity.map((item, idx) => (
            <tr key={idx}>
              <td>{item.date}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className={styles.activityCard}>
      <div className={styles.cardTitle}>Delayed Tasks</div>
      <table className={styles.table}>
        <thead>
          <tr><th>Task</th><th>Due Date</th></tr>
        </thead>
        <tbody>
          {delayedTasks.map((item, idx) => (
            <tr key={idx}>
              <td>{item.task}</td>
              <td>{item.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentActivity; 