const ProfileView = () => {
  return (
    <div className="profile-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Profile Header */}
      <div className="profile-user-header">
        <div className="user-avatar-section">
          <div className="user-avatar-frame online">
            <img 
              src="/image_cv.jpg" 
              alt="Nathan avatar" 
              className="user-avatar-image" 
            />
          </div>
          <div className="user-text-section">
            <h2 className="profile-username">Nathan Camredon</h2>
            <span className="profile-realname">Développeur Fullstack</span>
            <span className="profile-location">📍 Marseille, France</span>
          </div>
        </div>

        {/* Action Button to open HTML CV in a new tab */}
        <div className="user-level-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <a 
            href="/cv.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="steam-install-btn"
            style={{ textDecoration: 'none' }}
          >
            <span className="install-icon">↗</span> Ouvrir le CV en plein écran
          </a>
        </div>
      </div>

      {/* Embedded HTML CV Viewer */}
      <div className="profile-card-block" style={{ flex: 1, padding: '12px', minHeight: '850px', display: 'flex', flexDirection: 'column' }}>
        <h3 className="block-title" style={{ marginBottom: '12px' }}>Curriculum Vitae</h3>
        <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: '800px' }}>
          <iframe 
            src="/cv.html" 
            width="100%" 
            height="100%" 
            style={{ 
              border: 'none', 
              borderRadius: '4px', 
              backgroundColor: '#fff',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }} 
            title="CV Nathan Camredon"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
