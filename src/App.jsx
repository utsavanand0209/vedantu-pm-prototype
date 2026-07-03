import React, { useState, useEffect } from 'react';
import { Home, User, Shield, MapPin, Search, ChevronRight, Bell, Trash2, ArrowLeft, Star, Activity, CheckCircle2, ChevronDown, Lock } from 'lucide-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [hasConsented, setHasConsented] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [consents, setConsents] = useState({ location: true, marketing: true, analytics: false });
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleToggle = (key) => {
    setConsents(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (hasConsented) {
        showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} preference saved`);
      }
      return newState;
    });
  };

  return (
    <div className="mobile-container">
      {/* Toast Notification */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>
        <CheckCircle2 size={18} color="#4ade80" />
        {toast.message}
      </div>

      {/* Premium Onboarding Carousel */}
      {!hasConsented && (
        <div className="onboarding-container animate-in">
          {onboardingStep === 1 ? (
            <div className="onboarding-content">
              <div className="illustration-box">
                <div className="blob" style={{ width: 150, height: 150, top: 20, left: 20 }}></div>
                <div className="blob" style={{ width: 100, height: 100, bottom: 20, right: 20, background: '#f59e0b' }}></div>
                <Shield color="#fc8019" size={80} strokeWidth={1.5} style={{ zIndex: 1 }} />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>
                Your Privacy,<br />Your Control.
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 'auto' }}>
                Under India's DPDP Act, we are giving you complete control over how we use your data to personalize your Swiggy experience.
              </p>
              <button className="btn-primary" onClick={() => setOnboardingStep(2)}>
                Review Preferences
              </button>
            </div>
          ) : (
            <div className="onboarding-content animate-slide-right">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Data Preferences</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Choose how we personalize your experience.</p>
              
              <div style={{ flex: 1 }}>
                <div className="accordion-item" style={{ borderColor: 'var(--primary)', boxShadow: '0 0 0 1px var(--primary)' }}>
                  <div className="accordion-header">
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>Location (Required)</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Needed to deliver your food.</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={true} disabled />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-header">
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>Personalized Offers</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Get targeted restaurant discounts.</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={consents.marketing} onChange={() => handleToggle('marketing')} />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <button className="btn-primary" onClick={() => {
                setHasConsented(true);
                showToast("Welcome to Swiggy!");
              }}>
                Accept & Continue
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Views */}
      {currentView === 'home' && <HomeScreen />}
      {currentView === 'profile' && <ProfileScreen setView={setCurrentView} />}
      {currentView === 'privacy' && (
        <PrivacyDashboard 
          setView={setCurrentView} 
          consents={consents} 
          handleToggle={handleToggle}
          showDeletionConfirm={showDeletionConfirm}
          setShowDeletionConfirm={setShowDeletionConfirm}
          showToast={showToast}
        />
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className={`nav-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
          <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
          <span>Home</span>
        </div>
        <div className={`nav-item ${currentView === 'profile' || currentView === 'privacy' ? 'active' : ''}`} onClick={() => setCurrentView('profile')}>
          <User size={24} strokeWidth={currentView === 'profile' || currentView === 'privacy' ? 2.5 : 2} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

const HomeScreen = () => (
  <div className="animate-in" style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
    <div className="app-header" style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <MapPin color="#fc8019" size={20} />
        <div>
          <h1 style={{ fontSize: '1rem' }}>Indiranagar, Bangalore</h1>
        </div>
        <ChevronDown size={16} color="var(--text-muted)" />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="icon-btn"><Search size={22} /></button>
        <button className="icon-btn"><Bell size={22} /></button>
      </div>
    </div>
    
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16 }}>Top picks for you</h2>
      
      <div className="restaurant-scroll">
        <div className="rest-card">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80" alt="Pizza" className="rest-img" />
          <div className="rest-info">
            <h3 className="rest-title">Oven Story Pizza</h3>
            <div className="rest-meta">
              <Star size={14} color="#f59e0b" fill="#f59e0b" /> 4.2 • 30 mins
            </div>
          </div>
        </div>
        <div className="rest-card">
          <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80" alt="Biryani" className="rest-img" />
          <div className="rest-info">
            <h3 className="rest-title">Meghana Foods</h3>
            <div className="rest-meta">
              <Star size={14} color="#f59e0b" fill="#f59e0b" /> 4.5 • 40 mins
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '24px 0 16px' }}>What's on your mind?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: 'white', padding: 16, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '2rem' }}>🍔</div>
          <span style={{ fontWeight: 600 }}>Burgers</span>
        </div>
        <div style={{ background: 'white', padding: 16, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '2rem' }}>🥗</div>
          <span style={{ fontWeight: 600 }}>Healthy</span>
        </div>
        <div style={{ background: 'white', padding: 16, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '2rem' }}>🍰</div>
          <span style={{ fontWeight: 600 }}>Desserts</span>
        </div>
        <div style={{ background: 'white', padding: 16, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '2rem' }}>☕</div>
          <span style={{ fontWeight: 600 }}>Coffee</span>
        </div>
      </div>
    </div>
  </div>
);

