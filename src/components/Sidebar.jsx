import { useState } from 'react';
import projectData from '../data/projects.json';
const { categories, projects } = projectData;

const Sidebar = ({ activeProject, setActiveProject, isSidebarOpen }) => {
  const [openCategories, setOpenCategories] = useState({
    Scolaire: true,
    Perso: true
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (cat) => {
    setOpenCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Rechercher un projet..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="category-list">
        {categories.map(category => {
          const categoryProjects = filteredProjects.filter(p => p.category === category);
          
          if (categoryProjects.length === 0 && searchQuery) return null;

          return (
            <div key={category} className="category-group">
              <div 
                className="category-title" 
                onClick={() => toggleCategory(category)}
              >
                <span className={`category-icon ${openCategories[category] ? 'open' : ''}`}>
                  ▶
                </span>
                {category} ({categoryProjects.length})
              </div>
              
              {openCategories[category] && (
                <div className="project-list">
                  {categoryProjects.map(project => (
                    <div 
                      key={project.id}
                      className={`project-item ${activeProject?.id === project.id ? 'active' : ''}`}
                      onClick={() => setActiveProject(project)}
                    >
                      <img src={project.icon} alt="" className="project-icon" />
                      {project.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
