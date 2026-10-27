import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QUESTIONS, PERSONAL_DETAILS } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gamepad2, RotateCcw, Award, Sparkles, Heart, Timer, Trophy } from 'lucide-react';

interface ArcadeZoneProps {
  onTreasureFound?: (id: number) => void;
  isTreasureFound?: boolean;
}

export const ArcadeZone: React.FC<ArcadeZoneProps> = ({ onTreasureFound, isTreasureFound }) => {
  const [activeGame, setActiveGame] = useState<'quiz' | 'match' | 'catch' | 'word'>('quiz');

  /* -------------------------------------------------------------
   * GAME A: HOW WELL DO YOU KNOW US?
   * ------------------------------------------------------------- */
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleOptionSelect = (optionIdx: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIdx);
    setShowFeedback(true);

    const isCorrect = optionIdx === QUIZ_QUESTIONS[quizIndex].correctIndex;
    if (isCorrect) {
      sound.playWin();
      setQuizScore(prev => prev + 1);
    } else {
      sound.playPop();
    }
  };

  const handleNextQuestion = () => {
    sound.playPop();
    setShowFeedback(false);
    setSelectedOption(null);
    if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setIsQuizFinished(true);
      sound.playSparkle();
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const resetQuiz = () => {
    sound.playPop();
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsQuizFinished(false);
  };

  /* -------------------------------------------------------------
   * GAME B: THE HEART MATCH MEMORY GAME
   * ------------------------------------------------------------- */
  const memoryDeckItems = [
    { type: 'photo', value: 'photos/thumbs/IMG_7628.jpg', label: 'Sweetheart Salma' },
    { type: 'photo', value: 'photos/thumbs/IMG_7610.jpg', label: 'Love Locks' },
    { type: 'photo', value: 'photos/thumbs/IMG_7613.jpg', label: 'Cafe Smiles' },
    { type: 'icon', value: '🎂', label: 'Birthday Cake' },
    { type: 'icon', value: '🎀', label: 'Pink Ribbon' },
    { type: 'icon', value: '🌸', label: 'Cherry Blossom' }
  ];

  interface MemoryCard {
    uid: number;
    pairId: number;
    type: string;
    value: string;
    label: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [isMatchWon, setIsMatchWon] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const initMemoryGame = () => {
    const deck: MemoryCard[] = [];
    memoryDeckItems.forEach((item, idx) => {
      deck.push(
        { uid: idx * 2, pairId: idx, type: item.type, value: item.value, label: item.label, isFlipped: false, isMatched: false },
        { uid: idx * 2 + 1, pairId: idx, type: item.type, value: item.value, label: item.label, isFlipped: false, isMatched: false }
      );
    });

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setMatchSeconds(0);
    setIsMatchWon(false);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !isMatchWon) {
      interval = setInterval(() => {
        setMatchSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isMatchWon]);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length >= 2) return;

    if (!isTimerRunning) setIsTimerRunning(true);
    sound.playPop();

    const newFlipped = [...flippedIndices, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [idx1, idx2] = newFlipped;
      if (newCards[idx1].pairId === newCards[idx2].pairId) {
        sound.playWin();
        newCards[idx1].isMatched = true;
        newCards[idx2].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);

        // Check if all matched
        if (newCards.every(c => c.isMatched)) {
          setIsMatchWon(true);
          setIsTimerRunning(false);
          sound.playSparkle();
          try {
            confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
          } catch {}
        }
      } else {
        setTimeout(() => {
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  /* -------------------------------------------------------------
   * GAME C: CATCH THE HEARTS
   * ------------------------------------------------------------- */
  interface FloatingHeart {
    id: number;
    x: number;
    y: number;
    speed: number;
    size: number;
    color: string;
  }

  const [catchScore, setCatchScore] = useState(0);
  const [catchTimeLeft, setCatchTimeLeft] = useState(20);
  const [isCatchActive, setIsCatchActive] = useState(false);
  const [isCatchFinished, setIsCatchFinished] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const catchAreaRef = useRef<HTMLDivElement>(null);

  const startCatchGame = () => {
    sound.playSparkle();
    setCatchScore(0);
    setCatchTimeLeft(20);
    setIsCatchActive(true);
    setIsCatchFinished(false);
    setFloatingHearts([]);
  };

  useEffect(() => {
    if (!isCatchActive) return;

    const timer = setInterval(() => {
      setCatchTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCatchActive(false);
          setIsCatchFinished(true);
          sound.playWin();
          try {
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCatchActive]);

  // Spawn hearts
  useEffect(() => {
    if (!isCatchActive) return;

    const spawner = setInterval(() => {
      setFloatingHearts(prev => {
        if (prev.length >= 8) return prev;
        const newHeart: FloatingHeart = {
          id: Math.random(),
          x: Math.random() * 85 + 5,
          y: 90,
          speed: Math.random() * 2 + 1.5,
          size: Math.floor(Math.random() * 16) + 28,
          color: ['#F7B8CC', '#D94868', '#C9859C', '#E5A93C'][Math.floor(Math.random() * 4)]
        };
        return [...prev, newHeart];
      });
    }, 600);

    return () => clearInterval(spawner);
  }, [isCatchActive]);

  // Move hearts up
  useEffect(() => {
    if (!isCatchActive) return;

    const mover = setInterval(() => {
      setFloatingHearts(prev =>
        prev
          .map(h => ({ ...h, y: h.y - h.speed }))
          .filter(h => h.y > -10)
      );
    }, 50);

    return () => clearInterval(mover);
  }, [isCatchActive]);

  const handleCatchHeart = (e: React.MouseEvent | React.TouchEvent, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    sound.playPop();
    setCatchScore(prev => prev + 1);
    setFloatingHearts(prev => prev.filter(h => h.id !== id));
  };

  /* -------------------------------------------------------------
   * GAME D: THE SECRET LOVE WORD
   * ------------------------------------------------------------- */
  const TARGET_WORD = 'SALMA';
  const [wordGuesses, setWordGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isWordSolved, setIsWordSolved] = useState(false);
  const [wordHintsUsed, setWordHintsUsed] = useState(false);

  const handleLetterInput = (letter: string) => {
    if (isWordSolved || currentGuess.length >= TARGET_WORD.length) return;
    sound.playTick();
    setCurrentGuess(prev => prev + letter.toUpperCase());
  };

  const handleBackspace = () => {
    sound.playTick();
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== TARGET_WORD.length) return;
    const newGuesses = [...wordGuesses, currentGuess];
    setWordGuesses(newGuesses);

    if (currentGuess === TARGET_WORD) {
      sound.playWin();
      setIsWordSolved(true);
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      sound.playPop();
      if (newGuesses.length >= 3) {
        setWordHintsUsed(true);
      }
    }
    setCurrentGuess('');
  };

  const resetWordGame = () => {
    sound.playPop();
    setWordGuesses([]);
    setCurrentGuess('');
    setIsWordSolved(false);
    setWordHintsUsed(false);
  };

  return (
    <section id="arcade" style={{ position: 'relative' }}>
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
          <Gamepad2 size={16} /> CHAPTER 5 • THE BOYFRIEND ARCADE
        </span>
      </div>

      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
        <h2 className="font-serif" style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--deep-plum)',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}>
          The Official Salma Birthday Arcade 🕹️
        </h2>
        <p style={{ color: 'var(--cocoa-brown)', fontSize: '1rem', lineHeight: 1.6 }}>
          Four fully playable indie mini-games crafted with love, pastel pixels, and cute sound effects.
        </p>
      </div>

      {/* Arcade Game Selector Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '26px'
      }}>
        {[
          { id: 'quiz', label: '1. How Well Do You Know Us? 💌' },
          { id: 'match', label: '2. Heart Match Cards 🎴' },
          { id: 'catch', label: '3. Catch The Hearts 🎈' },
          { id: 'word', label: '4. Secret Love Word 🔤' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playPop();
              setActiveGame(tab.id as any);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: activeGame === tab.id ? '2px solid var(--cherry-red)' : '1px solid var(--strawberry-pink)',
              background: activeGame === tab.id ? 'var(--cherry-red)' : '#FFFFFF',
              color: activeGame === tab.id ? '#FFFFFF' : 'var(--deep-plum)',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              boxShadow: activeGame === tab.id ? 'var(--shadow-cherry)' : 'var(--shadow-soft)',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Retro Arcade Machine Shell */}
      <div className="arcade-box" style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '24px 20px',
        position: 'relative'
      }}>
        {/* Hidden Treasure #2 Token on the Arcade Machine */}
        <div
          onClick={() => {
            if (!isTreasureFound && onTreasureFound) {
              sound.playWin();
              onTreasureFound(2);
              try {
                confetti({ particleCount: 50, spread: 60, colors: ['#E5A93C', '#F7B8CC'] });
              } catch {}
            }
          }}
          title={isTreasureFound ? "Treasure #2 Found! 🕹️" : "Click the secret arcade coin!"}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: isTreasureFound ? '#E5A93C' : '#48253B',
            border: '2px solid #E5A93C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(229, 169, 60, 0.5)',
            zIndex: 10
          }}
        >
          <Sparkles size={18} color="#FFFFFF" />
        </div>

        {/* ---------------- GAME A: RELATIONSHIP QUIZ ---------------- */}
        {activeGame === 'quiz' && (
          <div className="arcade-screen" style={{ padding: '24px 20px', minHeight: '380px' }}>
            {!isQuizFinished ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="font-pixel" style={{ fontSize: '0.72rem', color: 'var(--strawberry-pink)' }}>
                    QUESTION {quizIndex + 1}/{QUIZ_QUESTIONS.length}
                  </span>
                  <span className="font-pixel" style={{ fontSize: '0.72rem', color: '#E5A93C' }}>
                    SCORE: {quizScore}
                  </span>
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '20px', minHeight: '50px' }}>
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === QUIZ_QUESTIONS[quizIndex].correctIndex;
                    let btnBg = 'rgba(255, 255, 255, 0.08)';
                    let borderCol = '#582C48';

                    if (showFeedback) {
                      if (isCorrect) {
                        btnBg = 'rgba(46, 125, 50, 0.6)';
                        borderCol = '#4CAF50';
                      } else if (isSelected) {
                        btnBg = 'rgba(217, 72, 104, 0.6)';
                        borderCol = '#D94868';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(oIdx)}
                        style={{
                          background: btnBg,
                          border: `2px solid ${borderCol}`,
                          borderRadius: '10px',
                          padding: '12px 16px',
                          color: '#FFFFFF',
                          textAlign: 'left',
                          fontSize: '0.95rem',
                          cursor: showFeedback ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{
                          background: '#582C48',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {['A', 'B', 'C', 'D'][oIdx]}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div style={{
                    background: 'rgba(247, 184, 204, 0.15)',
                    border: '1px solid var(--strawberry-pink)',
                    borderRadius: '10px',
                    padding: '14px',
                    marginBottom: '16px'
                  }}>
                    <p style={{ color: 'var(--strawberry-pink)', fontSize: '0.9rem', marginBottom: '10px' }}>
                      {QUIZ_QUESTIONS[quizIndex].reaction}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary"
                      style={{ fontSize: '0.85rem', padding: '8px 20px' }}
                    >
                      {quizIndex + 1 === QUIZ_QUESTIONS.length ? 'View Results →' : 'Next Question →'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <Trophy size={54} color="#E5A93C" style={{ margin: '0 auto 14px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  Quiz Completed!
                </h3>
                <p className="font-pixel" style={{ color: 'var(--strawberry-pink)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  FINAL SCORE: {quizScore} / {QUIZ_QUESTIONS.length}
                </p>
                <p style={{ color: '#FCE4EC', fontSize: '1rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 24px' }}>
                  “No matter the score, you are the easiest choice of my life. My heart belongs completely to you, Salma. ♡”
                </p>
                <button onClick={resetQuiz} className="btn-primary" style={{ padding: '12px 28px' }}>
                  <RotateCcw size={16} /> Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---------------- GAME B: MEMORY MATCH CARDS ---------------- */}
        {activeGame === 'match' && (
          <div className="arcade-screen" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="font-pixel" style={{ fontSize: '0.72rem', color: 'var(--strawberry-pink)' }}>
                MOVES: {moves}
              </span>
              <span className="font-pixel" style={{ fontSize: '0.72rem', color: '#E5A93C', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Timer size={14} /> {matchSeconds}s
              </span>
            </div>

            {!isMatchWon ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                maxWidth: '460px',
                margin: '0 auto'
              }}>
                {cards.map((card, idx) => (
                  <div
                    key={card.uid}
                    onClick={() => handleCardClick(idx)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      perspective: '1000px',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.4s ease',
                      transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}>
                      {/* Card Back */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #582C48, #2D1424)',
                        border: '2px solid var(--strawberry-pink)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--strawberry-pink)',
                        fontSize: '1.4rem'
                      }}>
                        ♡
                      </div>

                      {/* Card Front */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: card.isMatched ? 'rgba(76, 175, 80, 0.3)' : '#FFFFFF',
                        border: card.isMatched ? '2px solid #4CAF50' : '2px solid var(--cherry-red)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {card.type === 'photo' ? (
                          <img
                            src={card.value}
                            alt={card.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span style={{ fontSize: '2rem' }}>{card.value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <Award size={50} color="#E5A93C" style={{ margin: '0 auto 12px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  You Matched Every Pair! 🎉
                </h3>
                <p style={{ color: 'var(--strawberry-pink)', fontSize: '0.92rem', marginBottom: '14px' }}>
                  Completed in {moves} moves and {matchSeconds} seconds!
                </p>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid var(--strawberry-pink)',
                  maxWidth: '440px',
                  margin: '0 auto 20px',
                  color: '#FFFFFF'
                }}>
                  <p className="font-hand" style={{ fontSize: '1.5rem', color: 'var(--strawberry-pink)' }}>
                    “Just like these cards, we are a perfect match made side by side. ♡”
                  </p>
                </div>
                <button onClick={initMemoryGame} className="btn-primary">
                  <RotateCcw size={16} /> Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---------------- GAME C: CATCH THE HEARTS ---------------- */}
        {activeGame === 'catch' && (
          <div className="arcade-screen" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="font-pixel" style={{ fontSize: '0.72rem', color: '#E5A93C' }}>
                CAUGHT: {catchScore}
              </span>
              <span className="font-pixel" style={{ fontSize: '0.72rem', color: 'var(--strawberry-pink)' }}>
                TIME: {catchTimeLeft}s
              </span>
            </div>

            <div
              ref={catchAreaRef}
              style={{
                height: '320px',
                position: 'relative',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #582C48',
                touchAction: 'none'
              }}
            >
              {!isCatchActive && !isCatchFinished && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(25, 10, 20, 0.85)'
                }}>
                  <p style={{ color: '#FFFFFF', marginBottom: '14px', fontSize: '1rem' }}>
                    Tap as many floating hearts as you can in 20 seconds!
                  </p>
                  <button onClick={startCatchGame} className="btn-primary">
                    Start Round! 🎮
                  </button>
                </div>
              )}

              {isCatchActive && floatingHearts.map(h => (
                <div
                  key={h.id}
                  onMouseDown={(e) => handleCatchHeart(e, h.id)}
                  onTouchStart={(e) => handleCatchHeart(e, h.id)}
                  style={{
                    position: 'absolute',
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    fontSize: `${h.size}px`,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transform: 'translate(-50%, -50%)',
                    filter: `drop-shadow(0 0 8px ${h.color})`,
                    transition: 'transform 0.1s ease'
                  }}
                >
                  💗
                </div>
              ))}

              {isCatchFinished && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(25, 10, 20, 0.9)',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <Trophy size={48} color="#E5A93C" style={{ marginBottom: '8px' }} />
                  <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#FFF' }}>
                    You Caught {catchScore} Hearts!
                  </h3>
                  <p style={{ color: 'var(--strawberry-pink)', margin: '8px 0 16px' }}>
                    Every single heart caught belongs completely to you, Salma! ♡
                  </p>
                  <button onClick={startCatchGame} className="btn-primary">
                    <RotateCcw size={16} /> Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- GAME D: SECRET LOVE WORD ---------------- */}
        {activeGame === 'word' && (
          <div className="arcade-screen" style={{ padding: '24px 20px', textAlign: 'center' }}>
            <span className="font-pixel" style={{ fontSize: '0.72rem', color: 'var(--strawberry-pink)' }}>
              GUESS THE 5-LETTER SECRET WORD
            </span>

            <div style={{ margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
              {/* Previous guesses */}
              {wordGuesses.map((g, gIdx) => (
                <div key={gIdx} style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                  {g.split('').map((l, lIdx) => {
                    const isExact = TARGET_WORD[lIdx] === l;
                    const isPresent = TARGET_WORD.includes(l);
                    let bg = '#424242';
                    if (isExact) bg = '#2E7D32';
                    else if (isPresent) bg = '#E5A93C';

                    return (
                      <div
                        key={lIdx}
                        className="font-pixel"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: bg,
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      >
                        {l}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Current Guessing Row */}
              {!isWordSolved && (
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                  {[...Array(TARGET_WORD.length)].map((_, i) => (
                    <div
                      key={i}
                      className="font-pixel"
                      style={{
                        width: '44px',
                        height: '44px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid var(--strawberry-pink)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      {currentGuess[i] || ''}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hint if attempts >= 3 */}
            {wordHintsUsed && !isWordSolved && (
              <p style={{ color: '#E5A93C', fontSize: '0.85rem', marginBottom: '14px' }}>
                💡 Hint: It is the name of Ammar's favourite girl in the entire universe!
              </p>
            )}

            {!isWordSolved ? (
              <div>
                {/* Cute On-screen Keyboard */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '380px', margin: '0 auto 16px' }}>
                  {['S', 'A', 'L', 'M', 'R', 'H', 'E', 'A', 'R', 'T'].map((char, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleLetterInput(char)}
                      className="font-pixel"
                      style={{
                        padding: '10px 14px',
                        background: '#582C48',
                        color: '#FFF',
                        border: '1px solid var(--strawberry-pink)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {char}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button onClick={handleBackspace} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                    Backspace
                  </button>
                  <button onClick={handleSubmitGuess} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
                    Enter Guess
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '20px' }}>
                <h3 className="font-serif" style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '8px' }}>
                  You Solved It: SALMA! ❤️
                </h3>
                <p className="font-hand" style={{ color: 'var(--strawberry-pink)', fontSize: '1.5rem', marginBottom: '16px' }}>
                  “The sweetest 5-letter word in my entire vocabulary.”
                </p>
                <button onClick={resetWordGame} className="btn-primary">
                  <RotateCcw size={16} /> Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
