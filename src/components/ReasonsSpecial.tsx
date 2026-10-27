import React, { useState, useEffect } from 'react';
import { REASONS_22, LoveReason } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, CheckCircle2, RotateCcw } from 'lucide-react';

export const ReasonsSpecial: React.FC = () => {
  const [openedNotes, setOpenedNotes] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('salma_opened_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeNote, setActiveNote] = useState<LoveReason | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('salma_opened_notes', JSON.stringify(openedNotes));
    } catch {}
  }, [openedNotes]);

  const handleOpenNote = (reason: LoveReason) => {
    sound.playPop();
    if (!openedNotes.includes(reason.id)) {
      const nextOpened = [...openedNotes, reason.id];
      setOpenedNotes(nextOpened);
      
      // If all 22 opened, celebrate!
      if (nextOpened.length === 22) {
        sound.playWin();
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#F7B8CC', '#D94868', '#FFF8F1']
          });
        } catch {}
      }
    }
    setActiveNote(reason);
  };

  const handleResetAll = () => {
    sound.playPop();
    setOpenedNotes([]);
    setActiveNote(null);
  };

  const handleOpenAll = () => {
    sound.playSparkle();
    setOpenedNotes(REASONS_22.map(r => r.id));
  };

  return (
    <section id="reasons" style={{ position: 'relative' }}>
      {/* Chapter Badge */}
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
          <Sparkles size={16} /> CHAPTER 4 • 22 REASONS YOU ARE SPECIAL
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          One Reason For Every Year of You ♡
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          22 collectible love notes celebrating your smile, your warmth, and the girl you are today.
          Tap each note to unlock what Ammar cherishes about you.
        </p>

        {/* Progress Counter */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: '#FFFFFF',
          padding: '8px 24px',
          borderRadius: '999px',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--strawberry-pink)',
          marginTop: '16px'
        }}>
          <Heart size={18} color="var(--cherry-red)" fill="var(--cherry-red)" />
          <span style={{ fontWeight: 800, color: 'var(--cherry-red)', fontSize: '0.95rem' }}>
            {openedNotes.length} of 22 little love notes discovered
          </span>
          {openedNotes.length === 22 && (
            <span style={{ color: '#2E7D32', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={15} /> All Read!
            </span>
          )}
        </div>
      </div>

      {/* Grid of 22 Notes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '16px',
        maxWidth: '1000px',
        margin: '0 auto 30px',
        padding: '10px'
      }}>
        {REASONS_22.map((reason) => {
          const isOpen = openedNotes.includes(reason.id);

          return (
            <div
              key={reason.id}
              onClick={() => handleOpenNote(reason)}
              role="button"
              tabIndex={0}
              style={{
                background: isOpen ? '#FFFFFF' : 'linear-gradient(135deg, #FFF8F1 0%, #FCE4EC 100%)',
                border: isOpen ? '2px solid var(--strawberry-pink)' : '2px dashed var(--dusty-rose)',
                borderRadius: '16px',
                padding: '18px 12px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: isOpen ? 'var(--shadow-soft)' : '0 4px 12px rgba(0,0,0,0.04)',
                transform: isOpen ? 'translateY(-2px)' : 'scale(1)',
                transition: 'all 0.25s ease',
                position: 'relative',
                userSelect: 'none'
              }}
            >
              {/* Year Number Stamp */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '10px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: isOpen ? 'var(--cherry-red)' : 'var(--dusty-rose)',
                fontFamily: 'var(--font-serif)'
              }}>
                #{reason.id}
              </div>

              {/* Icon / Envelope graphic */}
              <div style={{
                fontSize: '2rem',
                margin: '12px auto 8px',
                transform: isOpen ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s ease'
              }}>
                {isOpen ? reason.icon : '💌'}
              </div>

              <p style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--deep-plum)',
                lineHeight: 1.2
              }}>
                {isOpen ? reason.theme : `Note #${reason.id}`}
              </p>

              {isOpen && (
                <div style={{
                  marginTop: '6px',
                  fontSize: '0.7rem',
                  color: 'var(--cherry-red)',
                  fontWeight: 600
                }}>
                  Read note ♡
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons: "Read them all again" / "Open all" */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={handleOpenAll}
          className="btn-secondary"
          style={{ fontSize: '0.88rem', padding: '10px 20px' }}
        >
          <Sparkles size={16} /> Open all 22 love notes
        </button>

        {openedNotes.length > 0 && (
          <button
            onClick={handleResetAll}
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
            <RotateCcw size={14} /> Read them all again from the start
          </button>
        )}
      </div>

      {/* Pop-up Modal to Read Selected Note */}
      {activeNote && (
        <div
          onClick={() => setActiveNote(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(72, 37, 59, 0.75)',
            backdropFilter: 'blur(5px)',
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
              padding: '34px 28px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: 'var(--shadow-polaroid)',
              border: '2px solid var(--strawberry-pink)',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div className="washi-tape" />

            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--soft-blush)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 14px'
            }}>
              {activeNote.icon}
            </div>

            <span style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--cherry-red)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Reason #{activeNote.id} • {activeNote.theme}
            </span>

            <h3 className="font-serif" style={{
              fontSize: '1.65rem',
              color: 'var(--deep-plum)',
              margin: '8px 0 16px'
            }}>
              {activeNote.title}
            </h3>

            <p style={{
              color: 'var(--cocoa-brown)',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              marginBottom: '24px'
            }}>
              “{activeNote.note}”
            </p>

            <button
              onClick={() => setActiveNote(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Keep in My Heart ♡
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
