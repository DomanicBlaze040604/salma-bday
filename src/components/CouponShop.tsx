import React, { useState, useEffect } from 'react';
import { COUPONS, Coupon } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Ticket, Sparkles, Check, RotateCcw, AlertCircle, Heart } from 'lucide-react';

interface CouponShopProps {
  onTreasureFound?: (id: number) => void;
  isTreasureFound?: boolean;
}

export const CouponShop: React.FC<CouponShopProps> = ({ onTreasureFound, isTreasureFound }) => {
  const [redeemedMap, setRedeemedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('salma_redeemed_coupons');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [confirmCoupon, setConfirmCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('salma_redeemed_coupons', JSON.stringify(redeemedMap));
    } catch {}
  }, [redeemedMap]);

  const handleRedeemClick = (coupon: Coupon) => {
    sound.playPop();
    setConfirmCoupon(coupon);
  };

  const handleConfirmRedeem = () => {
    if (!confirmCoupon) return;
    sound.playWin();

    setRedeemedMap(prev => ({ ...prev, [confirmCoupon.id]: true }));
    setConfirmCoupon(null);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F7B8CC', '#D94868', '#FFF8F1']
      });
    } catch {}
  };

  const handleUnredeem = (couponId: string) => {
    sound.playPop();
    setRedeemedMap(prev => {
      const next = { ...prev };
      delete next[couponId];
      return next;
    });
  };

  const handleResetAllCoupons = () => {
    sound.playPop();
    setRedeemedMap({});
  };

  const redeemedCount = Object.keys(redeemedMap).length;

  return (
    <section id="coupons" style={{ position: 'relative' }}>
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
          <Ticket size={16} /> CHAPTER 6 • THE BOYFRIEND BANK OF LOVE
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          The Boyfriend Bank of Love 🎟️
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '12px' }}>
          “22 years of being wonderful deserves some very special privileges.”
        </p>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          12 official redeemable coupons guaranteed by Ammar. No expiration date.
          Tap "Redeem Ticket" whenever you want to cash one in!
        </p>

        {/* Counter & Treasure #3 Button */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '14px',
          background: '#FFFFFF',
          padding: '8px 24px',
          borderRadius: '999px',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--strawberry-pink)',
          marginTop: '16px'
        }}>
          <span style={{ fontWeight: 800, color: 'var(--cherry-red)', fontSize: '0.92rem' }}>
            {redeemedCount} of {COUPONS.length} Coupons Redeemed
          </span>

          {/* Treasure #3 Hidden Key */}
          <button
            onClick={() => {
              if (!isTreasureFound && onTreasureFound) {
                sound.playWin();
                onTreasureFound(3);
                try {
                  confetti({ particleCount: 60, spread: 70, colors: ['#E5A93C', '#D94868'] });
                } catch {}
              }
            }}
            title={isTreasureFound ? "Treasure #3 Collected! 🔑" : "A secret golden stamp!"}
            style={{
              background: isTreasureFound ? '#E5A93C' : 'var(--soft-blush)',
              border: '1px solid #E5A93C',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isTreasureFound ? '#FFF' : '#E5A93C'
            }}
          >
            <Sparkles size={14} />
          </button>
        </div>
      </div>

      {/* Grid of 12 Coupons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto 36px',
        padding: '10px'
      }}>
        {COUPONS.map((coupon, idx) => {
          const isRedeemed = redeemedMap[coupon.id];

          return (
            <div
              key={coupon.id}
              className="coupon-ticket"
              style={{
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: isRedeemed ? '#FFF9FA' : '#FFFFFF',
                opacity: isRedeemed ? 0.9 : 1
              }}
            >
              <div>
                {/* Ticket Header & Serial */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px dashed rgba(247, 184, 204, 0.8)',
                  paddingBottom: '12px',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: 'var(--dusty-rose)',
                    letterSpacing: '1px',
                    fontFamily: 'monospace'
                  }}>
                    NO. 22-SLM-00{idx + 1}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    background: 'var(--soft-blush)',
                    color: 'var(--cherry-red)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontWeight: 700
                  }}>
                    {coupon.category}
                  </span>
                </div>

                {/* Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                  <div style={{
                    fontSize: '2.2rem',
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: 'var(--soft-blush)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {coupon.icon}
                  </div>
                  <div>
                    <h3 className="font-serif" style={{
                      fontSize: '1.15rem',
                      color: 'var(--deep-plum)',
                      lineHeight: 1.25,
                      marginBottom: '4px'
                    }}>
                      {coupon.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--dusty-rose)', fontWeight: 600 }}>
                      {coupon.subtitle}
                    </p>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--cocoa-brown)',
                  lineHeight: 1.55,
                  marginBottom: '20px'
                }}>
                  {coupon.description}
                </p>
              </div>

              {/* Status & Action */}
              <div style={{
                borderTop: '1px dashed rgba(247, 184, 204, 0.8)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {!isRedeemed ? (
                  <button
                    onClick={() => handleRedeemClick(coupon)}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '10px 18px',
                      fontSize: '0.88rem'
                    }}
                  >
                    Redeem Ticket ♡
                  </button>
                ) : (
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="stamp-redeemed">
                      REDEEMED WITH LOVE ♡
                    </span>
                    <button
                      onClick={() => handleUnredeem(coupon.id)}
                      title="Reset this coupon back to available"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--dusty-rose)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Undo
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset all button */}
      {redeemedCount > 0 && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleResetAllCoupons}
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
            <RotateCcw size={14} /> Reset all coupons to fresh
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmCoupon && (
        <div
          onClick={() => setConfirmCoupon(null)}
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
              padding: '30px 24px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: 'var(--shadow-polaroid)',
              textAlign: 'center',
              border: '2px solid var(--strawberry-pink)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              {confirmCoupon.icon}
            </div>

            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--deep-plum)', marginBottom: '8px' }}>
              Redeem This Coupon?
            </h3>

            <p style={{ color: 'var(--cherry-red)', fontWeight: 700, marginBottom: '6px' }}>
              {confirmCoupon.title}
            </p>

            <p style={{ color: 'var(--cocoa-brown)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Are you sure you want to redeem this pass now, Salma? Ammar is ready to make it happen! ♡
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setConfirmCoupon(null)}
                className="btn-secondary"
                style={{ flex: 1, padding: '10px' }}
              >
                Not yet
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="btn-primary"
                style={{ flex: 1, padding: '10px' }}
              >
                Yes, Redeem! ♡
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
