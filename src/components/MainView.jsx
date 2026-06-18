import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import projectData from '../data/projects.json';
const { projects } = projectData;

const MainView = ({ project, setActiveProject, onMenuToggle }) => {
  const [activeTab, setActiveTab] = useState('Description');
  const [activeMedia, setActiveMedia] = useState(null);

  // Reset active media when project changes
  useEffect(() => {
    if (project && project.media && project.media.length > 0) {
      setActiveMedia(project.media[0]);
    } else {
      setActiveMedia(null);
    }
  }, [project]);

  if (!project) {
    // Show recent projects (reverse chronological order from projects list)
    const recentProjects = [...projects].reverse().slice(0, 3);

    return (
      <div className="library-home">
        <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Toggle Menu">
          ☰
        </button>
        <div className="library-home-header">
          <h1>Accueil de la bibliothèque</h1>
          <div className="library-stats">
            <div className="stat-item">
              <span className="stat-value">{projects.length}</span>
              <span className="stat-label">Projets au total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {projects.filter(p => p.meta.status === 'Terminé').length}
              </span>
              <span className="stat-label">Terminés</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {projects.filter(p => p.meta.status === 'En cours').length}
              </span>
              <span className="stat-label">En développement</span>
            </div>
          </div>
        </div>

        <div className="library-home-section">
          <h2 className="section-title">QUOI DE NEUF ?</h2>
          <div className="recent-projects-grid">
            {recentProjects.map(p => {
              // Strip markdown syntax for short description
              const cleanDesc = p.markdownContent
                ? p.markdownContent.replace(/[#*`>_\-]/g, '').split('\n').filter(Boolean)[1]?.slice(0, 160) || p.markdownContent.replace(/[#*`>_\-]/g, '').slice(0, 160)
                : 'Pas de description.';
              
              return (
                <div 
                  key={p.id} 
                  className="recent-project-card"
                  onClick={() => setActiveProject(p)}
                >
                  <div 
                    className="recent-card-banner" 
                    style={{ backgroundImage: `url(${p.banner})` }}
                  />
                  <div className="recent-card-info">
                    <div className="recent-card-header">
                      <span className="recent-card-category">{p.category}</span>
                      <span className="recent-card-date">{p.meta.creationDate}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p className="recent-card-desc">{cleanDesc}...</p>
                    <div className="recent-card-footer">
                      <span className="lang-tag">{p.meta.languages}</span>
                      <span className={`status-badge ${p.meta.status.toLowerCase().replace(/\s+/g, '') === 'terminé' ? 'completed' : 'in-progress'}`}>
                        {p.meta.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="library-home-section">
          <h2 className="section-title">TOUS LES PROJETS</h2>
          <div className="all-projects-grid">
            {projects.map(p => (
              <div 
                key={p.id} 
                className="project-grid-card"
                onClick={() => setActiveProject(p)}
              >
                <div className="card-image-wrapper">
                  <img src={p.banner} alt={p.title} className="card-image" />
                  <div className="card-overlay">
                    <span className="card-category-badge">{p.category}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h4 className="card-title">{p.title}</h4>
                  <div className="card-meta">
                    <span className="card-date">{p.meta.creationDate}</span>
                    <span className="card-languages">{p.meta.languages}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-view">
      <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Toggle Menu">
        ☰
      </button>
      <div 
        className="hero-banner"
        style={{ backgroundImage: `url(${project.banner})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="project-title">{project.title}</h1>
          <div className="hero-actions">
            <button 
              className="play-button"
              onClick={() => {
                const targetUrl = project.website || project.github;
                window.open(targetUrl, '_blank');
              }}
            >
              {project.website ? "▶ VISITER LE SITE" : "▶ JOUER (GitHub)"}
            </button>
            <div className="project-meta">
              <div>
                <span className="meta-label">LANGAGES: </span>
                {project.meta.languages}
              </div>
              <div>
                <span className="meta-label">DATE DE CRÉATION: </span>
                {project.meta.creationDate}
              </div>
              <div>
                <span className="meta-label">STATUT: </span>
                {project.meta.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-tabs">
        <div 
          className={`tab ${activeTab === 'Description' ? 'active' : ''}`}
          onClick={() => setActiveTab('Description')}
        >
          À propos
        </div>
        <div 
          className={`tab ${activeTab === 'Media' ? 'active' : ''}`}
          onClick={() => setActiveTab('Media')}
        >
          Médias
        </div>
      </div>

      <div className="content-area">
        {activeTab === 'Description' && (
          <div className="markdown-body">
            <ReactMarkdown>
              {project.markdownContent}
            </ReactMarkdown>
          </div>
        )}
        {activeTab === 'Media' && (
          <div className="media-tab-container">
            {project.media && project.media.length > 0 ? (
              <div className="steam-media-player">
                <div className="main-media-viewport">
                  {activeMedia?.type === 'youtube' && (
                    <div className="iframe-wrapper">
                      <iframe
                        src={activeMedia.url}
                        title={`${project.title} Video Demo`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {activeMedia?.type === 'video' && (
                    <video
                      src={activeMedia.url}
                      controls
                      autoPlay
                      muted
                      loop
                    />
                  )}
                  {activeMedia?.type === 'image' && (
                    <img
                      src={activeMedia.url}
                      alt={`${project.title} screenshot`}
                    />
                  )}
                </div>
                
                <div className="media-thumbnails-strip">
                  {project.media.map((item, idx) => (
                    <div
                      key={idx}
                      className={`media-thumbnail ${activeMedia === item ? 'active' : ''}`}
                      onClick={() => setActiveMedia(item)}
                    >
                      <img src={item.thumbnail} alt="" />
                      {(item.type === 'youtube' || item.type === 'video') && (
                        <div className="media-play-overlay">
                          <span className="play-triangle">▶</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🖼️</div>
                <h2>Aucun média disponible</h2>
                <p>Il n'y a pas de captures d'écran ni de vidéos de démonstration pour ce projet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainView;


