# StonelyFans — Product Specification for Claude Code

> **IMPORTANT**: This is a living spec for Claude Code. Build exactly to these specifications.

---

## Executive Summary

**StonelyFans** is a premium mobile-first social/dating platform where cannabis enthusiasts and adults exploring the lifestyle can connect, share experiences, and discover community. Think "upscale smoking lounge meets modern dating app."

**No backend/data persistence required** — This is a frontend-only prototype with mock data.

---

## 1. Core Concept & Vision

### The Elevator Pitch
> "Where stoners find their tribe — connect, share war stories, live chat, and discover your people in a judgment-free space."

### Target Audience
- **Primary**: Cannabis enthusiasts (21+) seeking genuine connections
- **Secondary**: Adults curious about or "dipping toes" into cannabis culture
- **Tertiary**: Those seeking 420-friendly dating/friendship without stigma

### Core Value Props
1. **No Judgment Zone** — A space where cannabis use is celebrated, not hidden
2. **Real Connections** — Beyond hookups: find smoking buddies, share experiences, build community
3. **Premium Experience** — Elevated aesthetic that matches the refined cannabis culture emerging today

### Brand Personality
- Sophisticated yet approachable
- Warm and inclusive
- Subtly playful without being juvenile
- Premium without pretension

---

## 2. Technical Stack

### Required Stack

```
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS v3.4+
Animation: anime.js (REQUIRED - not Framer Motion)
Language: TypeScript
i18n: next-intl (English + German)
Icons: Lucide React
Fonts: Google Fonts (Cormorant Garamond + Outfit)
```

### Package.json Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "animejs": "^3.2.2",
    "next-intl": "^3.0.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/animejs": "^3.1.12",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

### No Data Storage

- All data is mock/hardcoded
- State lives in React state only (useState, useReducer)
- No localStorage, no database, no API calls
- Profiles, matches, messages are all mock data

---

## 3. Internationalization (i18n)

### Supported Languages
- **English (en)** — Default
- **German (de)** — Full translation

### Critical Translations

```typescript
// messages/en.json
{
  "match": {
    "title": "It's a Vibe!",
    "subtitle": "You both liked each other",
    "sendMessage": "Send Message",
    "keepSwiping": "Keep Swiping"
  },
  "swipe": {
    "like": "VIBE",
    "pass": "PASS",
    "superlike": "SOULMATE"
  },
  "chat": {
    "quickActions": {
      "smoke": "Smoke?",
      "chill": "Chill vibes",
      "video": "Video call?",
      "hangout": "Hang out?",
      "vibing": "Just vibing",
      "joint": "Roll one?"
    }
  }
}

// messages/de.json
{
  "match": {
    "title": "Bääääämbuuu!",
    "subtitle": "Gits eine?",
    "sendMessage": "Nachricht senden",
    "keepSwiping": "Weiter swipen"
  },
  "swipe": {
    "like": "VIBE",
    "pass": "PASS",
    "superlike": "SEELENVERWANDT"
  },
  "chat": {
    "quickActions": {
      "smoke": "Rauchen?",
      "chill": "Chill vibes",
      "video": "Videocall?",
      "hangout": "Abhängen?",
      "vibing": "Einfach chillen",
      "joint": "Einen drehen?"
    }
  }
}
```

### i18n File Structure

```
messages/
├── en.json
└── de.json

app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── discover/
│   ├── match/
│   ├── chat/
│   │   └── [conversationId]/
│   └── profile/
│       └── [userId]/
```

### Language Switcher
- Accessible from header or settings
- Persists via URL path (`/en/...` or `/de/...`)
- Smooth transition, no page reload feeling

---

## 4. Design Language

### Aesthetic Direction: "Velvet Smoking Lounge"

