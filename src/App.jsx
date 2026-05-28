import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import './index.css'; // Make sure this is imported

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
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
    </div>
  );
}

export default App;
