import React from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { Heart, Sparkles, ArrowDown } from 'lucide-react';

interface GrandRevealProps {
  onScrollNext: () => void;
  onTreasureFound?: (id: number) => void;
  isTreasureFound?: boolean;
}

export const GrandReveal: React.FC<GrandRevealProps> = ({
  onScrollNext,
  onTreasureFound,
  isTreasureFound
}) => {
  const triggerConfetti = () => {
    sound.playSparkle();
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#FFF8F1', '#E5A93C']
      });
    } catch {}
  };

  const handleTreasureClick = () => {
    if (!isTreasureFound && onTreasureFound) {
      sound.playWin();
      onTreasureFound(1);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#E5A93C', '#FFF8F1', '#D94868']
        });
      } catch {}
    }
  };

  return (
    <section id="polaroid-reveal" style={{
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textAlign: 'center',
      paddingTop: '60px',
      paddingBottom: '60px'
    }}>
      {/* Decorative Washi Tape & Bow Header */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--soft-blush)',
        color: 'var(--cherry-red)',
        padding: '6px 18px',
        borderRadius: '999px',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        boxShadow: 'var(--shadow-soft)',
        marginBottom: '16px'
      }}>
        <Sparkles size={16} />
        CHAPTER 2 • CELEBRATING SALMA
        <Sparkles size={16} />
      </div>

      <h1 className="font-serif" style={{
        fontSize: 'clamp(2.1rem, 5.5vw, 3.8rem)',
        color: 'var(--cherry-red)',
        letterSpacing: '1px',
        lineHeight: 1.15,
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        IT’S YOUR WORLD TODAY, SALMA ♡
      </h1>

      <p className="font-serif" style={{
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        color: 'var(--deep-plum)',
        fontStyle: 'italic',
        marginBottom: '28px'
      }}>
        Happy 22nd Birthday, My Sweetheart!
      </p>

      {/* The Grand Oversized Polaroid Frame */}
      <div style={{
        position: 'relative',
        maxWidth: '380px',
        width: '100%',
        margin: '0 auto 30px'
      }}>
        {/* Washi Tape Header */}
        <div className="washi-tape" />

        {/* Polaroid Card */}
        <div className="polaroid-frame" style={{ transform: 'rotate(-1.5deg)' }}>
          <div style={{
            width: '100%',
            aspectRatio: '3/4',
            overflow: 'hidden',
            borderRadius: '2px',
            backgroundColor: '#F7B8CC',
            position: 'relative'
          }}>
            <img
              src="photos/IMG_7628.jpg"
              alt="Salma in a beautiful floral dress smiling warmly"
              loading="eager"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                // Fallback to original path if needed
                (e.target as HTMLImageElement).src = 'Salma photos/IMG_7628.JPG';
              }}
            />
          </div>

          <p className="font-hand" style={{
            fontSize: '1.9rem',
            color: 'var(--deep-plum)',
            marginTop: '16px',
            marginBottom: '4px'
          }}>
            Salma, my sweetheart ♡
          </p>

          <p style={{
            fontSize: '0.8rem',
            color: 'var(--cocoa-brown)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            28 October 2026 • 22 Years of Wonder
          </p>
        </div>

        {/* Hidden Treasure #1 Sticker: Clickable Golden Heart */}
        <div
          onClick={handleTreasureClick}
          title={isTreasureFound ? "Treasure #1 Found! ✨" : "Click to inspect this shiny sticker!"}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '-16px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: isTreasureFound ? 'linear-gradient(135deg, #E5A93C, #F6D06D)' : 'white',
            border: '2px solid #E5A93C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(229, 169, 60, 0.4)',
            transform: 'rotate(15deg)',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
        >
          <Heart size={22} color={isTreasureFound ? "#FFFFFF" : "#E5A93C"} fill={isTreasureFound ? "#FFFFFF" : "none"} />
        </div>
      </div>

      {/* Handwritten Signature */}
      <p className="font-hand" style={{
        fontSize: '1.8rem',
        color: 'var(--cocoa-brown)',
        marginBottom: '26px'
      }}>
        made with all my love, Ammar ♡
      </p>

      {/* Call to action button */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => {
            triggerConfetti();
            onScrollNext();
          }}
          className="btn-primary"
          style={{ fontSize: '1.05rem', padding: '14px 34px' }}
        >
          ENTER MY LITTLE UNIVERSE <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
};
