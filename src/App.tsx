import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardCards from './components/Dashboard/DashboardCards';
import Charts from './components/Dashboard/Charts';
import RecentActivity from './components/Dashboard/RecentActivity';
import Chatbot from './components/Dashboard/Chatbot';
import './App.css';

const App: React.FC = () => (
  <Provider store={store}>
    <div className="appRoot">
      <Sidebar />
      <main className="mainContent">
        <div className="dashboardHeader">
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

export default App; 