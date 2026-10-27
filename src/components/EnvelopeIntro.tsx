import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_DETAILS } from '../data/content';
import { sound } from '../utils/audio';
import { Lock, Heart, Sparkles, KeyRound } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNoteRevealed, setIsNoteRevealed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isPasscodeUnlocked, setIsPasscodeUnlocked] = useState(true); // Default accessible, gate optional
  const [showPasscodeInput, setShowPasscodeInput] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  // Calculate countdown to 28 Oct 2026
  useEffect(() => {
    const target = new Date(PERSONAL_DETAILS.targetBirthday).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds, isPast: false });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenEnvelope = () => {
    if (!isPasscodeUnlocked) {
      setShowPasscodeInput(true);
      return;
    }

    sound.playSparkle();
    setIsOpen(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#FFF8F1', '#FCE4EC']
      });
    } catch {}

    setTimeout(() => {
      setIsNoteRevealed(true);
    }, 600);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === PERSONAL_DETAILS.passcode.toLowerCase() || passcode.trim() === '22' || passcode.trim() === '2810') {
      setIsPasscodeUnlocked(true);
      setShowPasscodeInput(false);
      sound.playWin();
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const handleEnterUniverse = () => {
    sound.playPop();
    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F7B8CC', '#D94868', '#FCE4EC', '#FFF8F1']
      });
    } catch {}
    onOpen();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      background: 'radial-gradient(circle at center, #FFF8F1 0%, #FCE4EC 60%, #F7B8CC 100%)',
      overflow: 'hidden'
    }}>
      {/* Delicate floating background hearts */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="animate-float"
            style={{
              position: 'absolute',
              top: `${(i * 18 + 7) % 95}%`,
              left: `${(i * 23 + 5) % 92}%`,
              color: i % 2 === 0 ? 'rgba(217, 72, 104, 0.25)' : 'rgba(247, 184, 204, 0.4)',
              fontSize: `${16 + (i % 3) * 10}px`,
              animationDelay: `${i * 0.4}s`
            }}
          >
            ♡
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        zIndex: 10
      }}>
        {/* Soft Header */}
        <p className="font-hand" style={{
          fontSize: '1.65rem',
          color: 'var(--cherry-red)',
          marginBottom: '6px'
        }}>
          psst… Salma, this little universe is only for you ♡
        </p>

        <h1 className="font-serif" style={{
          fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.25,
          marginBottom: '14px'
        }}>
          Your 22nd birthday surprise is waiting…
        </h1>

        {/* Countdown Indicator (Shows countdown if before Oct 28 2026, or celebration badge) */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.75)',
          padding: '6px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(247, 184, 204, 0.8)',
          boxShadow: 'var(--shadow-soft)',
          marginBottom: '26px'
        }}>
          <Sparkles size={16} color="var(--cherry-red)" />
          {countdown.isPast ? (
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cherry-red)' }}>
              🎉 Today is your special day! Happy 22nd Birthday! 🎂
            </span>
          ) : (
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cocoa-brown)' }}>
              Countdown to 28 October 2026: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
            </span>
          )}
        </div>

        {/* The Interactive Envelope Container */}
        <div style={{
          perspective: '1000px',
          margin: '10px auto 30px',
          maxWidth: '380px',
          width: '100%'
        }}>
          {!isNoteRevealed ? (
            <div
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              aria-label="Tap to open the birthday envelope"
              style={{
                background: 'linear-gradient(145deg, #FCE4EC 0%, #F7B8CC 100%)',
                borderRadius: '16px',
                padding: '30px 20px',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 20px 45px rgba(217, 72, 104, 0.22)',
                cursor: 'pointer',
                position: 'relative',
                transform: isOpen ? 'scale(0.96) rotate(-1deg)' : 'scale(1)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                userSelect: 'none'
              }}
            >
              {/* Envelope flap aesthetic */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                background: 'rgba(255, 255, 255, 0.25)',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                pointerEvents: 'none'
              }} />

              {/* Heart Wax Seal */}
              <div
                className="animate-pulse-glow"
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D94868, #B32E4B)',
                  margin: '10px auto 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(217, 72, 104, 0.5)',
                  transform: isOpen ? 'scale(0) rotate(90deg)' : 'scale(1)',
                  transition: 'all 0.4s ease'
                }}
              >
                <Heart size={28} color="#FFFFFF" fill="#FFFFFF" />
              </div>

              <p className="font-hand" style={{
                fontSize: '1.9rem',
                color: 'var(--deep-plum)',
                marginBottom: '4px'
              }}>
                To: My Sweetheart, Salma
              </p>
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--cocoa-brown)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: 700
              }}>
                {isOpen ? 'Opening with love...' : 'Tap to open your letter ♡'}
              </p>
            </div>
          ) : (
            /* Revealed Handwritten Note */
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '30px 24px',
              boxShadow: 'var(--shadow-polaroid)',
              border: '1px solid rgba(247, 184, 204, 0.6)',
              animation: 'stampPop 0.5s ease-out forwards',
              position: 'relative'
            }}>
              <div className="washi-tape" />

              <span style={{
                display: 'inline-block',
                background: 'var(--soft-blush)',
                color: 'var(--cherry-red)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}>
                CHAPTER 1 • THE INVITATION
              </span>

              <h2 className="font-serif" style={{
                fontSize: '1.45rem',
                color: 'var(--deep-plum)',
                marginBottom: '12px'
              }}>
                Salma, My Heart ♡
              </h2>

              <p style={{
                fontSize: '0.96rem',
                color: 'var(--cocoa-brown)',
                lineHeight: 1.65,
                marginBottom: '20px'
              }}>
                I built this whole little universe just for you to celebrate your 22nd birthday.
                Inside you will find our photographs, secret memories, interactive games, redeemable love passes,
                a bouquet of blooming flowers, and surprises waiting at every turn.
              </p>

              <p className="font-hand" style={{
                fontSize: '1.5rem',
                color: 'var(--cherry-red)',
                marginBottom: '22px'
              }}>
                Made with all my love, Ammar ♡
              </p>

              <button
                onClick={handleEnterUniverse}
                className="btn-primary"
                style={{ width: '100%', fontSize: '1rem', padding: '14px' }}
              >
                ENTER MY LITTLE UNIVERSE →
              </button>
            </div>
          )}
        </div>

        {/* Optional Passcode Gate Toggle for Ammar */}
        <div style={{ marginTop: '10px' }}>
          {!showPasscodeInput ? (
            <button
              onClick={() => setShowPasscodeInput(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--dusty-rose)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <KeyRound size={13} /> Passcode Settings / Lock
            </button>
          ) : (
            <form onSubmit={handlePasscodeSubmit} style={{
              display: 'inline-flex',
              gap: '6px',
              alignItems: 'center',
              background: 'white',
              padding: '6px 12px',
              borderRadius: '999px',
              boxShadow: 'var(--shadow-soft)',
              border: errorShake ? '2px solid red' : '1px solid var(--strawberry-pink)'
            }}>
              <input
                type="text"
                placeholder="Secret code (e.g. salma)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'inherit',
                  width: '160px'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--cherry-red)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Unlock
              </button>
              <button
                type="button"
                onClick={() => setShowPasscodeInput(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Skip Animation Option */}
        <button
          onClick={onOpen}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--dusty-rose)',
            fontSize: '0.82rem',
            textDecoration: 'underline',
            cursor: 'pointer',
            opacity: 0.8
          }}
        >
          Skip intro and view website directly →
        </button>
      </div>
    </div>
  );
};
