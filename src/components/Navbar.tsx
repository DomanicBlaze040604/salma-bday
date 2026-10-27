import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Heart, Menu, X, ArrowUp } from 'lucide-react';

interface NavbarProps {
  progressStats: {
    notesRead: number;
    couponsRedeemed: number;
    treasuresFound: number;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ progressStats }) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const isPlaying = sound.toggleBgm();
    setIsMuted(!isPlaying);
  };

  const scrollToSection = (id: string) => {
    sound.playPop();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'polaroid-reveal', label: 'Grand Reveal' },
    { id: 'scrapbook', label: 'Scrapbook' },
    { id: 'reasons', label: '22 Reasons' },
    { id: 'arcade', label: 'Arcade 🎮' },
    { id: 'coupons', label: 'Bank of Love 🎟️' },
    { id: 'wheel', label: 'Surprise Wheel 🎡' },
    { id: 'scratch', label: 'Scratch Card ✨' },
    { id: 'treasure', label: 'Treasure Hunt 🗺️' },
    { id: 'letter', label: 'Love Letter 💌' },
    { id: 'garden', label: 'Flower Garden 🌸' },
    { id: 'climax', label: 'Final Gift 🎁' },
  ];

  return (
    <>
      {/* Floating Header Bar */}
      <header style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '1100px',
        background: 'rgba(255, 248, 241, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(247, 184, 204, 0.6)',
        borderRadius: '999px',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9000,
        boxShadow: 'var(--shadow-soft)'
      }}>
        {/* Logo / Title */}
        <div
          onClick={() => scrollToSection('polaroid-reveal')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            userSelect: 'none'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🌸</span>
          <span className="font-serif" style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--cherry-red)'
          }}>
            Salma's 22nd
          </span>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '16px'
        }}
        className="desktop-nav"
        >
          {navLinks.slice(0, 6).map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--deep-plum)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Tools: Adventure Progress Badge + Sound Toggle + Mobile Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Adventure Progress Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--soft-blush)',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--cherry-red)'
          }}>
            <Heart size={13} fill="var(--cherry-red)" />
            <span>{progressStats.notesRead + progressStats.couponsRedeemed + progressStats.treasuresFound}/37</span>
          </div>

          {/* Sound Toggle (Off by default as required) */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Turn on romantic background music" : "Mute background music"}
            style={{
              background: isMuted ? 'white' : 'var(--cherry-red)',
              color: isMuted ? 'var(--cocoa-brown)' : 'white',
              border: '1px solid var(--strawberry-pink)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--deep-plum)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '12px',
          right: '12px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '20px',
          border: '1px solid var(--strawberry-pink)',
          boxShadow: 'var(--shadow-polaroid)',
          zIndex: 8999,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px'
        }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: 'var(--soft-blush)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 14px',
                textAlign: 'left',
                color: 'var(--deep-plum)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Floating Back to Top Heart Button */}
      <button
        onClick={() => {
          sound.playPop();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        title="Fly back to top ♡"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #F7B8CC, #D94868)',
          color: 'white',
          border: '2px solid #FFFFFF',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(217, 72, 104, 0.4)',
          cursor: 'pointer',
          zIndex: 8000,
          transition: 'transform 0.2s ease'
        }}
      >
        <ArrowUp size={20} />
      </button>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