A fusion of:
- **Speakeasy intimacy** — Dark, warm, inviting
- **Modern luxury** — Clean lines, premium materials
- **Cannabis culture** — Organic, natural, earthy undertones
- **Late-night ambiance** — Glowing embers, soft smoke, intimate lighting

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base - The Lounge
        lounge: {
          black: '#080808',
          charcoal: '#111111',
          smoke: '#1a1a1a',
          ember: '#1f1410',
        },
        // Accent - Rose/Blush (Primary Action)
        rose: {
          DEFAULT: '#8b4d62',
          dark: '#5c3344',
          blush: '#b76e79',
        },
        // Accent - Gold (Premium)
        gold: {
          DEFAULT: '#c9a962',
          light: '#e8d5a3',
        },
        // Accent - Green (Cannabis/Positive)
        green: {
          DEFAULT: '#4a7c59',
          light: '#6b9b7a',
        },
        // Text
        text: {
          primary: '#f5f0eb',
          secondary: '#9a9590',
          muted: '#5a5550',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
        'glass-strong': 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        'glow-rose': 'radial-gradient(circle, rgba(139,77,98,0.5) 0%, transparent 70%)',
        'glow-gold': 'radial-gradient(circle, rgba(201,169,98,0.4) 0%, transparent 70%)',
        'glow-green': 'radial-gradient(circle, rgba(74,124,89,0.4) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-rose': '0 0 40px rgba(139, 77, 98, 0.5)',
        'glow-gold': '0 0 40px rgba(201, 169, 98, 0.4)',
        'glow-green': '0 0 40px rgba(74, 124, 89, 0.4)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
```

### Global Styles (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garabond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

@layer base {
  html {
    @apply bg-lounge-black text-text-primary font-body;
    -webkit-tap-highlight-color: transparent;
  }
  
  body {
    @apply min-h-screen overflow-x-hidden;
  }
}

@layer components {
  .glass {
    @apply bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm;
  }
  
  .glass-strong {
    @apply bg-white/[0.06] border border-white/[0.1] backdrop-blur-md;
  }
  
  .btn-primary {
    @apply bg-gradient-to-br from-rose to-rose-dark text-white 
           shadow-glow-rose rounded-2xl font-medium
           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98];
  }
  
  .btn-secondary {
    @apply glass rounded-2xl font-medium text-text-primary
           transition-all duration-200 hover:bg-white/[0.06];
  }
}

@layer utilities {
  .safe-bottom {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
  
  .safe-top {
    padding-top: max(16px, env(safe-area-inset-top));
  }
}

/* Noise texture overlay */
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Vignette effect */
.vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Typography Usage

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Brand name | Cormorant Garamond | 500 | 1.4rem |
| Section titles | Cormorant Garamond | 500 | 1.3rem |
| Profile names | Cormorant Garamond | 500 | 1.8rem |
| Match modal title | Cormorant Garamond | 600 | 2.2rem |
| Body text | Outfit | 400 | 0.9rem |
| UI labels | Outfit | 500 | 0.8rem |
| Badges/tags | Outfit | 500 | 0.7rem |
| Metadata | Outfit | 400 | 0.75rem |

---

## 5. Branding Guidelines

### Logo
- **Source**: `https://i.ibb.co/TDqB2LzW/9761-A41-E-FDED-4-E46-BC8-E-6-F33651-E111-A.png`
- **Usage**: Header (34x34px), match modal, splash screens
- **Treatment**: Rounded corners (8px), no additional effects needed

### Brand Name Typography
```jsx
<span className="font-display text-xl font-medium text-text-primary">
  Stonely<span className="text-gold">Fans</span>
</span>
```

### Brand Colors in Context

| Context | Primary Color | Secondary |
|---------|---------------|-----------|
| Primary buttons | Rose gradient | - |
| Like/match actions | Rose | Green accent |
| Pass actions | Red (#eb5757) | - |
| Super like | Gold | - |
| Cannabis-related | Green | Gold accent |
| Online status | #6fcf97 | - |
| Premium/verified | Gold | - |
| Text links | Gold | Gold-light hover |

### Consistent Badge Styles

```jsx
// Verified badge
<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gold border border-gold/30 rounded-lg bg-black/50 backdrop-blur">
  <CheckCircle className="w-3 h-3" />
  Verified
</span>

// Online badge
<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#6fcf97] rounded-lg bg-black/50 backdrop-blur">
  <span className="w-1.5 h-1.5 bg-[#6fcf97] rounded-full animate-pulse" />
  Online
</span>

// Cannabis badge
<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-light border border-green/30 rounded-lg bg-black/50 backdrop-blur">
  🍃 420 Friendly
</span>
```

---

## 6. App Structure & Navigation

### Information Architecture

```
StonelyFans
├── Discover (Home)
│   ├── Stories Row
│   ├── Featured Profiles
│   ├── Vibe Filters
│   └── Nearby Users
│
├── Match (Swipe Interface)
│   ├── Card Stack
│   ├── Action Bar
│   └── Match Celebration Modal
│
├── Chat
│   ├── Conversations List (swipeable to switch)
│   ├── Conversation View
│   │   ├── Messages
│   │   ├── Quick Action Emoji Bar
│   │   └── Input
│   └── Video/Voice Call UI
│
├── Profile (View)
│   ├── Hero Image + Badges
│   ├── War Stories (Hinge-style prompts)
│   ├── Smoking Preferences
│   ├── Favorite Strains
│   └── Interests
│
└── My Profile (Edit)
    ├── Single Photo (required)
    ├── War Stories Editor
    ├── Preferences
    └── Settings + Language
```

### Bottom Navigation (4 Items)

```jsx
const navItems = [
  { icon: Compass, label: 'discover', href: '/discover' },
  { icon: Layers, label: 'match', href: '/match' },
  { icon: MessageCircle, label: 'chat', href: '/chat' },
  { icon: User, label: 'profile', href: '/profile/me' },
]
```

### Navigation Component

```jsx
// components/layout/bottom-nav.tsx
export function BottomNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')
  
  return (
    <nav className="fixed bottom-0 inset-x-0 glass border-t border-white/[0.08] safe-bottom z-50">
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors relative",
                isActive ? "text-gold" : "text-text-muted hover:text-text-secondary"
              )}
            >
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium uppercase tracking-wide">
                {t(label)}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

---

## 7. Page Specifications

### 7.1 Discover Page

**Purpose:** Browse and explore profiles, see who's online, filter by preferences

**Components:**
1. **Header** — Logo + Brand name + Notifications + Language toggle
2. **Stories Row** — Horizontal scroll, gradient ring avatars
3. **Vibe Banner** — CTA to Match page with animated background
4. **Featured Grid** — Hero card + 2-column grid
5. **Vibe Filter Pills** — Horizontal scroll strain filters
6. **Nearby List** — Card list with avatars, distance, tags

### 7.2 Match Page (Swipe Interface)

**Purpose:** Tinder-style card swiping to find connections

**Card Stack Behavior (anime.js):**
```typescript
// Swipe animation config
const swipeConfig = {
  duration: 400,
  easing: 'easeOutExpo',
  swipeThreshold: 100,
  rotationFactor: 0.1,
}

// Card swipe out
anime({
  targets: cardRef.current,
  translateX: direction === 'right' ? 500 : -500,
  rotate: direction === 'right' ? 15 : -15,
  opacity: 0,
  duration: swipeConfig.duration,
  easing: swipeConfig.easing,
})
```

**Swipe Indicators:**
- Right swipe: "VIBE" (green)
- Left swipe: "PASS" (red)
- Up swipe: "SOULMATE" / "SEELENVERWANDT" (gold)

**Match Celebration Modal:**
```jsx
// English
<h1 className="font-display text-4xl font-semibold">It's a Vibe!</h1>
<p className="text-text-secondary">You both liked each other</p>

// German
<h1 className="font-display text-4xl font-semibold">Bääääämbuuu!</h1>
<p className="text-text-secondary">Gits eine?</p>
```

### 7.3 Chat Page — SWIPEABLE CONVERSATIONS

**Critical Feature:** The chat list is horizontally swipeable to switch between conversations.

**Implementation:**
```tsx
// Swipe between conversations
const [currentChatIndex, setCurrentChatIndex] = useState(0)

// Swipe gesture handling
const handleSwipe = (direction: 'left' | 'right') => {
  if (direction === 'left' && currentChatIndex < conversations.length - 1) {
    animateToChat(currentChatIndex + 1)
  } else if (direction === 'right' && currentChatIndex > 0) {
    animateToChat(currentChatIndex - 1)
  }
}

// anime.js transition
const animateToChat = (index: number) => {
  anime({
    targets: chatContainerRef.current,
    translateX: -index * window.innerWidth,
    duration: 300,
    easing: 'easeOutCubic',
  })
  setCurrentChatIndex(index)
}
```

**Chat Indicators:**
- Dots or mini avatars at top showing position
- Swipe hint on first use
- Edge peek of adjacent conversations

### 7.4 Chat Quick Action Bar — CUSTOM EMOJI BAR

**Critical Feature:** Above the keyboard, a horizontal scrollable bar with on-brand quick actions.

```tsx
const quickActions = [
  { emoji: '🍃', labelKey: 'smoke' },      // "Smoke?" / "Rauchen?"
  { emoji: '😌', labelKey: 'chill' },      // "Chill vibes"
  { emoji: '📹', labelKey: 'video' },      // "Video call?" / "Videocall?"
  { emoji: '🏠', labelKey: 'hangout' },    // "Hang out?" / "Abhängen?"
  { emoji: '✨', labelKey: 'vibing' },     // "Just vibing" / "Einfach chillen"
  { emoji: '🚬', labelKey: 'joint' },      // "Roll one?" / "Einen drehen?"
]

// Component
export function QuickActionBar({ onSelect }: { onSelect: (message: string) => void }) {
  const t = useTranslations('chat.quickActions')
  
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 border-t border-white/[0.08] bg-lounge-charcoal/80 backdrop-blur">
      {quickActions.map(({ emoji, labelKey }) => (
        <button
          key={labelKey}
          onClick={() => onSelect(t(labelKey))}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full glass whitespace-nowrap
                     text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.06]
                     transition-all shrink-0"
        >
          <span>{emoji}</span>
          <span>{t(labelKey)}</span>
        </button>
      ))}
    </div>
  )
}
```

**Position:** 
- Sticky above keyboard
- Scrollable horizontally
- Tapping sends that message directly OR inserts into input

### 7.5 Profile Page

**Single Photo Only (for now):**
- One hero image required
- No photo gallery/grid
- Full-bleed with gradient overlay

**War Stories (Hinge-style Prompts):**

Replace traditional bio with prompted responses:

```typescript
const warStoryPrompts = {
  en: [
    "My most legendary smoke session was...",
    "The strain that changed my life...",
    "You should swipe right if...",
    "My ideal smoke buddy is someone who...",
    "The weirdest place I've ever smoked...",
    "I'm looking for someone to...",
    "My controversial cannabis opinion is...",
    "The perfect sesh includes...",
  ],
  de: [
    "Meine legendärste Smoke Session war...",
    "Die Sorte, die mein Leben verändert hat...",
    "Du solltest nach rechts swipen, wenn...",
    "Mein idealer Smoke Buddy ist jemand, der...",
    "Der verrückteste Ort, an dem ich je geraucht habe...",
    "Ich suche jemanden, der...",
    "Meine kontroverse Cannabis-Meinung ist...",
    "Die perfekte Sesh beinhaltet...",
  ]
}
```

**Profile Structure:**
```jsx
<section className="space-y-6">
  {/* Hero Image */}
  <div className="relative h-[50vh]">
    <img src={profile.photo} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-lounge-black via-lounge-black/50 to-transparent" />
    {/* Name, badges overlay */}
  </div>
  
  {/* War Stories */}
  <div className="px-4 space-y-4">
    <h3 className="font-display text-lg text-text-primary flex items-center gap-2">
      <span>💭</span> {t('warStories')}
    </h3>
    {profile.warStories.map((story, i) => (
      <div key={i} className="glass rounded-2xl p-4">
        <p className="text-sm text-gold mb-2">{story.prompt}</p>
        <p className="text-text-primary">{story.answer}</p>
      </div>
    ))}
  </div>
  
  {/* Smoking Preferences */}
  {/* Favorite Strains */}
  {/* Interests */}
