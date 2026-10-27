import React, { useState } from 'react';
import { TREASURE_CLUES } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Compass, Key, Lock, Unlock, Sparkles, HelpCircle, Heart } from 'lucide-react';

interface TreasureHuntProps {
  foundTreasures: number[];
}

export const TreasureHunt: React.FC<TreasureHuntProps> = ({ foundTreasures }) => {
  const [showHints, setShowHints] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const isAllFound = foundTreasures.length >= 3;

  const handleOpenVault = () => {
    sound.playWin();
    setIsVaultOpen(true);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#E5A93C', '#FFF8F1']
      });
    } catch {}
  };

  return (
    <section id="treasure" style={{ position: 'relative' }}>
      {/* Chapter Marker */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{
          background: 'var(--soft-blush)',
          color: 'var(--cherry-red)',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Compass size={16} /> CHAPTER 9 • THE BIRTHDAY TREASURE HUNT
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          Find the 3 Hidden Hearts of Love 🗺️
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          Ammar hid three golden heart icons across the chapters of this website.
          Collect all three to unlock the Secret Birthday Vault!
        </p>
      </div>

      {/* Treasure Hunt Progress Tracker Card */}
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '28px 24px',
        boxShadow: 'var(--shadow-polaroid)',
        border: '2px solid var(--strawberry-pink)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="washi-tape" />

        {/* 3 Treasure Slots */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
          margin: '16px 0 24px'
        }}>
          {TREASURE_CLUES.map((clue) => {
            const isFound = foundTreasures.includes(clue.id);

            return (
              <div
                key={clue.id}
                style={{
                  background: isFound ? 'linear-gradient(135deg, #FFF8F1 0%, #FCE4EC 100%)' : '#F9F9F9',
                  border: isFound ? '2px solid #E5A93C' : '2px dashed #D1C4E9',
                  borderRadius: '16px',
                  padding: '16px 10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isFound ? '0 6px 18px rgba(229, 169, 60, 0.25)' : 'none'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '6px',
                  transform: isFound ? 'scale(1.15)' : 'scale(0.9)',
                  filter: isFound ? 'drop-shadow(0 0 6px #E5A93C)' : 'grayscale(1)',
                  transition: 'all 0.3s ease'
                }}>
                  {isFound ? (clue.id === 1 ? '💛' : clue.id === 2 ? '🕹️' : '🔑') : '🔒'}
                </div>
                <p style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: isFound ? 'var(--cherry-red)' : 'var(--dusty-rose)',
                  textTransform: 'uppercase'
                }}>
                  Heart #{clue.id}
                </p>
                <p style={{
                  fontSize: '0.72rem',
                  color: isFound ? '#2E7D32' : '#888',
                  fontWeight: 700,
                  marginTop: '4px'
                }}>
                  {isFound ? 'Discovered!' : 'Hidden'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Vault Unlock CTA */}
        {isAllFound ? (
          <div style={{ animation: 'stampPop 0.5s ease-out' }}>
            <p style={{ color: '#2E7D32', fontWeight: 800, fontSize: '1rem', marginBottom: '14px' }}>
              🎉 All 3 secret treasures found! The Birthday Vault is unlocked!
            </p>
            <button
              onClick={handleOpenVault}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #E5A93C, #D94868)',
                padding: '14px 34px',
                fontSize: '1rem'
              }}
            >
              <Unlock size={18} /> OPEN THE SECRET BIRTHDAY VAULT 🎁
            </button>
          </div>
        ) : (
          <div>
            <p style={{ color: 'var(--cocoa-brown)', fontSize: '0.9rem', marginBottom: '12px' }}>
              {foundTreasures.length} of 3 treasures found. Scroll up and down to spot the hidden golden heart badges!
            </p>
            <button
              onClick={() => {
                sound.playPop();
                setShowHints(!showHints);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--cherry-red)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'underline'
              }}
            >
              <HelpCircle size={14} /> {showHints ? 'Hide clues' : 'Need clues for where to look?'}
            </button>
          </div>
        )}

        {/* Hints Expandable */}
        {showHints && !isAllFound && (
          <div style={{
            marginTop: '16px',
            textAlign: 'left',
            background: 'var(--soft-blush)',
            padding: '14px 18px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            color: 'var(--deep-plum)',
            lineHeight: 1.6
          }}>
            <p style={{ fontWeight: 800, color: 'var(--cherry-red)', marginBottom: '6px' }}>
              Treasure Hints for Salma:
            </p>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Heart #1:</strong> Check near the corner of the Grand Polaroid in Chapter 2.</li>
              <li><strong>Heart #2:</strong> Look at the top corner of the Retro Arcade Cabinet in Chapter 5.</li>
              <li><strong>Heart #3:</strong> Check the counter bar inside the Boyfriend Bank in Chapter 6.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Secret Vault Opened Modal */}
      {isVaultOpen && (
        <div
          onClick={() => setIsVaultOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(72, 37, 59, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px 28px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-polaroid)',
              border: '3px solid #E5A93C',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div className="washi-tape" />

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E5A93C, #F7B8CC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 6px 18px rgba(229, 169, 60, 0.4)'
            }}>
              <Unlock size={32} color="#FFF" />
            </div>

            <span style={{
              fontSize: '0.8rem',
              color: '#E5A93C',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              The Secret Birthday Vault
            </span>

            <h3 className="font-serif" style={{
              fontSize: '1.7rem',
              color: 'var(--deep-plum)',
              margin: '8px 0 14px'
            }}>
              Salma's Master Key to Ammar's Heart ♡
            </h3>

            <p style={{
              color: 'var(--cocoa-brown)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              “You solved every clue, explored every corner, and unlocked every piece of this wonderland.
              There is nothing in this world I wouldn't do to make you smile. You have my heart today, tomorrow, and forever.”
            </p>

            <button
              onClick={() => setIsVaultOpen(false)}
              className="btn-primary"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #E5A93C, #D94868)'
              }}
            >
              Keep In My Heart Forever ♡
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
