import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import StoreView from './components/StoreView';
import CommunityView from './components/CommunityView';
import ProfileView from './components/ProfileView';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('library'); // 'store' | 'library' | 'community' | 'profile'
  const [activeProject, setActiveProject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="steam-app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="app-container">
        {activeTab === 'library' && (
          <>
            <Sidebar 
              activeProject={activeProject} 
              setActiveProject={(project) => {
                setActiveProject(project);
                setIsSidebarOpen(false);
              }} 
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            {isSidebarOpen && (
              <div 
                className="sidebar-overlay" 
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            <MainView 
              project={activeProject} 
              setActiveProject={setActiveProject} 
              onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </>
        )}

        {activeTab === 'store' && (
          <StoreView 
            setActiveTab={setActiveTab} 
            setActiveProject={setActiveProject} 
          />
        )}

        {activeTab === 'community' && (
          <CommunityView />
        )}

        {activeTab === 'profile' && (
          <ProfileView />
        )}
      </div>
    </div>
  );
}

export default App;