</section>
```

---

## 8. Feature Set (MVP)

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| Profile Creation | Single photo, war stories, smoking prefs, strains | ✅ Build |
| Swipe Matching | Card swiping with like/pass/superlike | ✅ Build |
| Chat | Swipeable conversations with quick action bar | ✅ Build |
| Discover Feed | Browse profiles, filter by vibe | ✅ Build |
| i18n | English + German with cultural adaptations | ✅ Build |
| Stories | 24-hour ephemeral posts | ⏸️ Later |
| Video Chat | Live video calls | ⏸️ Later |

### Cannabis-Specific Features

| Feature | Description |
|---------|-------------|
| Strain Preferences | Sativa/Indica/Hybrid selection |
| Consumption Method | Joints, Bongs, Edibles, Vapes, Dabs |
| Tolerance Level | Lightweight → Iron Lungs |
| Sesh Availability | When are you down to smoke? |
| Vibe Filters | Filter matches by strain preference |
| War Stories | Hinge-style prompted responses |

### NOT Building (Removed)

- ❌ Local Dispensary Recs
- ❌ Events
- ❌ Groups
- ❌ Age Verification
- ❌ Photo Verification
- ❌ Safe Meeting Guides
- ❌ Strain Reviews

### Safety Features (Minimal)

| Feature | Description |
|---------|-------------|
| Block & Report | Basic safety controls |
| Incognito Mode | Browse without being seen |

---

## 9. Animation Specifications (anime.js)

### Required anime.js Import

```typescript
import anime from 'animejs'
```

### Page Transitions

```typescript
// Page enter
anime({
  targets: pageRef.current,
  opacity: [0, 1],
  translateX: [20, 0],
  duration: 300,
  easing: 'easeOutCubic',
})

