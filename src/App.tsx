import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar/Sidebar';
import HamburgerButton from './components/HamburgerButton/HamburgerButton'; // Import HamburgerButton
import DashboardCards from './components/Dashboard/DashboardCards';
import Charts from './components/Dashboard/Charts';
import RecentActivity from './components/Dashboard/RecentActivity';
import Chatbot from './components/Dashboard/Chatbot';
import sidebarStyles from './components/Sidebar/Sidebar.module.css'; // Import sidebar styles for class name
import './App.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Optional: Close sidebar on window resize if transitioning from mobile to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Provider store={store}>
      <div className="appRoot">
        <HamburgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
        <Sidebar className={isSidebarOpen ? sidebarStyles.sidebarOpen : ''} />
        {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        <main className={`mainContent ${isSidebarOpen ? 'sidebarEffect' : ''}`}>
          <div className="dashboardHeader">
            {/* HamburgerButton could also be placed here if preferred for layout, but fixed positioning is fine */}
            <input className="searchBar" placeholder="Search" />
            <div className="profilePic">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            </div>
          </div>
          <DashboardCards />
          <Charts />
          <RecentActivity />
          <Chatbot />
        </main>
      </div>
    </Provider>
  );
};

export default App; 