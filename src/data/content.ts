export interface LoveReason {
  id: number;
  theme: string;
  title: string;
  note: string;
  icon: string;
}

export interface Coupon {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  color: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reaction: string;
}

export interface PrizeItem {
  id: number;
  label: string;
  color: string;
  rewardTitle: string;
  rewardDescription: string;
  icon: string;
}

export interface TreasureClue {
  id: number;
  sectionId: string;
  clue: string;
  secretNote: string;
  foundMessage: string;
}

export const PERSONAL_DETAILS = {
  girlfriendName: "Salma",
  boyfriendName: "Ammar",
  age: 22,
  birthDate: "2004-10-28",
  targetBirthday: "2026-10-28T00:00:00+05:30",
  passcode: "salma", // Configurable secret code
  
  // Exact birthday message requested by user
  mainBirthdayMessage: `My sweetheart, happy 22nd birthday, my love. ❤️🥹🎂 Our first one together, and InshaAllah, a lifetime of birthdays to celebrate side by side. Here’s to many more beautiful memories, endless love, and growing old together. You deserve all the happiness in the world, my heart. I’m so lucky to have you. I love you more than words could ever explain. 🫶🏻❤️🩹`,
  
  // Climax message requested by user
  climaxMessage: `Happy 22nd birthday, my sweetheart, Salma. ❤️\n\nThis is our first birthday of yours that I get to celebrate as your boyfriend, and InshaAllah, it is only the beginning of a lifetime of birthdays, little surprises, beautiful memories, and love.\n\nNo matter how many candles you blow out, I hope you always remember how special you are to me.\n\nToday, tomorrow, and in all the birthdays still waiting for us — I choose you, my heart.\n\nForever cheering for you,\nAmmar ♡`,

  gardenMessage: `If I could give you every flower in the world, I’d still wish I could give you more happiness than they could ever hold. Happy birthday, my love. ♡`
};