// Page exit
anime({
  targets: pageRef.current,
  opacity: [1, 0],
  translateX: [0, -20],
  duration: 200,
  easing: 'easeInCubic',
})
```

### Card Swipe Animation

```typescript
const animateSwipe = (card: HTMLElement, direction: 'left' | 'right' | 'up') => {
  const translations = {
    left: { x: -500, rotate: -15 },
    right: { x: 500, rotate: 15 },
    up: { y: -500, rotate: 0 },
  }
  
  anime({
    targets: card,
    translateX: translations[direction].x || 0,
    translateY: translations[direction].y || 0,
    rotate: translations[direction].rotate,
    opacity: 0,
    duration: 400,
    easing: 'easeOutExpo',
  })
}
```

### Match Celebration

```typescript
const celebrateMatch = () => {
  // Fade in overlay
  anime({
    targets: '.match-overlay',
    opacity: [0, 1],
    duration: 300,
    easing: 'easeOutCubic',
  })
  
  // Slide up content
  anime({
    targets: '.match-content',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 500,
    delay: 200,
    easing: 'easeOutExpo',
  })
  
  // Falling leaves
  const leaves = ['🍃', '🌿', '☘️', '💨', '✨']
  for (let i = 0; i < 20; i++) {
    const leaf = document.createElement('div')
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)]
    leaf.className = 'match-leaf absolute text-xl pointer-events-none'
    leaf.style.left = `${Math.random() * 100}%`
    leaf.style.top = '-20px'
    document.querySelector('.match-leaves')?.appendChild(leaf)
    
    anime({
      targets: leaf,
      translateY: window.innerHeight + 50,
      translateX: anime.random(-100, 100),
      rotate: anime.random(360, 720),
      opacity: [1, 0],
      duration: anime.random(3000, 5000),
      delay: anime.random(0, 1000),
      easing: 'easeInQuad',
      complete: () => leaf.remove(),
    })
  }
}
```

### Smoke Particles (Background Effect)

```typescript
const createSmokeEffect = (container: HTMLElement) => {
  const particleCount = 8
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'smoke-particle absolute rounded-full pointer-events-none'
    particle.style.cssText = `
      width: ${anime.random(80, 200)}px;
      height: ${anime.random(80, 200)}px;
      background: radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%);
      left: ${anime.random(0, 100)}%;
      bottom: 0;
      filter: blur(20px);
    `
    container.appendChild(particle)
    
    anime({
      targets: particle,
      translateY: [0, -window.innerHeight - 200],
      translateX: anime.random(-50, 50),
      opacity: [anime.random(0.02, 0.06), 0],
      scale: [1, anime.random(1.5, 2.5)],
      duration: anime.random(15000, 25000),
      easing: 'linear',
      loop: true,
    })
  }
}
```

### Ember Particles

```typescript
const createEmberEffect = (container: HTMLElement) => {
  setInterval(() => {
    const ember = document.createElement('div')
    ember.className = 'ember absolute rounded-full'
    ember.style.cssText = `
      width: 3px;
      height: 3px;
      background: #c9a962;
      box-shadow: 0 0 6px #c9a962, 0 0 12px rgba(201, 169, 98, 0.5);
      left: ${anime.random(10, 90)}%;
      bottom: 0;
    `
    container.appendChild(ember)
    
    anime({
      targets: ember,
      translateY: [0, anime.random(-300, -500)],
      translateX: anime.random(-30, 30),
      opacity: [1, 0],
      duration: anime.random(4000, 6000),
      easing: 'easeOutQuad',
      complete: () => ember.remove(),
    })
  }, 2000)
}
```

### Chat Swipe Animation

```typescript
const animateChatSwipe = (
  container: HTMLElement,
  fromIndex: number,
  toIndex: number
) => {
  anime({
    targets: container,
    translateX: -toIndex * window.innerWidth,
    duration: 300,
    easing: 'easeOutCubic',
  })
}
```

---

## 10. Mock Data Structure

```typescript
// types/index.ts
export interface Profile {
  id: string
  name: string
  age: number
  photo: string // Single photo URL
  location: string
  distance: string
  online: boolean
  
