/**
 * ====================================================================
 * THE DIYA EDIT — ISSUE NO. 21
 * SOUL MOMENTS: MEMORY ARCHIVE DATA
 * ====================================================================
 * 
 * To add or replace memory photographs:
 * 1. Place your photograph in 'assets/images/memories/' (e.g. kenkey-memory.jpg)
 * 2. Add or edit an entry in the 'memoriesArchive' array below.
 * 3. Choose category: 'shs', 'laughter', 'candid', or 'sisterhood'.
 */

export const memoriesArchive = [
  {
    id: "kenkey-chronicles",
    title: "The Kenkey Chronicles",
    category: "shs",
    categoryLabel: "SHS DAYS · A MEMORY TO KEEP",
    isFeatured: true,
    image: "assets/images/memories/kenkey-memory.jpg",
    placeholderTheme: "kenkey",
    date: "Senior High School",
    tagline: "Breaking bounds, buying kenkey, sharing a meal.",
    caption: "Breaking bounds, buying kenkey, sharing a meal and having the longest conversations. Some memories become special because of how ordinary they seemed at the time.",
    note: "SHS canteen was never enough when the urge for hot Ga kenkey called!",
    rotation: -1.8,
    stamp: "ACCRA · SPECIAL"
  },
  {
    id: "gisting-dormitory",
    title: "Late Night Gisting & Endless Laughter",
    category: "laughter",
    categoryLabel: "UNFILTERED JOY",
    isFeatured: false,
    image: "assets/images/memories/gisting-dorm.jpg",
    placeholderTheme: "laughter",
    date: "Hostel Nights",
    tagline: "When lights out meant whispering till 3am.",
    caption: "The kind of laughter that made our stomachs ache. Whispering in the dark so the housemistress wouldn't hear, gisting about everything and nothing.",
    note: "Nobody tells a gist quite like Diya.",
    rotation: 2.2,
    stamp: "MEMORIES · FOREVER"
  },
  {
    id: "prayer-and-deen",
    title: "Holding Her Deen & Silent Prayers",
    category: "sisterhood",
    categoryLabel: "SPIRIT & GRACE",
    isFeatured: false,
    image: "assets/images/memories/deen-prayer.jpg",
    placeholderTheme: "prayer",
    date: "Faith & Reflection",
    tagline: "A genuine heart that takes Allah so seriously.",
    caption: "What we admire most is how you take Allah so serious, how you hold your deen. So prayerful, so beautiful inside and out. You inspire everyone around you.",
    note: "A soul wrapped in genuine barakah.",
    rotation: -2.5,
    stamp: "BARAKAH · 2026"
  },
  {
    id: "hard-work-and-growth",
    title: "The Academic Grind & Pushing Forward",
    category: "candid",
    categoryLabel: "AMBITION & DRIVE",
    isFeatured: false,
    image: "assets/images/memories/academic-grind.jpg",
    placeholderTheme: "study",
    date: "Late Study Sessions",
    tagline: "We see you pushing, we see you going all out.",
    caption: "I see you pushing, I see you going all out and I pray Allah blesses the work of your hands. May your name be mentioned in rooms where you’re not present.",
    note: "21 looks powerful on you.",
    rotation: 1.5,
    stamp: "FUTURE · GREATNESS"
  },
  {
    id: "showing-up-for-family",
    title: "Loved Like Family, Cared Like A Sister",
    category: "sisterhood",
    categoryLabel: "GENUINE CARE",
    isFeatured: false,
    image: "assets/images/memories/family-care.jpg",
    placeholderTheme: "sisterhood",
    date: "Through Thick & Thin",
    tagline: "Even when it comes to family, you actually show up.",
    caption: "The way you show concern, check up on me and even go out of your way to support me and my family means more than you can ever imagine.",
    note: "More than a friend—a true sister.",
    rotation: -1.2,
    stamp: "SISTERHOOD"
  },
  {
    id: "golden-hour-smiles",
    title: "Golden Hour Glow",
    category: "candid",
    categoryLabel: "PORTRAIT MOMENT",
    isFeatured: false,
    image: "assets/images/memories/golden-glow.jpg",
    placeholderTheme: "portrait",
    date: "Reunion Afternoon",
    tagline: "That rare kind of beautiful inside and out.",
    caption: "Some people make life a little more beautiful simply by being in it. That radiant smile that makes everybody feel at home.",
    note: "Radiant, timeless, unforgettable.",
    rotation: 2.8,
    stamp: "EDITION · NO. 21"
  }
];

export const memoryCategories = [
  { id: "all", label: "All Memories" },
  { id: "shs", label: "SHS Days" },
  { id: "laughter", label: "Gists & Laughter" },
  { id: "sisterhood", label: "Sisterhood & Deen" },
  { id: "candid", label: "Candids" }
];
