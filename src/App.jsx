import React, { useState } from 'react';
import { Home, User, Shield, MapPin, Search, ChevronRight, Bell, Trash2, ArrowLeft } from 'lucide-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, profile, privacy
  const [hasConsented, setHasConsented] = useState(false);
  const [consents, setConsents] = useState({
    location: true,
    marketing: true
  });
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);

  const handleToggle = (key) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveOnboardingConsent = () => {
    setHasConsented(true);
  };

  return (
    <div className="mobile-container">
      {/* Onboarding Consent Modal (DPDP Act Compliance) */}
      {!hasConsented && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Shield color="#fc8019" size={32} style={{ marginBottom: 16 }} />
            <h2 style={{ marginBottom: 8, fontSize: '1.25rem' }}>Your Privacy Matters</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.875rem' }}>
              Under India's new DPDP Act, we want to be transparent about how we use your data. Please review your preferences.
            </p>

            <div className="list-item">
              <div className="list-item-content" style={{ paddingRight: 16 }}>
                <h3>Location (Required)</h3>
                <p>Used to find nearby restaurants and deliver your food accurately.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={true} readOnly />
                <span className="slider"></span>
              </label>
            </div>

            <div className="list-item">
              <div className="list-item-content" style={{ paddingRight: 16 }}>
                <h3>Personalized Offers</h3>
                <p>We use your order history to show you targeted discounts and ads.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={consents.marketing} 
                  onChange={() => handleToggle('marketing')} 
                />
                <span className="slider"></span>
              </label>
            </div>

            <button className="btn-primary" onClick={saveOnboardingConsent}>
              Accept & Continue
            </button>
          </div>
        </div>
      )}

      {/* Main Views */}
      {currentView === 'home' && <HomeScreen />}
      {currentView === 'profile' && <ProfileScreen setView={setCurrentView} />}
      {currentView === 'privacy' && (
        <PrivacyHub 
          setView={setCurrentView} 
          consents={consents} 
          handleToggle={handleToggle}
          showDeletionConfirm={showDeletionConfirm}
          setShowDeletionConfirm={setShowDeletionConfirm}
        />
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div 
          className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          <Home size={24} />
          <span>Home</span>
        </div>
        <div 
          className={`nav-item ${currentView === 'profile' || currentView === 'privacy' ? 'active' : ''}`}
          onClick={() => setCurrentView('profile')}
        >
          <User size={24} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

// Sub-components
const HomeScreen = () => (
  <div style={{ paddingBottom: 80 }}>
    <div className="app-header" style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <MapPin color="#fc8019" />
        <div>
          <h1 style={{ fontSize: '1rem' }}>Indiranagar, Bangalore</h1>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Search color="var(--text-primary)" />
        <Bell color="var(--text-primary)" />
      </div>
    </div>
    
    <div className="home-screen">
      <h2 style={{ marginBottom: 16, fontSize: '1.25rem' }}>Top picks for you</h2>
      
      {/* Mock Restaurant Cards */}
      <div className="restaurant-card">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" alt="Pizza" className="restaurant-img" />
        <div className="restaurant-info">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Oven Story Pizza</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pizzas, Fast Food • 30 mins</p>
        </div>
      </div>
      
      <div className="restaurant-card">
        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80" alt="Pizza" className="restaurant-img" />
        <div className="restaurant-info">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Meghana Foods</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Biryani, South Indian • 40 mins</p>
        </div>
      </div>
    </div>
  </div>
);

const ProfileScreen = ({ setView }) => (
  <div>
    <div className="app-header">
      <h1>My Account</h1>
    </div>
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <User size={32} color="#94a3b8" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>Rohan</h2>
          <p style={{ color: 'var(--text-secondary)' }}>+91 9876543210</p>
        </div>
      </div>

      <div 
        className="list-item" 
        style={{ cursor: 'pointer' }}
        onClick={() => setView('privacy')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Shield color="#fc8019" />
          <div className="list-item-content">
            <h3>Privacy Hub</h3>
            <p>Manage your data & consent (DPDP Act)</p>
          </div>
        </div>
        <ChevronRight color="var(--text-secondary)" />
      </div>
    </div>
  </div>
);

const PrivacyHub = ({ setView, consents, handleToggle, showDeletionConfirm, setShowDeletionConfirm }) => (
  <div>
    <div className="app-header">
      <button className="back-btn" onClick={() => setView('profile')}>
        <ArrowLeft size={24} />
      </button>
      <h1>Privacy Hub</h1>
    </div>
    
    <div style={{ padding: 16 }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.875rem' }}>
        Control how we use your data. We ensure your choices are respected under the Digital Personal Data Protection Act.
      </p>

      <div style={{ background: '#fff9f5', border: '1px solid #fed7aa', padding: 16, borderRadius: 12, marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', color: '#ea580c', marginBottom: 8 }}>Active Consents</h3>
        
        <div className="list-item" style={{ borderBottom: 'none', padding: '8px 0' }}>
          <div className="list-item-content" style={{ paddingRight: 16 }}>
            <h4 style={{ fontSize: '0.9rem' }}>Location Services</h4>
            <p style={{ fontSize: '0.75rem' }}>Required for delivery</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={true} readOnly />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="list-item" style={{ borderBottom: 'none', padding: '8px 0' }}>
          <div className="list-item-content" style={{ paddingRight: 16 }}>
            <h4 style={{ fontSize: '0.9rem' }}>Personalized Offers</h4>
            <p style={{ fontSize: '0.75rem' }}>Targeted discounts & ads</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={consents.marketing} 
              onChange={() => handleToggle('marketing')} 
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', marginBottom: 16, marginTop: 32 }}>Data Rights</h3>
      
      <div 
        className="list-item" 
        style={{ cursor: 'pointer' }}
        onClick={() => setShowDeletionConfirm(true)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Trash2 color="var(--danger)" />
          <div className="list-item-content">
            <h3 style={{ color: 'var(--danger)' }}>Delete My Account & Data</h3>
            <p>Permanently erase all your personal data</p>
          </div>
        </div>
        <ChevronRight color="var(--text-secondary)" />
      </div>
    </div>

    {/* Deletion Confirmation Modal */}
    {showDeletionConfirm && (
      <div className="modal-overlay">
        <div className="modal-content" style={{ textAlign: 'center' }}>
          <Trash2 color="var(--danger)" size={48} style={{ margin: '0 auto 16px' }} />
          <h2 style={{ marginBottom: 16 }}>Are you sure?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            This will permanently delete your account, order history, and all personal data. This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <button 
              style={{ flex: 1, padding: 16, borderRadius: 12, border: '1px solid var(--border-color)', background: 'white', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setShowDeletionConfirm(false)}
            >
              Cancel
            </button>
            <button 
              style={{ flex: 1, padding: 16, borderRadius: 12, border: 'none', background: 'var(--danger)', color: 'white', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => {
                alert('Data deletion request submitted successfully.');
                setShowDeletionConfirm(false);
              }}
            >
              Delete Data
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default App;