  // War Stories (Hinge-style)
  warStories: {
    prompt: string
    answer: string
  }[]
  
  // Cannabis Preferences
  strainType: 'sativa' | 'indica' | 'hybrid' | 'all'
  method: string[] // ['joints', 'edibles', 'bongs', etc.]
  frequency: 'daily' | 'weekly' | 'social' | 'special'
  tolerance: 'lightweight' | 'moderate' | 'veteran' | 'ironLungs'
  favoriteStrains: string[]
  
  // General
  interests: string[]
  availability: string
}

export interface Conversation {
  id: string
  matchId: string
  profile: Profile
  messages: Message[]
  lastMessage: string
  lastMessageTime: Date
  unread: number
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
}
```

### Sample Mock Data

```typescript
// lib/mock-data.ts
export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Jasmine',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',
    location: 'Los Angeles',
    distance: '2 miles',
    online: true,
    warStories: [
      {
        prompt: "My most legendary smoke session was...",
        answer: "On a rooftop in Barcelona watching the sunset with strangers who became friends. We didn't speak the same language but vibes are universal 🌅"
      },
      {
        prompt: "You should swipe right if...",
        answer: "You appreciate deep conversations, good music, and don't take life too seriously"
      }
    ],
    strainType: 'sativa',
    method: ['joints', 'edibles'],
    frequency: 'daily',
    tolerance: 'moderate',
    favoriteStrains: ['Lemon Haze', 'Blue Dream', 'Jack Herer'],
    interests: ['Live Music', 'Art', 'Hiking', 'Cooking'],
    availability: 'After 7 PM'
  },
  // ... more profiles
]
```

---

## 11. File Structure

```
stonelyfans/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Redirects to /discover
│   │   ├── discover/
│   │   │   └── page.tsx
│   │   ├── match/
│   │   │   └── page.tsx
│   │   ├── chat/
│   │   │   ├── page.tsx          # Swipeable chat list
│   │   │   └── [conversationId]/
│   │   │       └── page.tsx
│   │   └── profile/
│   │       ├── me/
│   │       │   └── page.tsx      # Own profile + edit
│   │       └── [userId]/
│   │           └── page.tsx      # View other profile
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   └── card.tsx
│   ├── features/
│   │   ├── swipe-card.tsx
│   │   ├── swipe-stack.tsx
│   │   ├── match-modal.tsx
│   │   ├── quick-action-bar.tsx
│   │   ├── story-ring.tsx
│   │   ├── profile-hero.tsx
│   │   ├── war-story-card.tsx
│   │   └── chat-bubble.tsx
│   ├── layout/
│   │   ├── bottom-nav.tsx
│   │   ├── header.tsx
│   │   └── page-container.tsx
│   └── effects/
│       ├── atmosphere.tsx        # Smoke + ember + ambient lights
│       ├── noise-overlay.tsx
│       ├── vignette.tsx
│       └── falling-leaves.tsx
├── lib/
│   ├── utils.ts                  # cn() helper
│   ├── animations.ts             # anime.js helpers
│   ├── mock-data.ts              # All mock data
│   └── constants.ts
├── hooks/
│   ├── use-swipe-gesture.ts
│   └── use-chat-swipe.ts
├── types/
│   └── index.ts
├── messages/
│   ├── en.json
│   └── de.json
├── public/
│   └── logo.png
├── tailwind.config.js
├── next.config.js                # i18n config
└── package.json
```

---

## 12. Key Component Specifications

### Swipe Stack Component

```tsx
// components/features/swipe-stack.tsx
'use client'