export const REASONS_22: LoveReason[] = [
  {
    id: 1,
    theme: "Your smile",
    title: "The Brightest Smile",
    note: "Your smile has this effortless way of turning any heavy day into pure sunshine. When your eyes crinkle with laughter, my whole world feels warm and right.",
    icon: "✨"
  },
  {
    id: 2,
    theme: "Your happiness",
    title: "Your Genuine Joy",
    note: "Seeing you happy is my favourite feeling in the universe. There is nothing I want more than to see your heart peaceful, light, and full of joy every single day.",
    icon: "🌸"
  },
  {
    id: 3,
    theme: "The way you make ordinary moments special",
    title: "Everyday Magic",
    note: "A quiet conversation, a shared meal, or just sitting side by side — with you, even the simplest, most ordinary seconds turn into cherished memories.",
    icon: "☕"
  },
  {
    id: 4,
    theme: "Your kindness",
    title: "A Heart of Pure Gold",
    note: "The gentleness you carry in your voice and the kindness you extend to everyone around you is one of the things I admire most about you.",
    icon: "🕊️"
  },
  {
    id: 5,
    theme: "Your beautiful personality",
    title: "Unapologetically Wonderful",
    note: "You have a personality that balances sweetness, wit, elegance, and deep care. Being around you is like finding a cozy safe haven.",
    icon: "🎀"
  },
  {
    id: 6,
    theme: "The comfort of talking to you",
    title: "My Safe Haven",
    note: "I can talk to you about anything — dreams, silly jokes, random thoughts — and time just dissolves. You are the easiest person to open my heart to.",
    icon: "💬"
  },
  {
    id: 7,
    theme: "The little things that remind me of you",
    title: "You in Every Detail",
    note: "Soft pink skies, pretty stationery, cozy cafes, a song with sweet melodies — everywhere I look, there is something that whispers your name.",
    icon: "🌷"
  },
  {
    id: 8,
    theme: "The memories I want to make with you",
    title: "Our Unwritten Pages",
    note: "From simple neighborhood strolls to celebrating milestone after milestone together, I look forward to filling every future chapter with you.",
    icon: "📖"
  },
  {
    id: 9,
    theme: "The way I look forward to hearing from you",
    title: "My Favourite Notification",
    note: "No matter how busy the hours get, seeing your name pop up on my screen brings an instant grin that never fades. You brighten every hour.",
    icon: "💌"
  },
  {
    id: 10,
    theme: "Your unique way of being yourself",
    title: "One of a Kind",
    note: "You never pretend or try to be someone else. Your authenticity, your cute quirks, and your genuine nature are what make you completely irreplaceable.",
    icon: "⭐"
  },
  {
    id: 11,
    theme: "The laughter we share",
    title: "Our Shared Giggles",
    note: "The funny moments that only we understand, the quiet laughs that bubble up unexpectedly — there is no sweeter sound than you laughing happily.",
    icon: "🧸"
  },
  {
    id: 12,
    theme: "The things I am still excited to discover about you",
    title: "Endless Wonder",
    note: "Even with how much I love you today, I love knowing there are a million little details, thoughts, and dreams of yours I still get to learn.",
    icon: "🔍"
  },
  {
    id: 13,
    theme: "Your dreams",
    title: "Cheering for You Always",
    note: "Your ambitions, your goals, and everything you hope to achieve matter so deeply to me. I will always be your biggest cheerleader in the front row.",
    icon: "🚀"
  },
  {
    id: 14,
    theme: "Your strength",
    title: "Quiet Resilience",
    note: "You handle challenges with so much dignity and grace. Your inner strength and resilience inspire me more than you could ever know.",
    icon: "💎"
  },
  {
    id: 15,
    theme: "The joy of celebrating you",
    title: "Today is All Yours",
    note: "Celebrating you today feels like the easiest, happiest thing in the world because you deserve to feel celebrated not just today, but every day.",
    icon: "🎂"
  },
  {
    id: 16,
    theme: "The small moments that become big memories",
    title: "The Heart's Keepsakes",
    note: "A shared look across the room, a warm hug at the end of the day, a sweet message just to say hello — these small moments are the ones I keep closest.",
    icon: "📸"
  },
  {
    id: 17,
    theme: "The future I hope we build",
    title: "Growing Side by Side",
    note: "I pray for a lifetime where we encourage each other, build each other up, and watch our love grow deeper and more beautiful with each passing year.",
    icon: "🏡"
  },
  {
    id: 18,
    theme: "The adventures we have yet to experience",
    title: "Worlds to Explore",
    note: "Every city, every sunset spot, every new cafe we haven't visited yet — I can't wait to explore them all with your hand in mine.",
    icon: "🗺️"
  },
  {
    id: 19,
    theme: "The peace I wish for you",
    title: "Serenity & Calm",
    note: "Whenever the world feels loud or overwhelming, I hope you find solace in knowing you are loved, protected, and cherished unconditionally.",
    icon: "🌿"
  },
  {
    id: 20,
    theme: "The happiness I hope surrounds you",
    title: "An Abundance of Blessings",
    note: "May this 22nd year shower you with answered prayers, joyful surprises, genuine friendships, and every good thing your heart desires.",
    icon: "🌈"
  },
  {
    id: 21,
    theme: "Another birthday I hope to celebrate beside you, InshaAllah",
    title: "Our First of Many",
    note: "This is our very first birthday together as a couple, and InshaAllah, just the prelude to a long, beautiful lifetime of celebrating you side by side.",
    icon: "🕯️"
  },
  {
    id: 22,
    theme: "Because you are Salma, and you are deeply loved",
    title: "Simply You",
    note: "At the end of all the reasons, it comes down to this: you are Salma. My sweetheart, my heart, my favourite person. I love you more than words can say.",
    icon: "❤️"
  }
];

