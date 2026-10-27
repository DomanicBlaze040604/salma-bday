import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, RotateCcw } from 'lucide-react';

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 340;
    canvas.height = 240;

    // Draw cute scratch layer: Pink with sparkles & pattern
    ctx.globalCompositeOperation = 'source-over';
    
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#F7B8CC');
    grad.addColorStop(0.5, '#FCE4EC');
    grad.addColorStop(1, '#C9859C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative glitter pattern
    ctx.fillStyle = 'rgba(217, 72, 104, 0.2)';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        (i * 37) % canvas.width,
        (i * 43) % canvas.height,
        (i % 4) + 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Cover Text
    ctx.fillStyle = '#48253B';
    ctx.font = 'bold 16px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH ME! ✨', canvas.width / 2, canvas.height / 2 - 10);

    ctx.fillStyle = '#D94868';
    ctx.font = '13px "Nunito", sans-serif';
    ctx.fillText('There’s a little secret underneath… ♡', canvas.width / 2, canvas.height / 2 + 18);

    setIsRevealed(false);
    setPercentScratched(0);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    sound.playPop();

    // Check scratched percentage throttled
    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentCount = 0;

      // Sample every 16th pixel for performance
      const stride = 16 * 4;
      for (let i = 3; i < pixels.length; i += stride) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const totalSampled = pixels.length / stride;
      const pct = Math.round((transparentCount / totalSampled) * 100);
      setPercentScratched(pct);

      if (pct >= 45 && !isRevealed) {
        handleFullReveal();
      }
    } catch {
      // In case of security/taint issues
    }
  };

  const handleFullReveal = () => {
    setIsRevealed(true);
    setPercentScratched(100);
    sound.playWin();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#FFF8F1', '#E5A93C']
      });
    } catch {}
  };

  return (
    <section id="scratch" style={{ position: 'relative' }}>
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
          <Sparkles size={16} /> CHAPTER 8 • SCRATCH TO REVEAL
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          A Secret Underneath The Glitter ✨
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          Use your finger or mouse to scratch away the pink glitter surface and uncover a hidden surprise.
        </p>
      </div>

      {/* Scratch Card Card Shell */}
      <div style={{
        maxWidth: '380px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '20px',
        boxShadow: 'var(--shadow-polaroid)',
        border: '2px solid var(--strawberry-pink)',
        position: 'relative',
        textAlign: 'center'
      }}>
        <div className="washi-tape" />

        {/* Scratch Area Canvas / Hidden Underneath */}
        <div style={{
          position: 'relative',
          width: '340px',
          height: '240px',
          margin: '10px auto 16px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
        }}>
          {/* Secret Underneath */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #FFF8F1 0%, #FCE4EC 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left'
            }}>
              <img
                src="photos/thumbs/IMG_7613.jpg"
                alt="Salma Smiling in Cozy Cafe"
                style={{
                  width: '95px',
                  height: '125px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}
              />
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '0.72rem',
                  color: 'var(--cherry-red)',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  Special Secret Revealed ♡
                </span>
                <p className="font-serif" style={{
                  fontSize: '1.05rem',
                  color: 'var(--deep-plum)',
                  lineHeight: 1.35,
                  margin: '4px 0 8px'
                }}>
                  You are the prettiest girl in the whole world.
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--cocoa-brown)', lineHeight: 1.45 }}>
                  Every time I look at your smile, I fall in love all over again. Happy 22nd birthday, my heart!
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Scratch Overlay */}
          <canvas
            ref={canvasRef}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={(e) => {
              if (isDrawing) scratch(e.clientX, e.clientY);
            }}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={(e) => {
              if (isDrawing && e.touches[0]) {
                scratch(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              cursor: isRevealed ? 'default' : 'pointer',
              opacity: isRevealed ? 0 : 1,
              transition: isRevealed ? 'opacity 0.6s ease-out' : 'none',
              pointerEvents: isRevealed ? 'none' : 'auto'
            }}
          />
        </div>

        {/* Scratch Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {!isRevealed ? (
            <button
              onClick={handleFullReveal}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 18px' }}
            >
              <Eye size={15} /> Reveal Instantly ♡
            </button>
          ) : (
            <button
              onClick={initCanvas}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 18px' }}
            >
              <RotateCcw size={15} /> Scratch Again
            </button>
          )}
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--dusty-rose)', marginTop: '10px' }}>
          {isRevealed ? '🎉 Secret completely revealed!' : `${percentScratched}% scratched • Scratch to 45% for full magic`}
        </p>
      </div>
    </section>
  );
};