import { useRef, useState } from 'react'
import anime from 'animejs'
import { Profile } from '@/types'
import { SwipeCard } from './swipe-card'
import { MatchModal } from './match-modal'

interface SwipeStackProps {
  profiles: Profile[]
}

export function SwipeStack({ profiles }: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (!cardRef.current) return
    
    // Animate card out
    const translations = {
      left: { x: -500, rotate: -15, y: 0 },
      right: { x: 500, rotate: 15, y: 0 },
      up: { x: 0, rotate: 0, y: -500 },
    }
    
    anime({
      targets: cardRef.current,
      translateX: translations[direction].x,
      translateY: translations[direction].y,
      rotate: translations[direction].rotate,
      opacity: 0,
      duration: 400,
      easing: 'easeOutExpo',
      complete: () => {
        // Check for match (random 30% chance for demo)
        if (direction === 'right' && Math.random() > 0.7) {
          setMatchedProfile(profiles[currentIndex])
          setShowMatch(true)
        }
        setCurrentIndex(prev => prev + 1)
      }
    })
  }
  
  // Render stack of 3 cards
  return (
    <div className="relative flex-1 flex items-center justify-center">
      {profiles.slice(currentIndex, currentIndex + 3).map((profile, i) => (
        <SwipeCard
          key={profile.id}
          ref={i === 0 ? cardRef : undefined}
          profile={profile}
          stackPosition={i}
          onSwipe={i === 0 ? handleSwipe : undefined}
        />
      ))}
      
      <MatchModal
        show={showMatch}
        profile={matchedProfile}
        onClose={() => setShowMatch(false)}
      />
    </div>
  )
}
```

### Quick Action Bar

```tsx
// components/features/quick-action-bar.tsx
'use client'

