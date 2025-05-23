import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  className?: string; // Add className to props
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => (
  <aside className={`${styles.sidebar} ${className || ''}`}> {/* Apply className here */}
    <div className={styles.logoSection}>
      <span className={styles.logoIcon}>🦺</span>
      <span className={styles.companyName}>CONSTRUCTION<br/>COMPANY</span>
    </div>
    <nav className={styles.nav}>
      <a className={styles.active} href="#">Dashboard</a>
      <a href="#">Projects</a>
      <a href="#">Workers</a>
      <a href="#">Reports</a>
      <a href="#">Documents</a>
      <a href="#">Settings</a>
    </nav>
    <div className={styles.userSection}>
      <img className={styles.avatar} src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
      <div>
        <div className={styles.userName}>John Doe</div>
        <div className={styles.userRole}>Project Manager</div>
      </div>
    </div>
  </aside>
);

export default Sidebar; 