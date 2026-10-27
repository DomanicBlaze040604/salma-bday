import React, { useState } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const [bowClicks, setBowClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleBowClick = () => {
    sound.playPop();
    const next = bowClicks + 1;
    setBowClicks(next);

    if (next >= 5) {
      sound.playSparkle();
      setShowEasterEgg(true);
      setBowClicks(0);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#F7B8CC', '#D94868', '#FFF8F1']
        });
      } catch {}
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Do you want to reset all game scores, coupons, and discovered notes back to start?")) {
      sound.playPop();
      try {
        localStorage.removeItem('salma_opened_notes');
        localStorage.removeItem('salma_redeemed_coupons');
        localStorage.removeItem('salma_won_prize');
        localStorage.removeItem('salma_spins_left');
        localStorage.removeItem('salma_treasures_found');
        window.location.reload();
      } catch {}
    }
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, transparent 0%, #FCE4EC 60%, #F7B8CC 100%)',
      padding: '80px 20px 40px',
      textAlign: 'center',
      position: 'relative',
      marginTop: '60px'
    }}>
      {/* Clickable Easter Egg Ribbon Bow */}
      <div
        onClick={handleBowClick}
        title="Tap the bow for a secret!"
        style={{
          display: 'inline-block',
          fontSize: '2.5rem',
          cursor: 'pointer',
          marginBottom: '14px',
          userSelect: 'none',
          transition: 'transform 0.2s ease'
        }}
        className="animate-float"
      >
        🎀
      </div>

      <p className="font-serif" style={{
        fontSize: '1.4rem',
        color: 'var(--deep-plum)',
        marginBottom: '6px'
      }}>
        Salma’s 22nd Birthday Wonderland ♡
      </p>

      <p className="font-hand" style={{
        fontSize: '1.8rem',
        color: 'var(--cherry-red)',
        marginBottom: '16px'
      }}>
        Made with all my heart and prayers by Ammar
      </p>

      <p style={{
        fontSize: '0.85rem',
        color: 'var(--cocoa-brown)',
        maxWidth: '520px',
        margin: '0 auto 24px',
        lineHeight: 1.6
      }}>
        28 October 2026 • Our first birthday together, and InshaAllah, a lifetime of birthdays side by side.
      </p>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div style={{
          maxWidth: '380px',
          margin: '0 auto 24px',
          background: '#FFFFFF',
          padding: '18px 24px',
          borderRadius: '16px',
          border: '2px solid var(--cherry-red)',
          boxShadow: 'var(--shadow-polaroid)',
          animation: 'stampPop 0.4s ease-out'
        }}>
          <p style={{ fontSize: '1.6rem', marginBottom: '4px' }}>💋</p>
          <p style={{ color: 'var(--cherry-red)', fontWeight: 800, fontSize: '0.9rem' }}>
            Secret Easter Egg Discovered!
          </p>
          <p style={{ color: 'var(--cocoa-brown)', fontSize: '0.82rem', marginTop: '4px' }}>
            Ammar sends you 1,000 extra kisses and infinite love! ♡
          </p>
          <button
            onClick={() => setShowEasterEgg(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--dusty-rose)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              marginTop: '8px',
              textDecoration: 'underline'
            }}
          >
            Close secret note
          </button>
        </div>
      )}

      {/* Bottom Tools & Storage Notice */}
      <div style={{
        borderTop: '1px solid rgba(247, 184, 204, 0.6)',
        paddingTop: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.75rem',
        color: 'var(--cocoa-brown)'
      }}>
        <span>Progress is saved locally on this browser device.</span>
        <button
          onClick={handleResetProgress}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--cherry-red)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'underline'
          }}
        >
          <RotateCcw size={12} /> Reset all progress
        </button>
      </div>
    </footer>
  );
};
