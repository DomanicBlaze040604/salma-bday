import React, { useState, useRef } from 'react';
import { PERSONAL_DETAILS } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Flower2, Sparkles, RotateCcw } from 'lucide-react';

interface BloomedFlower {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}

export const FlowerGarden: React.FC = () => {
  const [flowers, setFlowers] = useState<BloomedFlower[]>([]);
  const [isQuoteUnlocked, setIsQuoteUnlocked] = useState(false);
  const gardenRef = useRef<HTMLDivElement>(null);

  const flowerEmojis = ['🌸', '🌷', '🌹', '🌺', '🌼', '💐', '🌻', '🪻'];

  const handleGardenClick = (clientX: number, clientY: number) => {
    if (!gardenRef.current) return;
    const rect = gardenRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    sound.playSparkle();

    const newFlower: BloomedFlower = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      size: Math.floor(Math.random() * 14) + 26,
      rotation: Math.floor(Math.random() * 40) - 20
    };

    setFlowers(prev => {
      const updated = [...prev, newFlower];
      if (updated.length >= 15 && !isQuoteUnlocked) {
        setIsQuoteUnlocked(true);
        sound.playWin();
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F7B8CC', '#D94868', '#FFF8F1']
          });
        } catch {}
      }
      return updated;
    });
  };

  const clearGarden = () => {
    sound.playPop();
    setFlowers([]);
    setIsQuoteUnlocked(false);
  };

  return (
    <section id="garden" style={{ position: 'relative' }}>
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
          <Flower2 size={16} /> CHAPTER 11 • FLOWERS THAT BLOOM FOR HER
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 24px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          A Garden Bloomed by Your Touch 🌸
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          Tap or click anywhere inside the meadow below to plant blooming flowers for your birthday.
          Keep tapping to grow a whole bouquet of blessings!
        </p>
      </div>

      {/* Interactive Meadow Container */}
      <div
        ref={gardenRef}
        onClick={(e) => handleGardenClick(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            handleGardenClick(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        style={{
          maxWidth: '820px',
          height: '380px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, #FFF8F1 0%, #F5FBEF 70%, #E8F5E9 100%)',
          borderRadius: '24px',
          border: '2px solid rgba(247, 184, 204, 0.7)',
          boxShadow: 'var(--shadow-polaroid)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          touchAction: 'none'
        }}
      >
        {/* Soft firefly animations */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-float"
              style={{
                position: 'absolute',
                top: `${(i * 20 + 10) % 90}%`,
                left: `${(i * 25 + 5) % 90}%`,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#E5A93C',
                boxShadow: '0 0 10px #E5A93C',
                opacity: 0.6,
                animationDelay: `${i * 0.7}s`
              }}
            />
          ))}
        </div>

        {/* Empty state prompt */}
        {flowers.length === 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--dusty-rose)',
            fontSize: '1rem',
            fontFamily: 'var(--font-hand)',
            pointerEvents: 'none'
          }}>
            Tap anywhere to make a flower bloom ♡
          </div>
        )}

        {/* Bloomed Flowers */}
        {flowers.map(flower => (
          <div
            key={flower.id}
            style={{
              position: 'absolute',
              left: `${flower.x}px`,
              top: `${flower.y}px`,
              transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`,
              fontSize: `${flower.size}px`,
              animation: 'stampPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))'
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      {/* Flower Counter and Controls */}
      <div style={{
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--cocoa-brown)', fontWeight: 700 }}>
          {flowers.length} Flowers Bloomed 🌸
        </span>

        {flowers.length > 0 && (
          <button
            onClick={clearGarden}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--dusty-rose)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline'
            }}
          >
            <RotateCcw size={14} /> Clear Meadow
          </button>
        )}
      </div>

      {/* Unlocked Garden Quote Banner */}
      {isQuoteUnlocked && (
        <div style={{
          maxWidth: '680px',
          margin: '26px auto 0',
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px 28px',
          border: '2px solid var(--cherry-red)',
          boxShadow: 'var(--shadow-polaroid)',
          textAlign: 'center',
          animation: 'stampPop 0.5s ease-out'
        }}>
          <p className="font-serif" style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            color: 'var(--cherry-red)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            marginBottom: '8px'
          }}>
            “{PERSONAL_DETAILS.gardenMessage}”
          </p>
          <p className="font-hand" style={{ fontSize: '1.6rem', color: 'var(--deep-plum)' }}>
            With endless love, Ammar ♡
          </p>
        </div>
      )}
    </section>
  );
};
