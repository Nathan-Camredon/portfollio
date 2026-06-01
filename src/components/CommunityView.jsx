const CommunityView = () => {
  const friends = [
    {
      name: 'GitHub',
      status: 'En ligne',
      activity: 'En train de commiter du code...',
      avatar: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=100',
      link: 'https://github.com/Nathan-Camredon'
    },
    {
      name: 'E-mail',
      status: 'Prêt à jouer',
      activity: 'nathan.camredon@laplateforme.io',
      avatar: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=100',
      link: 'mailto:nathan.camredon@laplateforme.io'
    }
  ];

  return (
    <div className="community-container">
      <div className="community-header">
        <h1>Activité de la communauté</h1>
        <p>Retrouvez les réseaux professionnels de Nathan.</p>
      </div>

      <div className="community-content" style={{ justifyContent: 'center' }}>
        {/* Networks List */}
        <div className="community-networks-panel" style={{ maxWidth: '600px', width: '100%' }}>
          <h3 className="panel-title">Mes Réseaux Professionnels (Amis)</h3>
          
          <div className="friends-list-header">
            <div className="steam-user-status-card">
              <div className="user-avatar-wrapper online larger">
                <img src="/image_cv.jpg" alt="Nathan avatar" className="friend-avatar" />
              </div>
              <div className="friend-info">
                <span className="friend-name online">Nathan-Camredon (Vous)</span>
                <span className="friend-status online">En ligne</span>
                <span className="friend-activity">Présente son portfolio Steam 🎮</span>
              </div>
            </div>
          </div>

          <div className="friends-list-divider">Amis en ligne</div>

          <div className="friends-grid-list">
            {friends.map((friend, idx) => (
              <a 
                key={idx} 
                href={friend.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="friend-item-link"
              >
                <div className="friend-item-row">
                  <div className="friend-avatar-wrapper online">
                    <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                  </div>
                  <div className="friend-details">
                    <div className="friend-row-header">
                      <span className="friend-name online">{friend.name}</span>
                      <span className="friend-status-tag">En ligne</span>
                    </div>
                    <span className="friend-activity">{friend.activity}</span>
                  </div>
                  <span className="friend-arrow-link">➜</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityView;
