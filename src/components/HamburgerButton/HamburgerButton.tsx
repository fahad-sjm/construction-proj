import React from 'react';
import styles from './HamburgerButton.module.css';

interface HamburgerButtonProps {
  onClick: () => void;
  isOpen: boolean; // To change icon based on state
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
    >
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </button>
  );
};

export default HamburgerButton;
