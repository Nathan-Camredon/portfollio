import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const MainView = ({ project }) => {
  const [activeTab, setActiveTab] = useState('Description');
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (project) {
      if (project.rawMarkdownUrl) {
        // Fetch from raw markdown url
        fetch(project.rawMarkdownUrl)
          .then(res => res.text())
          .then(text => setMarkdownContent(text))
          .catch(err => setMarkdownContent('# Erreur de chargement\\nImpossible de charger le fichier README depuis GitHub.'));
      } else if (project.markdownContent) {
        // Use placeholder
        setMarkdownContent(project.markdownContent);
      }
    }
  }, [project]);

  if (!project) {
    return (
      <div className="main-view">
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <h2>Aucun projet sélectionné</h2>
          <p>Sélectionnez un projet dans le menu de gauche pour voir les détails.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-view">
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
              onClick={() => window.open(project.github, '_blank')}
            >
              ▶ JOUER (GitHub)
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
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
        {activeTab === 'Media' && (
          <div className="empty-state">
            <p>Galerie d'images et vidéos à venir...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainView;
