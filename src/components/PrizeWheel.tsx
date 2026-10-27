import React, { useState, useEffect, useRef } from 'react';
import { PRIZE_WHEEL_ITEMS, PrizeItem } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

export const PrizeWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(() => {
    try {
      const saved = localStorage.getItem('salma_won_prize');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [spinsLeft, setSpinsLeft] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('salma_spins_left');
      return saved !== null ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const totalSegments = PRIZE_WHEEL_ITEMS.length;
  const segmentAngle = 360 / totalSegments;

  useEffect(() => {
    try {
      if (wonPrize) localStorage.setItem('salma_won_prize', JSON.stringify(wonPrize));
      localStorage.setItem('salma_spins_left', spinsLeft.toString());
    } catch {}
  }, [wonPrize, spinsLeft]);

  // Draw Wheel on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 12;

    ctx.clearRect(0, 0, size, center);

    PRIZE_WHEEL_ITEMS.forEach((item, index) => {
      const startAngle = (index * segmentAngle * Math.PI) / 180;
      const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;

      // Slice
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Label text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + (segmentAngle * Math.PI) / 360);
      ctx.textAlign = 'right';
      ctx.fillStyle = item.color === '#FFF8F1' ? '#48253B' : '#FFFFFF';
      ctx.font = 'bold 12px Nunito, sans-serif';
      ctx.fillText(item.label, radius - 20, 4);
      ctx.restore();
    });

    // Center Gold Pin
    ctx.beginPath();
    ctx.arc(center, center, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#E5A93C';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('♡', center, center + 5);
  }, []);

  const handleSpin = () => {
    if (isSpinning || spinsLeft <= 0) return;

    sound.playTick();
    setIsSpinning(true);
    setWonPrize(null);

    // Pick genuine random winning item
    const winningIndex = Math.floor(Math.random() * totalSegments);
    const selectedItem = PRIZE_WHEEL_ITEMS[winningIndex];

    // Compute final angle so pointer at top (270 degrees) lands on slice
    // Pointer is at top (270°). Slices start at 0 (right).
    // Center of winning segment is at winningIndex * segmentAngle + segmentAngle / 2.
    // Target rotation = 360 * rotations + (270 - centerOfWinningSegment)
    const extraRotations = 5 * 360;
    const segmentCenter = winningIndex * segmentAngle + segmentAngle / 2;
    const targetDeg = currentRotation + extraRotations + (270 - (currentRotation % 360) - segmentCenter);

    setCurrentRotation(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedItem);
      setSpinsLeft(prev => prev - 1);
      sound.playWin();

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F7B8CC', '#D94868', '#E5A93C', '#FFF8F1']
        });
      } catch {}
    }, 4500);
  };

  const resetSpins = () => {
    sound.playPop();
    setSpinsLeft(3);
    setWonPrize(null);
  };

  return (
    <section id="wheel" style={{ position: 'relative' }}>
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
          <Sparkles size={16} /> CHAPTER 7 • SPIN FOR A SURPRISE
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          Spin Salma's Birthday Wheel 🎡
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          Every single slice holds a guaranteed real surprise from Ammar.
          Spin the wheel and claim today's bonus birthday reward!
        </p>
      </div>

      {/* Wheel Container */}
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Top Pointer Arrow */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '16px solid transparent',
          borderRight: '16px solid transparent',
          borderTop: '28px solid #D94868',
          zIndex: 20,
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))'
        }} />

        {/* Wheel Outer Rim */}
        <div style={{
          width: '320px',
          height: '320px',
          margin: '0 auto',
          borderRadius: '50%',
          padding: '8px',
          background: 'linear-gradient(135deg, #FFF8F1, #F7B8CC)',
          boxShadow: 'var(--shadow-polaroid)',
          border: '4px solid #FFFFFF'
        }}>
          <canvas
            ref={canvasRef}
            width={304}
            height={304}
            style={{
              borderRadius: '50%',
              transform: `rotate(${currentRotation}deg)`,
              transition: isSpinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}
          />
        </div>

        {/* Spin Controls */}
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={handleSpin}
            disabled={isSpinning || spinsLeft <= 0}
            className="btn-primary"
            style={{
              padding: '14px 38px',
              fontSize: '1.05rem',
              opacity: spinsLeft <= 0 ? 0.6 : 1,
              cursor: spinsLeft <= 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {isSpinning ? 'Spinning with love...' : (spinsLeft > 0 ? `SPIN THE WHEEL! (${spinsLeft} left) 🎡` : 'No spins left')}
          </button>

          {spinsLeft <= 0 && (
            <div style={{ marginTop: '12px' }}>
              <button
                onClick={resetSpins}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--cocoa-brown)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'underline'
                }}
              >
                <RotateCcw size={14} /> Add 3 more bonus spins
              </button>
            </div>
          )}
        </div>

        {/* Revealed Won Prize Modal / Card */}
        {wonPrize && (
          <div style={{
            marginTop: '28px',
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '2px solid var(--strawberry-pink)',
            boxShadow: 'var(--shadow-polaroid)',
            animation: 'stampPop 0.4s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
              {wonPrize.icon}
            </div>
            <span style={{
              fontSize: '0.78rem',
              background: 'var(--soft-blush)',
              color: 'var(--cherry-red)',
              padding: '4px 12px',
              borderRadius: '999px',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}>
              Prize Unlocked!
            </span>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--deep-plum)', margin: '10px 0 6px' }}>
              {wonPrize.rewardTitle}
            </h3>
            <p style={{ color: 'var(--cocoa-brown)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {wonPrize.rewardDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