import { useTranslations } from 'next-intl'

const quickActions = [
  { emoji: '🍃', labelKey: 'smoke' },
  { emoji: '😌', labelKey: 'chill' },
  { emoji: '📹', labelKey: 'video' },
  { emoji: '🏠', labelKey: 'hangout' },
  { emoji: '✨', labelKey: 'vibing' },
  { emoji: '🚬', labelKey: 'joint' },
] as const

interface QuickActionBarProps {
  onSelect: (message: string) => void
}

export function QuickActionBar({ onSelect }: QuickActionBarProps) {
  const t = useTranslations('chat.quickActions')
  
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-4 border-t border-white/[0.08] bg-lounge-charcoal/80 backdrop-blur scrollbar-hide">
      {quickActions.map(({ emoji, labelKey }) => (
        <button
          key={labelKey}
          onClick={() => onSelect(t(labelKey))}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full glass whitespace-nowrap
                     text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.06]
                     transition-all shrink-0 active:scale-95"
        >
          <span className="text-base">{emoji}</span>
          <span>{t(labelKey)}</span>
        </button>
      ))}
    </div>
  )
}
```

### Match Modal

```tsx
// components/features/match-modal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import anime from 'animejs'
import { Profile } from '@/types'

interface MatchModalProps {
  show: boolean
  profile: Profile | null
  onClose: () => void
}

