import React, { useState, useEffect } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { GrandReveal } from './components/GrandReveal';
import { Scrapbook } from './components/Scrapbook';
import { ReasonsSpecial } from './components/ReasonsSpecial';
import { ArcadeZone } from './components/ArcadeZone';
import { CouponShop } from './components/CouponShop';
import { PrizeWheel } from './components/PrizeWheel';
import { ScratchCard } from './components/ScratchCard';
import { TreasureHunt } from './components/TreasureHunt';
import { LoveLetter } from './components/LoveLetter';
import { FlowerGarden } from './components/FlowerGarden';
import { FinalTreasure } from './components/FinalTreasure';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('salma_envelope_opened') === 'true';
    } catch {
      return false;
    }
  });

  const [foundTreasures, setFoundTreasures] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('salma_treasures_found');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [progressStats, setProgressStats] = useState({
    notesRead: 0,
    couponsRedeemed: 0,
    treasuresFound: 0
  });

  // Keep track of stats
  useEffect(() => {
    const updateStats = () => {
      try {
        const notes = JSON.parse(localStorage.getItem('salma_opened_notes') || '[]');
        const coupons = Object.keys(JSON.parse(localStorage.getItem('salma_redeemed_coupons') || '{}'));
        setProgressStats({
          notesRead: notes.length,
          couponsRedeemed: coupons.length,
          treasuresFound: foundTreasures.length
        });
      } catch {}
    };

    updateStats();
    const interval = setInterval(updateStats, 1500);
    return () => clearInterval(interval);
  }, [foundTreasures]);

  const handleEnvelopeOpen = () => {
    setHasOpenedEnvelope(true);
    try {
      sessionStorage.setItem('salma_envelope_opened', 'true');
    } catch {}
  };

  const handleTreasureFound = (id: number) => {
    if (!foundTreasures.includes(id)) {
      const updated = [...foundTreasures, id];
      setFoundTreasures(updated);
      try {
        localStorage.setItem('salma_treasures_found', JSON.stringify(updated));
      } catch {}
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {!hasOpenedEnvelope ? (
        <EnvelopeIntro onOpen={handleEnvelopeOpen} />
      ) : (
        <>
          {/* Persistent Floating Navigation & Audio Controls */}
          <Navbar progressStats={progressStats} />

          <main style={{ paddingTop: '40px' }}>
            {/* Chapter 2: The Grand Birthday Reveal */}
            <GrandReveal
              onScrollNext={() => scrollToSection('scrapbook')}
              onTreasureFound={handleTreasureFound}
              isTreasureFound={foundTreasures.includes(1)}
            />

            {/* Chapter 3: Salma's Memory Scrapbook */}
            <Scrapbook />

            {/* Chapter 4: 22 Little Reasons You Are Special */}
            <ReasonsSpecial />

            {/* Chapter 5: The Official Salma Birthday Arcade */}
            <ArcadeZone
              onTreasureFound={handleTreasureFound}
              isTreasureFound={foundTreasures.includes(2)}
            />

            {/* Chapter 6: The Boyfriend Bank of Love */}
            <CouponShop
              onTreasureFound={handleTreasureFound}
              isTreasureFound={foundTreasures.includes(3)}
            />

            {/* Chapter 7: Spin For a Surprise */}
            <PrizeWheel />

            {/* Chapter 8: Scratch to Reveal */}
            <ScratchCard />

            {/* Chapter 9: The Birthday Treasure Hunt */}
            <TreasureHunt foundTreasures={foundTreasures} />

            {/* Chapter 10: The Love Letter */}
            <LoveLetter />

            {/* Chapter 11: Flowers That Bloom For Her */}
            <FlowerGarden />

            {/* Chapter 12: The Final Birthday Treasure */}
            <FinalTreasure
              onRevisitScrapbook={() => scrollToSection('scrapbook')}
              onReplayReveal={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
