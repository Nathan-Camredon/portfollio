import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import './index.css'; // Make sure this is imported

function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="app-container">
      <Sidebar 
        activeProject={activeProject} 
        setActiveProject={setActiveProject} 
      />
      <MainView 
        project={activeProject} 
      />
    </div>
  );
}

export default App;
