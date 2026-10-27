import React, { useState } from 'react';
import { PERSONAL_DETAILS } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, RotateCcw, Upload, Music } from 'lucide-react';

export const LoveLetter: React.FC = () => {
  const [isReadingAgain, setIsReadingAgain] = useState(false);
  const [showVoiceUploader, setShowVoiceUploader] = useState(false);

  const handleReadAgain = () => {
    sound.playSparkle();
    setIsReadingAgain(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#FFF8F1']
      });
    } catch {}
    setTimeout(() => setIsReadingAgain(false), 800);
  };

  return (
    <section id="letter" style={{ position: 'relative' }}>
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
          <Mail size={16} /> CHAPTER 10 • THE LOVE LETTER
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          From My Heart to Yours ♡
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          A quieter moment. The words I hold closest to my heart on this special day.
        </p>
      </div>

      {/* Elegant Handwritten Paper Card */}
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        background: '#FFFDF9',
        borderRadius: '16px',
        padding: 'clamp(26px, 5vw, 48px)',
        boxShadow: 'var(--shadow-polaroid)',
        border: '1px solid rgba(247, 184, 204, 0.6)',
        position: 'relative',
        opacity: isReadingAgain ? 0.8 : 1,
        transition: 'opacity 0.4s ease'
      }}>
        {/* Top Washi Tape and Wax Seal Stamp */}
        <div className="washi-tape" />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(247, 184, 204, 0.4)',
          paddingBottom: '16px',
          marginBottom: '26px'
        }}>
          <div>
            <p className="font-hand" style={{ fontSize: '1.8rem', color: 'var(--cherry-red)', lineHeight: 1 }}>
              To Salma, My Sweetheart
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--dusty-rose)', letterSpacing: '1px', fontWeight: 600 }}>
              28 October 2026 • Our First Birthday Together
            </p>
          </div>

          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D94868, #B32E4B)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(217, 72, 104, 0.35)'
          }}>
            <Heart size={22} color="#FFFFFF" fill="#FFFFFF" />
          </div>
        </div>

        {/* Verbatim Birthday Message */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.85,
          fontStyle: 'italic',
          letterSpacing: '0.3px',
          margin: '20px 0 34px'
        }}>
          “{PERSONAL_DETAILS.mainBirthdayMessage}”
        </div>

        {/* Handwritten Sign-off */}
        <div style={{
          textAlign: 'right',
          borderTop: '1px solid rgba(247, 184, 204, 0.4)',
          paddingTop: '20px'
        }}>
          <p className="font-hand" style={{
            fontSize: '2.1rem',
            color: 'var(--cherry-red)',
            marginBottom: '4px'
          }}>
            Forever yours,
          </p>
          <p className="font-hand" style={{
            fontSize: '2.4rem',
            color: 'var(--deep-plum)',
            lineHeight: 1
          }}>
            Ammar ♡
          </p>
        </div>

        {/* Action Controls */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleReadAgain}
            className="btn-primary"
            style={{ fontSize: '0.92rem', padding: '10px 24px' }}
          >
            <Sparkles size={16} /> read my letter again ♡
          </button>

          <button
            onClick={() => setShowVoiceUploader(!showVoiceUploader)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--dusty-rose)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'underline'
            }}
          >
            <Upload size={14} /> {showVoiceUploader ? 'Hide voice note options' : 'Ammar personal voice/video note option'}
          </button>
        </div>

        {/* Optional Voice Note Dropzone for Ammar */}
        {showVoiceUploader && (
          <div style={{
            marginTop: '20px',
            background: 'var(--soft-blush)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '0.85rem',
            color: 'var(--deep-plum)',
            lineHeight: 1.5,
            textAlign: 'left'
          }}>
            <p style={{ fontWeight: 700, color: 'var(--cherry-red)', marginBottom: '4px' }}>
              🎙️ Ammar's Personal Audio Note
            </p>
            <p style={{ color: 'var(--cocoa-brown)', fontSize: '0.8rem' }}>
              To add your own recorded voice message, simply drop an audio file named <code>voice_note.mp3</code> into the <code>public/</code> folder, and it will automatically appear here with a custom audio player for Salma!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
