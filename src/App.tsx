import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar/Sidebar';
import HamburgerButton from './components/HamburgerButton/HamburgerButton';
import DashboardCards from './components/Dashboard/DashboardCards';
import Charts from './components/Dashboard/Charts';
import RecentActivity from './components/Dashboard/RecentActivity';
import Chatbot from './components/Dashboard/Chatbot';
import sidebarStyles from './components/Sidebar/Sidebar.module.css';
import './App.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
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
        {isMobile && (
          <div 
            className={`overlay ${isSidebarOpen ? 'visible' : ''}`} 
            onClick={toggleSidebar}
          />
        )}
        <main className={`mainContent ${isSidebarOpen ? 'sidebarEffect' : ''}`}>
          <div className="dashboardHeader">
            <input 
              className="searchBar" 
              placeholder="Search" 
              aria-label="Search"
            />
            <div className="profilePic">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User profile" 
              />
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