export const COUPONS: Coupon[] = [
  {
    id: "coupon-1",
    title: "THE UNLIMITED HUG PASS",
    subtitle: "Valid for endless warmth",
    description: "Redeem for the longest, warmest hug anytime you want, with zero time limit.",
    category: "Affection",
    color: "#F7B8CC",
    icon: "🤗"
  },
  {
    id: "coupon-2",
    title: "THE PRINCESS TREATMENT",
    subtitle: "A day fit for royalty",
    description: "One entire day of extra-special attention, pampering, compliments, and queen treatment.",
    category: "Pampering",
    color: "#D94868",
    icon: "👑"
  },
  {
    id: "coupon-3",
    title: "YOUR DREAM DATE",
    subtitle: "You pick, I arrange",
    description: "You choose the date idea and the vibe; I will help make every detail happen effortlessly.",
    category: "Date",
    color: "#C9859C",
    icon: "✨"
  },
  {
    id: "coupon-4",
    title: "MOVIE NIGHT — YOUR RULES",
    subtitle: "Your film, your snacks",
    description: "You get total control of the playlist, movie selection, cozy blankets, and snack choices.",
    category: "Cozy",
    color: "#6F4A4A",
    icon: "🎬"
  },
  {
    id: "coupon-5",
    title: "THE SWEETEST LOVE LETTER",
    subtitle: "Penned from the heart",
    description: "A handwritten physical letter from Ammar detailing all the little things I love about you.",
    category: "Romantic",
    color: "#D94868",
    icon: "💌"
  },
  {
    id: "coupon-6",
    title: "THE NO-REASON GIFT",
    subtitle: "A thoughtful surprise",
    description: "A little surprise present chosen especially for you, just because you crossed my mind.",
    category: "Surprise",
    color: "#F7B8CC",
    icon: "🎁"
  },
  {
    id: "coupon-7",
    title: "YOUR FAVOURITE FOOD DATE",
    subtitle: "Craving satisfied",
    description: "A delicious meal together featuring your absolute favourite dish or dessert.",
    category: "Food",
    color: "#C9859C",
    icon: "🍰"
  },
  {
    id: "coupon-8",
    title: "THE BAD-DAY RESCUE PASS",
    subtitle: "Instant comfort on demand",
    description: "Extra affection, patient listening, hot drinks, zero pressure, and comfort whenever you need it.",
    category: "Care",
    color: "#48253B",
    icon: "🩹"
  },
  {
    id: "coupon-9",
    title: "THE PHOTOBOOTH DATE",
    subtitle: "Framing our smiles",
    description: "A cute photo session to make silly faces, sweet poses, and freeze more memories together.",
    category: "Memory",
    color: "#D94868",
    icon: "📷"
  },
  {
    id: "coupon-10",
    title: "THE SUNSET DATE",
    subtitle: "Golden hour together",
    description: "A peaceful evening together watching the sky turn pink and gold, planned around your availability.",
    category: "Date",
    color: "#F7B8CC",
    icon: "🌅"
  },
  {
    id: "coupon-11",
    title: "THE SURPRISE ADVENTURE",
    subtitle: "Curated mystery",
    description: "A mystery mini-date whose details are kept secret until you redeem this ticket.",
    category: "Adventure",
    color: "#C9859C",
    icon: "🎟️"
  },
  {
    id: "coupon-12",
    title: "THE FOREVER PROMISE",
    subtitle: "A lifetime together",
    description: "A special promise letter about all the birthdays, memories, and milestones I hope we share, InshaAllah.",
    category: "Forever",
    color: "#48253B",
    icon: "♾️"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Who said “I love you” first?",
    options: ["Ammar", "Salma", "It was at the exact same moment!", "Neither, it was unspoken first"],
    correctIndex: 0,
    explanation: "Ammar could not wait another second to let you know how deeply he felt! ♡",
    reaction: "You remembered! That was such a special moment. 🥹"
  },
  {
    id: 2,
    question: "What is Salma's superpower in Ammar's eyes?",
    options: ["Her breathtaking smile", "Bringing instant calm to any day", "Her radiant kindness", "All of the above and more!"],
    correctIndex: 3,
    explanation: "Every single one of these makes you the extraordinary girl you are.",
    reaction: "100% correct! You truly have all of them. ✨"
  },
  {
    id: 3,
    question: "What makes this birthday celebration uniquely special?",
    options: [
      "It is Salma's 22nd birthday",
      "It is our very first birthday together as a couple",
      "It is the beginning of a lifetime of birthdays together",
      "All of the above!"
    ],
    correctIndex: 3,
    explanation: "Our first one together, and InshaAllah, a lifetime more side by side!",
    reaction: "Spot on! The first of countless beautiful birthdays. 🎂"
  },
  {
    id: 4,
    question: "What is Ammar's favourite thing about talking to Salma?",
    options: [
      "How easily hours pass like minutes",
      "Her sweet voice and cute laugh",
      "The comfort of sharing everything openly",
      "Every single conversation we have"
    ],
    correctIndex: 3,
    explanation: "There is never a dull second when I am with you.",
    reaction: "You know it! Talking to you is the best part of every day. 💬"
  },
  {
    id: 5,
    question: "What is our dream date vibe?",
    options: [
      "A cozy cafe with warm drinks and deep talks",
      "A peaceful sunset walk with gentle music",
      "A quiet dinner somewhere with fairy lights",
      "Anywhere as long as we are side by side"
    ],
    correctIndex: 3,
    explanation: "Location never matters as much as the girl sitting right next to me.",
    reaction: "Exactly! Anywhere with you is my favourite place. 🌸"
  },
  {
    id: 6,
    question: "What does Ammar wish for Salma on her 22nd year?",
    options: [
      "All the happiness and peace in the world",
      "All her biggest dreams and prayers answered",
      "Good health, endless laughter, and success",
      "All of these, plus endless love beside her"
    ],
    correctIndex: 3,
    explanation: "You deserve every ounce of joy and blessing this life can offer.",
    reaction: "A thousand times yes. May Allah grant you all of it! 🤲🏻"
  },
  {
    id: 7,
    question: "How much does Ammar love Salma?",
    options: [
      "More than words could ever explain 🫶🏻",
      "To the moon, the stars, and back",
      "Infinitely, today and for all the years to come",
      "All of these combined forever!"
    ],
    correctIndex: 3,
    explanation: "‘I love you more than words could ever explain. 🫶🏻❤️🩹’",
    reaction: "You got 100%! You have my whole heart forever. ❤️"
  }
];