const ProfileScreen = ({ setView }) => (
  <div className="animate-in" style={{ flex: 1 }}>
    <div className="app-header">
      <h1>My Account</h1>
    </div>
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, background: 'white', padding: 20, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <User size={32} color="var(--primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Rohan</h2>
          <p style={{ color: 'var(--text-muted)' }}>+91 9876543210</p>
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Settings</h3>
      
      <div className="menu-item" onClick={() => setView('privacy')}>
        <div style={{ background: 'var(--primary-light)', padding: 10, borderRadius: 12, marginRight: 16 }}>
          <Shield color="var(--primary)" size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Data Transparency & Privacy</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage DPDP consents</p>
        </div>
        <ChevronRight color="var(--text-muted)" size={20} />
      </div>
      
      <div className="menu-item">
        <div style={{ background: '#f1f5f9', padding: 10, borderRadius: 12, marginRight: 16 }}>
          <Lock color="#64748b" size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>Account Security</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Passwords, 2FA</p>
        </div>
        <ChevronRight color="var(--text-muted)" size={20} />
      </div>
    </div>
  </div>
);

const PrivacyDashboard = ({ setView, consents, handleToggle, showDeletionConfirm, setShowDeletionConfirm, showToast }) => {
  const activeCount = Object.values(consents).filter(Boolean).length;
  
  return (
    <div className="animate-in" style={{ flex: 1, overflowY: 'auto' }}>
      <div className="app-header">
        <button className="icon-btn" onClick={() => setView('profile')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Data Transparency Hub</h1>
      </div>
      
      <div style={{ padding: 20 }}>
        {/* Dashboard Metrics */}
        <div className="dash-card">
          <div className="stat-row">
            <div className="stat-item">
              <span className="stat-value">{activeCount}</span>
              <span className="stat-label">Active Consents</span>
            </div>
            <div className="stat-item" style={{ textAlign: 'right' }}>
              <span className="stat-value" style={{ color: 'var(--success)' }}>100%</span>
              <span className="stat-label">DPDP Compliant</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px', background: '#f8fafc', borderRadius: 8 }}>
            <Activity size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Your data is encrypted and never sold.</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, marginTop: 24 }}>Manage Preferences</h3>
        
        <div className="accordion-item">
          <div className="accordion-header">
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Location Services</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Required for core functionality</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={true} disabled />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        
        <div className="accordion-item">
          <div className="accordion-header">
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Personalized Marketing</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tailored discounts & ads</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={consents.marketing} onChange={() => handleToggle('marketing')} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="accordion-item">
          <div className="accordion-header">
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Analytics & Diagnostics</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Help us improve the app</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={consents.analytics} onChange={() => handleToggle('analytics')} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, marginTop: 32 }}>Data Rights</h3>
        
        <div className="menu-item" onClick={() => setShowDeletionConfirm(true)} style={{ border: '1px solid #fee2e2' }}>
          <div style={{ background: '#fee2e2', padding: 10, borderRadius: 12, marginRight: 16 }}>
            <Trash2 color="var(--danger)" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--danger)' }}>Right to Erasure</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Permanently delete account & data</p>
          </div>
          <ChevronRight color="var(--text-muted)" size={20} />
        </div>
      </div>

      {/* Premium Bottom Sheet Confirmation */}
      {showDeletionConfirm && (
        <div className="bottom-sheet-overlay" onClick={(e) => { if (e.target.className === 'bottom-sheet-overlay') setShowDeletionConfirm(false); }}>
          <div className="bottom-sheet">
            <div style={{ width: 40, height: 4, background: '#cbd5e1', borderRadius: 4, margin: '0 auto 24px' }}></div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ background: '#fee2e2', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Trash2 color="var(--danger)" size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 4 }}>Delete all personal data?</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Under DPDP Act Section 12, you have the right to erasure. This will permanently remove your account, order history, and saved addresses. This action cannot be undone.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn-danger" onClick={() => {
                showToast('Data deletion request submitted (30 days processing)');
                setShowDeletionConfirm(false);
                setView('home');
              }}>
                Confirm Erasure
              </button>
              <button className="btn-secondary" onClick={() => setShowDeletionConfirm(false)}>
                Keep My Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