export function MatchModal({ show, profile, onClose }: MatchModalProps) {
  const t = useTranslations('match')
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (show && overlayRef.current && contentRef.current && leavesRef.current) {
      // Animate in
      anime({
        targets: overlayRef.current,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic',
      })
      
      anime({
        targets: contentRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 200,
        easing: 'easeOutExpo',
      })
      
      // Falling leaves celebration
      const leaves = ['🍃', '🌿', '☘️', '💨', '✨']
      for (let i = 0; i < 20; i++) {
        const leaf = document.createElement('div')
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)]
        leaf.className = 'absolute text-xl pointer-events-none'
        leaf.style.left = `${Math.random() * 100}%`
        leaf.style.top = '-20px'
        leavesRef.current.appendChild(leaf)
        
        anime({
          targets: leaf,
          translateY: window.innerHeight + 50,
          translateX: anime.random(-100, 100),
          rotate: anime.random(360, 720),
          opacity: [1, 0],
          duration: anime.random(3000, 5000),
          delay: anime.random(0, 1000),
          easing: 'easeInQuad',
          complete: () => leaf.remove(),
        })
      }
    }
  }, [show])
  
  if (!show || !profile) return null
  
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-lounge-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
      style={{ opacity: 0 }}
    >
      <div ref={leavesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
      
      <div ref={contentRef} className="text-center" style={{ opacity: 0 }}>
        {/* Match icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green to-rose flex items-center justify-center shadow-glow-rose">
          <span className="text-4xl">💚</span>
        </div>
        
        {/* Title - Localized */}
        <h1 className="font-display text-4xl font-semibold text-text-primary mb-2">
          {t('title')}
        </h1>
        <p className="text-text-secondary mb-8">
          {t('subtitle')}
        </p>
        
        {/* Profile photos */}
        <div className="flex justify-center items-center mb-10">
          <img
            src="/mock-user.jpg"
            alt="You"
            className="w-20 h-20 rounded-full object-cover border-2 border-lounge-charcoal translate-x-4 z-10"
          />
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-lounge-charcoal -translate-x-4"
          />
        </div>
        
        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full btn-primary py-4 text-lg">
            {t('sendMessage')}
          </button>
          <button
            onClick={onClose}
            className="w-full btn-secondary py-4 text-lg"
          >
            {t('keepSwiping')}
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## 13. Checklist for Claude Code

### Setup
- [ ] Initialize Next.js 14+ with App Router
- [ ] Configure Tailwind with custom theme
- [ ] Setup next-intl for i18n (en + de)
- [ ] Install anime.js and types
- [ ] Add Google Fonts (Cormorant Garamond + Outfit)

### Core Layout
- [ ] Atmosphere effects (smoke, embers, ambient lights)
- [ ] Noise overlay + vignette
- [ ] Bottom navigation (4 tabs)
- [ ] Header with logo + brand name
- [ ] Language switcher

### Pages
- [ ] Discover page with all sections
- [ ] Match page with swipe stack
- [ ] Chat page with swipeable conversations
- [ ] Chat conversation view with quick action bar
- [ ] Profile view with war stories
- [ ] My profile edit page

### Features
- [ ] Card swipe gestures + animations (anime.js)
- [ ] Match celebration modal ("Bääääämbuuu!" in German)
- [ ] Quick action emoji bar in chat
- [ ] Swipeable chat navigation
- [ ] War stories (Hinge-style prompts)
- [ ] Single photo requirement

### Branding
- [ ] Logo properly placed
- [ ] Brand name with gold "Fans"
- [ ] Consistent badge styles
- [ ] Color usage per context guide
- [ ] Typography hierarchy

### i18n
- [ ] All UI strings translated
- [ ] Match modal: "Bääääämbuuu!" / "Gits eine?"
- [ ] Quick actions translated
- [ ] War story prompts in both languages
- [ ] Language switcher functional

### Polish
- [ ] Safe area handling (iOS)
- [ ] Touch targets ≥ 44px
- [ ] Reduced motion support
- [ ] Smooth 60fps animations
- [ ] Glass morphism consistent

---

*Built with 🍃 for the community*

