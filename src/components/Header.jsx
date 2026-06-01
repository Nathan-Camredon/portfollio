
const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="steam-header">
      <div className="steam-header-left">
        {/* Navigation Arrows */}
        <div className="nav-arrows">
          <button className="nav-arrow-btn disabled" aria-label="Retour">◀</button>
          <button className="nav-arrow-btn disabled" aria-label="Suivant">▶</button>
        </div>
        
        {/* Main Steam navigation links */}
        <nav className="header-nav">
          <button 
            className={`nav-link ${activeTab === 'store' ? 'active' : ''}`}
            onClick={() => setActiveTab('store')}
          >
            Magasin
          </button>
          <button 
            className={`nav-link ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            Bibliothèque
          </button>
          <button 
            className={`nav-link ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => setActiveTab('community')}
          >
            Communauté
          </button>
          <button 
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Nathan
          </button>
        </nav>
      </div>

      {/* Simulated Desktop Window controls */}
      <div className="steam-window-controls">
        <button className="control-btn" aria-label="Réduire">—</button>
        <button className="control-btn" aria-label="Agrandir">⬜</button>
        <button className="control-btn close-btn" aria-label="Fermer">✕</button>
      </div>
    </header>
  );
};

export default Header;
