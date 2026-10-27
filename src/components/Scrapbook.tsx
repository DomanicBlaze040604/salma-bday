import React, { useState } from 'react';
import photosData from '../data/photos.json';
import { sound } from '../utils/audio';
import { Heart, X, ChevronLeft, ChevronRight, Sparkles, Eye } from 'lucide-react';

interface PhotoItem {
  id: string;
  filename: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  aspect: number;
  orientation: string;
  caption: string;
}

export const Scrapbook: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const photos: PhotoItem[] = photosData as PhotoItem[];

  // Assign categories deterministically
  const categorizedPhotos = photos.map((p, idx) => {
    let cat = 'pretty';
    if (idx % 3 === 0) cat = 'cafe';
    else if (idx % 3 === 1) cat = 'adventures';
    return { ...p, category: cat, rot: ((idx % 7) - 3) * 1.2 };
  });

  const filteredPhotos = activeCategory === 'all'
    ? categorizedPhotos
    : categorizedPhotos.filter(p => p.category === activeCategory);

  const openLightbox = (index: number) => {
    sound.playPop();
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTick();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTick();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sound.playSparkle();
    setLikedPhotos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="scrapbook" style={{ position: 'relative' }}>
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
          <Sparkles size={16} /> CHAPTER 3 • THE MEMORY SCRAPBOOK
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          Moments That Melt My Heart ♡
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          A handcrafted physical scrapbook brought to life with your real photographs.
          Tap any polaroid to step inside the full-screen memory, or tap the little hearts to leave some love.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '40px'
      }}>
        {[
          { key: 'all', label: `All Memories (${photos.length})` },
          { key: 'pretty', label: 'Pretty Moments 🌸' },
          { key: 'cafe', label: 'Cafe & Sweet Outings ☕' },
          { key: 'adventures', label: 'Adventures & Outings 🗺️' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              sound.playPop();
              setActiveCategory(tab.key);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              border: activeCategory === tab.key ? '2px solid var(--cherry-red)' : '1px solid var(--strawberry-pink)',
              background: activeCategory === tab.key ? 'var(--cherry-red)' : '#FFFFFF',
              color: activeCategory === tab.key ? '#FFFFFF' : 'var(--deep-plum)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeCategory === tab.key ? 'var(--shadow-cherry)' : 'var(--shadow-soft)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Masonry / Scrapbook Collage Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        padding: '10px'
      }}>
        {filteredPhotos.map((photo, index) => {
          const isLiked = likedPhotos[photo.id];
          const isSpecialOversized = index === 3 || index === 8 || index === 14;

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="polaroid-frame"
              style={{
                transform: `rotate(${photo.rot}deg)`,
                cursor: 'pointer',
                gridColumn: isSpecialOversized ? 'span 1' : 'span 1',
                paddingBottom: '24px'
              }}
            >
              {/* Random Washi Tape or Sticker Decoration */}
              {index % 2 === 0 ? (
                <div className="washi-tape" />
              ) : (
                <div className="washi-tape-slant" />
              )}

              {/* Photo Image */}
              <div style={{
                position: 'relative',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#FCE4EC',
                aspectRatio: photo.orientation === 'portrait' ? '3/4' : '4/3'
              }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    // Fallback to original filename
                    (e.target as HTMLImageElement).src = `/Salma photos/${photo.filename}`;
                  }}
                />

                {/* Hover overlay hint */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(72, 37, 59, 0.25)',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.2s ease',
                  color: 'white'
                }}
                className="hover-overlay"
                >
                  <Eye size={28} />
                </div>
              </div>

              {/* Handwritten Scrapbook Annotation & Heart */}
              <div style={{
                marginTop: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <p className="font-hand" style={{
                  fontSize: '1.45rem',
                  color: 'var(--deep-plum)',
                  lineHeight: 1.25,
                  flex: 1
                }}>
                  {photo.caption}
                </p>

                <button
                  onClick={(e) => toggleHeart(e, photo.id)}
                  title={isLiked ? "Saved in Ammar's heart ♡" : "Leave a heart"}
                  style={{
                    background: isLiked ? 'var(--soft-blush)' : 'none',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <Heart
                    size={20}
                    color={isLiked ? "var(--cherry-red)" : "var(--dusty-rose)"}
                    fill={isLiked ? "var(--cherry-red)" : "none"}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(45, 20, 36, 0.92)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={26} />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              style={{
                position: 'absolute',
                left: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              style={{
                position: 'absolute',
                right: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Polaroid Modal Card */}
            <div style={{
              background: '#FFFFFF',
              padding: '16px 16px 36px 16px',
              borderRadius: '8px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              maxWidth: '680px',
              textAlign: 'center'
            }}>
              <img
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].caption}
                style={{
                  maxHeight: '65vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
              <p className="font-hand" style={{
                fontSize: '1.9rem',
                color: 'var(--deep-plum)',
                marginTop: '16px',
                marginBottom: '4px'
              }}>
                {filteredPhotos[selectedPhotoIndex].caption}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--cocoa-brown)', fontWeight: 600 }}>
                Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