export const PRIZE_WHEEL_ITEMS: PrizeItem[] = [
  {
    id: 0,
    label: "Love Letter",
    color: "#F7B8CC",
    rewardTitle: "A Secret Love Note ♡",
    rewardDescription: "“You make my heart lighter every single day. Happy birthday, my beautiful girl!”",
    icon: "💌"
  },
  {
    id: 1,
    label: "Virtual Hug",
    color: "#FFF8F1",
    rewardTitle: "One Giant Virtual Hug 🤗",
    rewardDescription: "Holding you warm and tight in my thoughts. Redeemable in person whenever you want!",
    icon: "🧸"
  },
  {
    id: 2,
    label: "Sweet Voice Note",
    color: "#FCE4EC",
    rewardTitle: "A Personal Voice Message 🎙️",
    rewardDescription: "Ammar owes you a sweet voice note singing Happy Birthday or whispering sweet words!",
    icon: "🎶"
  },
  {
    id: 3,
    label: "Mystery Coupon",
    color: "#C9859C",
    rewardTitle: "Golden Wildcard Coupon 🎟️",
    rewardDescription: "Redeem this for ONE special wish of your choice that Ammar must honor!",
    icon: "✨"
  },
  {
    id: 4,
    label: "Photo Reveal",
    color: "#FFF8F1",
    rewardTitle: "Cinematic Photo Spotlight 📸",
    rewardDescription: "Salma, your beauty is timeless. You light up every photo we take together.",
    icon: "🌸"
  },
  {
    id: 5,
    label: "Special Date Idea",
    color: "#F7B8CC",
    rewardTitle: "A Surprise Cafe Outing ☕",
    rewardDescription: "A relaxing cafe visit with hot chocolate, strawberry pastries, and cozy conversations.",
    icon: "🍰"
  },
  {
    id: 6,
    label: "Birthday Wish",
    color: "#FCE4EC",
    rewardTitle: "A Special Du'a & Wish 🤲🏻",
    rewardDescription: "May Allah protect your beautiful heart, keep you smiling, and bless our future together.",
    icon: "🕊️"
  },
  {
    id: 7,
    label: "Secret Reward",
    color: "#D94868",
    rewardTitle: "Ammar's Eternal Devotion 👑",
    rewardDescription: "You hold the permanent key to Ammar's heart today, tomorrow, and always.",
    icon: "❤️"
  }
];

export const TREASURE_CLUES: TreasureClue[] = [
  {
    id: 1,
    sectionId: "polaroid-reveal",
    clue: "Look near the grand polaroid frame that celebrates your world...",
    secretNote: "Treasure #1: The Golden Heart of Love! You found the first piece of Ammar's heart.",
    foundMessage: "1 of 3 Treasures Unlocked! Keep exploring below..."
  },
  {
    id: 2,
    sectionId: "arcade",
    clue: "Hidden inside the retro arcade zone where games are played...",
    secretNote: "Treasure #2: The Joyful Pixel Gem! You bring endless playfulness and laughter to my life.",
    foundMessage: "2 of 3 Treasures Unlocked! One secret heart remains..."
  },
  {
    id: 3,
    sectionId: "coupons",
    clue: "Tucked inside the Bank of Love where tickets are redeemed...",
    secretNote: "Treasure #3: The Forever Key! All 3 treasures gathered — the Secret Vault is now open!",
    foundMessage: "All 3 Treasures Collected! The Birthday Vault has unlocked! 🎉"
  }
];
