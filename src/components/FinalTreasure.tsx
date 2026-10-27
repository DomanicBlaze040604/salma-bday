import React, { useState } from 'react';
import { PERSONAL_DETAILS } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, RotateCcw, ArrowUp } from 'lucide-react';

interface FinalTreasureProps {
  onRevisitScrapbook: () => void;
  onReplayReveal: () => void;
}

export const FinalTreasure: React.FC<FinalTreasureProps> = ({
  onRevisitScrapbook,
  onReplayReveal
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    sound.playWin();
    setIsOpen(true);

    try {
      // Big cinematic burst of hearts & confetti
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#E5A93C', '#FFF8F1', '#C9859C']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#F7B8CC', '#D94868']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#F7B8CC', '#D94868']
        });
      }, 500);
    } catch {}
  };

  return (
    <section id="climax" style={{ position: 'relative', textAlign: 'center' }}>
      {/* Chapter Marker */}
      <div style={{ marginBottom: '16px' }}>
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
          <Gift size={16} /> CHAPTER 12 • THE FINAL BIRTHDAY TREASURE
        </span>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          The Climax Surprise 🎁
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          One last present packed with all the love, prayers, and devotion in Ammar's heart.
        </p>
      </div>

      {!isOpen ? (
        /* The Sealed Ribbon Gift Box */
        <div style={{
          maxWidth: '380px',
          margin: '20px auto 40px',
          perspective: '1000px'
        }}>
          <div
            onClick={handleOpenGift}
            role="button"
            tabIndex={0}
            className="animate-pulse-glow"
            style={{
              background: 'linear-gradient(145deg, #FCE4EC 0%, #F7B8CC 100%)',
              borderRadius: '24px',
              padding: '48px 24px',
              border: '3px solid #FFFFFF',
              boxShadow: 'var(--shadow-polaroid)',
              cursor: 'pointer',
              position: 'relative',
              textAlign: 'center',
              userSelect: 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Satin Cross Ribbon Graphics */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '32px',
              background: 'linear-gradient(180deg, #D94868, #B32E4B)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }} />
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '32px',
              background: 'linear-gradient(90deg, #D94868, #B32E4B)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }} />

            {/* Ribbon Bow / Heart Wax Seal on Center */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFF8F1, #FFFFFF)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(217, 72, 104, 0.4)',
              border: '3px solid #D94868'
            }}>
              <Heart size={36} color="var(--cherry-red)" fill="var(--cherry-red)" />
            </div>

            <p className="font-hand" style={{
              position: 'relative',
              zIndex: 10,
              fontSize: '2rem',
              color: 'var(--deep-plum)',
              marginTop: '28px',
              marginBottom: '4px'
            }}>
              To Salma, My World ♡
            </p>

            <span style={{
              position: 'relative',
              zIndex: 10,
              fontSize: '0.85rem',
              color: 'var(--cherry-red)',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              background: '#FFFFFF',
              padding: '4px 14px',
              borderRadius: '999px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              Tap to open your final gift ✨
            </span>
          </div>
        </div>
      ) : (
        /* The Opened Climax Experience */
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: 'clamp(28px, 6vw, 48px)',
          boxShadow: 'var(--shadow-polaroid)',
          border: '2px solid var(--strawberry-pink)',
          position: 'relative',
          animation: 'stampPop 0.6s ease-out'
        }}>
          <div className="washi-tape" />

          {/* Climax Letter Header */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              fontSize: '0.8rem',
              background: 'var(--soft-blush)',
              color: 'var(--cherry-red)',
              padding: '4px 14px',
              borderRadius: '999px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Our First Birthday Together • 28 October 2026
            </span>
          </div>

          {/* Verbatim Climax Message */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 2.8vw, 1.35rem)',
            color: 'var(--deep-plum)',
            lineHeight: 1.85,
            textAlign: 'left',
            whiteSpace: 'pre-line',
            marginBottom: '34px',
            fontStyle: 'italic'
          }}>
            {PERSONAL_DETAILS.climaxMessage}
          </div>

          {/* Featured Climax Photo: Love Lock Wall (IMG_7610.jpg) */}
          <div style={{
            maxWidth: '380px',
            margin: '0 auto 34px'
          }}>
            <div className="polaroid-frame" style={{ transform: 'rotate(1deg)' }}>
              <div style={{
                borderRadius: '3px',
                overflow: 'hidden',
                aspectRatio: '3/4'
              }}>
                <img
                  src="photos/IMG_7610.jpg"
                  alt="Salma sitting near the love locks wall"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'Salma photos/IMG_7610.JPG';
                  }}
                />
              </div>
              <p className="font-hand" style={{
                fontSize: '1.8rem',
                color: 'var(--deep-plum)',
                marginTop: '14px',
                marginBottom: '4px'
              }}>
                “one of my favourite views in the world ♡”
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--dusty-rose)', fontWeight: 600 }}>
                Locked in my heart forever & always
              </p>
            </div>
          </div>

          {/* Emotional Climax Tagline */}
          <div style={{
            borderTop: '1px solid rgba(247, 184, 204, 0.6)',
            paddingTop: '24px',
            marginBottom: '32px'
          }}>
            <div className="animate-float" style={{ fontSize: '2.4rem', color: 'var(--cherry-red)', marginBottom: '8px' }}>
              💗
            </div>
            <p className="font-serif" style={{
              fontSize: 'clamp(1.3rem, 3.2vw, 1.8rem)',
              color: 'var(--cherry-red)',
              fontWeight: 700
            }}>
              to my favourite girl in every universe ♡
            </p>
          </div>

          {/* Navigation & Replay Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onRevisitScrapbook}
              className="btn-secondary"
              style={{ padding: '10px 22px', fontSize: '0.9rem' }}
            >
              Revisit Scrapbook 📸
            </button>
            <button
              onClick={onReplayReveal}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.9rem' }}
            >
              <RotateCcw size={16} /> Replay Birthday Reveal 🎂
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
