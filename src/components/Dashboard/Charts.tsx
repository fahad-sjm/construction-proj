import React from 'react';
import styles from './Charts.module.css';

const barData = [80, 60, 90, 50, 70, 40];
const barLabels = ['Foundation', 'Framing', 'Roofing', 'Plumbing', 'Electrical', 'Finishing'];

const pieData = [
  { label: 'Electrical installation', value: 50, color: '#2563eb' },
  { label: 'Foundation work', value: 30, color: '#60a5fa' },
  { label: 'Roofing work', value: 20, color: '#93c5fd' },
];

const Charts: React.FC = () => (
  <div className={styles.chartsRow}>
    <div className={styles.chartCard}>
      <div className={styles.chartTitle}>Project Progress Overview</div>
      <div className={styles.barChart}>
        {barData.map((val, idx) => (
          <div key={idx} className={styles.barCol}>
            <div className={styles.barValue}>{val}</div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ height: `${val}%` }}
              />
            </div>
            <div className={styles.barLabel}>{barLabels[idx]}</div>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.chartCard}>
      <div className={styles.chartTitle}>Worker Allocation by Project</div>
      <div className={styles.pieChartWrapper}>
        <svg viewBox="0 0 36 36" className={styles.pieChart}>
          <circle
            className={styles.pieBg}
            cx="18" cy="18" r="16"
            fill="none" stroke="#e5e7eb" strokeWidth="4"
          />
          {/* Pie slices */}
          <circle
            r="16" cx="18" cy="18"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeDasharray="50 50"
            strokeDashoffset="0"
          />
          <circle
            r="16" cx="18" cy="18"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="4"
            strokeDasharray="30 70"
            strokeDashoffset="-50"
          />
          <circle
            r="16" cx="18" cy="18"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="4"
            strokeDasharray="20 80"
            strokeDashoffset="-80"
          />
        </svg>
        <div className={styles.pieLegend}>
          {pieData.map((item) => (
            <div key={item.label} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ background: item.color }}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Charts; 