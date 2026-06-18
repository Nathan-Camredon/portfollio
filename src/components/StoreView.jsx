import projectData from '../data/projects.json';
const { projects } = projectData;

const StoreView = ({ setActiveTab, setActiveProject }) => {
  // Let's use Wahiba as our primary spotlight game/project, TCG as second, and Zeri Bot as third
  const spotlight = projects.find(p => p.id === 'wahiba') || projects[0];
  const specials = projects.filter(p => p.id === 'tcg' || p.id === 'zeri-bot');

  const handleSelectFeatured = (project) => {
    setActiveProject(project);
    setActiveTab('library'); // Switch to Library tab to view details
  };

  return (
    <div className="store-container">
      {/* Store Sub-header */}
      <div className="store-subheader">
        <span className="store-menu-item active">À la une</span>
        <span className="store-menu-item">Catégories</span>
        <span className="store-menu-item">Actualités</span>
        <div className="store-search-bar">
          <input type="text" placeholder="rechercher dans le magasin" disabled />
        </div>
      </div>

      {/* Main Spotlight Showcase */}
      <div className="store-section">
        <h2 className="store-section-title">À la une et recommandés</h2>
        <div className="store-featured-hero" onClick={() => handleSelectFeatured(spotlight)}>
          <div 
            className="featured-hero-image" 
            style={{ backgroundImage: `url(${spotlight.banner})` }}
          />
          <div className="featured-hero-details">
            <h2>{spotlight.title}</h2>
            <div className="featured-hero-screenshots">
              {spotlight.media && spotlight.media.length >= 3 ? (
                spotlight.media.slice(1, 3).map((m, i) => (
                  <div key={i} className="screenshot-thumb" style={{ backgroundImage: `url(${m.url})` }} />
                ))
              ) : (
                <>
                  <div className="screenshot-thumb placeholder" />
                  <div className="screenshot-thumb placeholder" />
                </>
              )}
            </div>
            
            <div className="featured-hero-meta">
              <h3>Disponible maintenant</h3>
              <div className="featured-tags">
                <span className="featured-tag">{spotlight.meta.languages}</span>
                <span className="featured-tag">{spotlight.category}</span>
              </div>
            </div>
            <div className="featured-hero-price">
              <span className="price-tag">{spotlight.id === 'wahiba' || spotlight.id === 'tcg' ? 'PROJET PRIVÉ' : 'GRATUIT'}</span>
              <span className="platform-badges">💻 📱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Resume / CV Section (Green Steam Install Button) */}
      <div className="store-section store-cv-banner">
        <div className="cv-banner-content">
          <div className="cv-banner-text">
            <h3>Installer le Curriculum Vitae de Nathan Camredon</h3>
            <p>Téléchargez la fiche technique complète contenant son parcours scolaire, ses compétences et ses coordonnées.</p>
          </div>
          <div className="cv-banner-action">
            <a href="/cv.pdf" download="CV_Nathan_Camredon.pdf" className="steam-install-btn">
              <span className="install-icon">⬇</span> Installer (Télécharger le CV PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Grid of Specials */}
      <div className="store-section">
        <h2 className="store-section-title">Offres spéciales</h2>
        <div className="store-specials-grid">
          {specials.map(p => (
            <div key={p.id} className="store-special-card" onClick={() => handleSelectFeatured(p)}>
              <div className="special-card-image" style={{ backgroundImage: `url(${p.banner})` }} />
              <div className="special-card-content">
                <h4>{p.title}</h4>
                <div className="special-card-meta">
                  <span className="special-tag">{p.meta.languages}</span>
                  <span className="special-status">{p.meta.status}</span>
                </div>
                <div className="special-card-price">
                  <span className="price-tag">{p.id === 'tcg' || p.id === 'wahiba' ? 'PROJET PRIVÉ' : 'OPEN SOURCE'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreView;
