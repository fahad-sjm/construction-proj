import React from 'react';
import styles from './DashboardCards.module.css';

interface CardData {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const cards: CardData[] = [
  { label: 'Ongoing Projects', value: 12, highlight: true },
  { label: 'Pending Approvals', value: 5 },
  { label: 'Active Workers', value: 126 },
  { label: "Today's Tasks", value: 32 },
];

const DashboardCards: React.FC = () => (
  <div className={styles.cardsRow}>
    {cards.map((card, idx) => (
      <div
        key={card.label}
        className={card.highlight ? styles.cardHighlight : styles.card}
      >
        <div className={styles.value}>{card.value}</div>
        <div className={styles.label}>{card.label}</div>
      </div>
    ))}
  </div>
);

export default DashboardCards; 