import { useState, useEffect } from 'react';
import './App.css';
import data from './data.json';

const SITE_PASSWORD = 'wafflehouse'; // Change this to your desired password

function App() {
  const [activeSection, setActiveSection] = useState('all');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('spaceCampAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedGuest) {
        setSelectedGuest(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedGuest]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === SITE_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('spaceCampAuth', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="password-gate">
        <div className="password-container">
          <h1>🚀 Space Camp Bachelorette 🚀</h1>
          <p>Enter the password to access this private event page</p>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              placeholder="Enter password"
              className="password-input"
              autoFocus
            />
            <button type="submit" className="password-submit">
              Enter
            </button>
            {passwordError && <p className="password-error">Incorrect password. Try again!</p>}
          </form>
        </div>
      </div>
    );
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId !== 'all') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>{data.event.title}</h1>
        <div className="header-details">
          <p>{data.event.dates}</p>
          <p>{data.event.location}</p>
        </div>
      </header>

      <nav className="navigation">
        <div className="nav-container">
          <button
            className={`nav-button ${activeSection === 'all' ? 'active' : ''}`}
            onClick={() => scrollToSection('all')}
          >
            View All
          </button>
          <button
            className={`nav-button ${activeSection === 'space-camp' ? 'active' : ''}`}
            onClick={() => scrollToSection('space-camp')}
          >
            Space Camp
          </button>
          <button
            className={`nav-button ${activeSection === 'guests' ? 'active' : ''}`}
            onClick={() => scrollToSection('guests')}
          >
            Guest Directory
          </button>
          <button
            className={`nav-button ${activeSection === 'packing' ? 'active' : ''}`}
            onClick={() => scrollToSection('packing')}
          >
            Packing Guide
          </button>
          <button
            className={`nav-button ${activeSection === 'recommendations' ? 'active' : ''}`}
            onClick={() => scrollToSection('recommendations')}
          >
            Recommendations
          </button>
          <button
            className={`nav-button ${activeSection === 'expenses' ? 'active' : ''}`}
            onClick={() => scrollToSection('expenses')}
          >
            Expenses
          </button>
        </div>
      </nav>

      <main className="main-content">
        <section id="space-camp" className="section">
          <h2 className="section-title">About Space Camp</h2>
          <p style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: '#2d2d2d', fontWeight: '500', lineHeight: '1.6' }}>
            {data.spaceCamp.about}
          </p>

          <h3 className="section-subtitle">Schedule</h3>
          <div style={{ background: 'rgba(255, 110, 199, 0.1)', padding: '1rem', borderRadius: '15px', marginBottom: '1.5rem', borderLeft: '4px solid #FF6EC7' }}>
            <p style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#2d2d2d', fontWeight: '500' }}>
              <strong>Duration:</strong> {data.spaceCamp.schedule.duration}
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#2d2d2d', fontWeight: '500' }}>
              <strong>Check-In:</strong> {data.spaceCamp.schedule.checkIn}
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#2d2d2d', fontWeight: '500' }}>
              <strong>Graduation:</strong> {data.spaceCamp.schedule.graduation}
            </p>
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.95rem', color: '#555', fontStyle: 'italic', borderTop: '1px solid rgba(255, 110, 199, 0.3)', paddingTop: '0.75rem' }}>
              {data.spaceCamp.schedule.note}
            </p>
          </div>

          <h3 className="section-subtitle">What's Included</h3>
          <ul className="checklist">
            {data.spaceCamp.included.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="guests" className="section">
          <h2 className="section-title">Guest Directory</h2>
          <div className="guest-grid">
            {data.guests.map((guest, index) => (
              <div
                key={index}
                className={`guest-card ${guest.bio ? 'clickable' : ''}`}
                onClick={() => guest.bio && setSelectedGuest(guest)}
              >
                <div className="guest-name">{guest.name}</div>
                <div className="guest-role">{guest.role}</div>
                <div className="guest-info">
                  <strong>Earthling Base:</strong> {guest.travelingFrom}
                </div>
                {guest.bio && (
                  <button className="view-bio-btn">
                    View Bio ✨
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="packing" className="section">
          <h2 className="section-title">Packing Guide</h2>

          {data.packingGuide.weather && (
            <>
              <h3 className="section-subtitle">Weather Forecast</h3>
              <div style={{ background: 'rgba(100, 149, 237, 0.15)', padding: '1rem', borderRadius: '15px', marginBottom: '1.5rem', borderLeft: '4px solid #6495ED' }}>
                <p style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#2d2d2d', fontWeight: '500', lineHeight: '1.6' }}>
                  {data.packingGuide.weather.description}
                </p>
                {data.packingGuide.weather.forecast && (
                  <ul style={{ margin: '1rem 0', padding: '0 0 0 1.5rem', fontSize: '0.95rem', color: '#2d2d2d', lineHeight: '1.8' }}>
                    {data.packingGuide.weather.forecast.map((day, index) => (
                      <li key={index}>{day}</li>
                    ))}
                  </ul>
                )}
                <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.95rem', color: '#555', fontWeight: '600', borderTop: '1px solid rgba(100, 149, 237, 0.3)', paddingTop: '0.75rem' }}>
                  {data.packingGuide.weather.recommendation}
                </p>
              </div>
            </>
          )}

          <h3 className="section-subtitle">For Space Camp</h3>
          <ul className="checklist">
            {data.packingGuide.spaceCamp.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="section-subtitle">For Huntsville Activities</h3>
          <ul className="checklist">
            {data.packingGuide.huntsvilleActivities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="recommendations" className="section">
          <h2 className="section-title">Recommendations</h2>
          <p style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: '#2d2d2d', fontWeight: '500', lineHeight: '1.6' }}>
            Some sci-fi recommendations to get you ready for the weekend.
          </p>
          <div className="recommendations-grid">
            {data.recommendations.map((item, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-types">
                  {item.types.map((type, i) => (
                    <span key={i} className="recommendation-type">{type}</span>
                  ))}
                </div>
                <h3>{item.title}</h3>
                <div className="recommendation-meta">
                  {item.year && <span>{item.year}</span>}
                  {item.author && <span> by {item.author}</span>}
                </div>
                <div className="recommendation-why">{item.why}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="expenses" className="section">
          <h2 className="section-title">Expenses</h2>

          <div className="expense-card">
            <h3>Space Camp Tuition</h3>
            <div className="expense-amount">{data.expenses.spaceCampTuition.amount}</div>
            <p>{data.expenses.spaceCampTuition.description}</p>
          </div>

          <h3 className="section-subtitle">Additional Estimated Costs</h3>
          {data.expenses.additionalCosts.map((cost, index) => (
            <div key={index} className="expense-card">
              <h3>{cost.item}</h3>
              <div className="expense-amount">{cost.estimatedCost}</div>
              <p>{cost.notes}</p>
            </div>
          ))}

          <div className="total-estimate">
            Total Estimated Cost: {data.expenses.totalEstimate}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>See you in space, astronauts! </p>
        <p style={{ fontSize: '0.85rem' }}>Vibe Coded by Jas 💫</p>
      </footer>

      {selectedGuest && (
        <div className="modal-overlay" onClick={() => setSelectedGuest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedGuest(null)}>×</button>
            <div className="bio-card">
              <div className="bio-image-container">
                <img src={selectedGuest.bio.photo} alt={selectedGuest.name} className="bio-image" />
              </div>
              <div className="bio-info">
                <h2 className="bio-name">{selectedGuest.name}</h2>
                <div className="bio-location">Earthling Base: {selectedGuest.travelingFrom}</div>
                <ul className="bio-facts">
                  {selectedGuest.bio.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
