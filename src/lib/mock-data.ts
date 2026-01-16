// Mock data for StonelyFans

export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  location: string;
  distance: string;
  online: boolean;
  verified: boolean;
  warStories: {
    promptKey: string;
    answer: string;
  }[];
  strainType: "sativa" | "indica" | "hybrid" | "all";
  method: string[];
  frequency: "daily" | "weekly" | "social" | "special";
  tolerance: "lightweight" | "moderate" | "veteran" | "ironLungs";
  favoriteStrains: string[];
  interests: string[];
  availability: string;
  tags: string[];
  streamTag?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  matchId: string;
  profile: Profile;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
}

// Current user profile
export const currentUser: Profile = {
  id: "me",
  name: "You",
  age: 25,
  photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
  location: "Los Angeles",
  distance: "0 mi",
  online: true,
  verified: true,
  warStories: [
    {
      promptKey: "legendarySession",
      answer:
        "Watching the Northern Lights in Iceland while sharing a joint with strangers from 5 different countries. The sky was dancing and so were we.",
    },
    {
      promptKey: "swipeRightIf",
      answer:
        "You appreciate deep conversations about life, the universe, and everything in between. Bonus points if you can roll a perfect joint.",
    },
    {
      promptKey: "perfectSesh",
      answer:
        "Good music, cozy blankets, snacks within reach, and someone who knows when to talk and when to just vibe in comfortable silence.",
    },
  ],
  strainType: "hybrid",
  method: ["joints", "vapes"],
  frequency: "daily",
  tolerance: "veteran",
  favoriteStrains: ["Blue Dream", "Wedding Cake", "Gelato"],
  interests: ["Music", "Hiking", "Photography", "Cooking", "Gaming"],
  availability: "Evenings & Weekends",
  tags: ["420 Friendly", "Night Owl", "Creative"],
};

// Mock profiles
export const mockProfiles: Profile[] = [
  {
    id: "jasmine",
    name: "Jasmine",
    age: 24,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop",
    location: "Los Angeles",
    distance: "2 mi",
    online: true,
    verified: true,
    warStories: [
      {
        promptKey: "legendarySession",
        answer:
          "On a rooftop in Barcelona watching the sunset with strangers who became friends. We didn't speak the same language but vibes are universal.",
      },
      {
        promptKey: "swipeRightIf",
        answer:
          "You appreciate deep conversations, good music, and don't take life too seriously",
      },
    ],
    strainType: "sativa",
    method: ["joints", "edibles"],
    frequency: "daily",
    tolerance: "moderate",
    favoriteStrains: ["Lemon Haze", "Blue Dream", "Jack Herer"],
    interests: ["Live Music", "Art", "Hiking", "Cooking"],
    availability: "After 7 PM",
    tags: ["420 Friendly", "Night Owl", "Flirty"],
    streamTag: "Chill Sesh",
  },
  {
    id: "luna",
    name: "Luna",
    age: 26,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    location: "Venice Beach",
    distance: "3 mi",
    online: true,
    verified: true,
    warStories: [
      {
        promptKey: "strainThatChanged",
        answer:
          "Blue Dream. It was my first time feeling truly creative while high. Now I paint my best work elevated.",
      },
      {
        promptKey: "idealSmokeBuddy",
        answer:
          "Someone who can match my energy - whether that's going on adventures or just laying in bed watching documentaries.",
      },
    ],
    strainType: "hybrid",
    method: ["vapes", "joints"],
    frequency: "daily",
    tolerance: "veteran",
    favoriteStrains: ["Zkittlez", "Mimosa", "Gelato"],
    interests: ["Art", "Yoga", "Sunsets", "Philosophy"],
    availability: "Flexible",
    tags: ["Daily Toker", "Artist", "Yoga"],
    streamTag: "420 Vibes",
  },
  {
    id: "sage",
    name: "Sage",
    age: 23,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop",
    location: "Silver Lake",
    distance: "5 mi",
    online: false,
    verified: true,
    warStories: [
      {
        promptKey: "weirdestPlace",
        answer:
          "In a treehouse at a music festival. Someone had built an entire smoke lounge up there with fairy lights and bean bags.",
      },
      {
        promptKey: "controversialOpinion",
        answer: "Edibles hit different and I'm tired of pretending they don't scare me.",
      },
    ],
    strainType: "sativa",
    method: ["joints"],
    frequency: "weekly",
    tolerance: "moderate",
    favoriteStrains: ["Green Crack", "Super Lemon Haze"],
    interests: ["Guitar", "Singing", "Sunsets"],
    availability: "Weekends",
    tags: ["Sativa", "Musician", "Sunsets"],
    streamTag: "Night Owl",
  },
  {
    id: "willow",
    name: "Willow",
    age: 28,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    location: "Echo Park",
    distance: "1 mi",
    online: true,
    verified: false,
    warStories: [
      {
        promptKey: "perfectSesh",
        answer:
          "A glass of red wine, a strong edible, and a movie I've seen a hundred times. Pure comfort.",
      },
      {
        promptKey: "lookingFor",
        answer: "Someone to share cozy nights with. Movie marathons, snacks, and good vibes only.",
      },
    ],
    strainType: "indica",
    method: ["edibles", "vapes"],
    frequency: "daily",
    tolerance: "ironLungs",
    favoriteStrains: ["Granddaddy Purple", "Blueberry", "Northern Lights"],
    interests: ["Reading", "Wine", "Cooking", "Netflix"],
    availability: "Evenings",
    tags: ["Edibles", "Reader", "Wine & Weed"],
    streamTag: "Edibles Hour",
  },
  {
    id: "aurora",
    name: "Aurora",
    age: 25,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop",
    location: "Hollywood",
    distance: "4 mi",
    online: true,
    verified: true,
    warStories: [
      {
        promptKey: "legendarySession",
        answer:
          "Hotboxed a vintage VW bus at a drive-in movie theater. The Breakfast Club never hit so hard.",
      },
      {
        promptKey: "swipeRightIf",
        answer:
          "You can quote entire movies from memory and think the best time to smoke is right before a film.",
      },
    ],
    strainType: "hybrid",
    method: ["bongs", "dabs"],
    frequency: "daily",
    tolerance: "veteran",
    favoriteStrains: ["Wedding Cake", "Honey Bun", "Gelato"],
    interests: ["Films", "Night Owl", "Gaming", "Photography"],
    availability: "Late nights",
    tags: ["420", "Films", "Night Sessions"],
  },
  {
    id: "ivy",
    name: "Ivy",
    age: 27,
    photo: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=800&fit=crop",
    location: "Santa Monica",
    distance: "6 mi",
    online: false,
    verified: true,
    warStories: [
      {
        promptKey: "strainThatChanged",
        answer:
          "Pineapple Express. Tried it on the beach at sunset and realized this is what happiness feels like.",
      },
      {
        promptKey: "idealSmokeBuddy",
        answer:
          "Someone who loves spontaneous adventures. Beach bonfires, concert road trips, or just exploring new places.",
      },
    ],
    strainType: "sativa",
    method: ["joints"],
    frequency: "social",
    tolerance: "moderate",
    favoriteStrains: ["Maui Wowie", "Pineapple Express", "Durban Poison"],
    interests: ["Concerts", "Surfing", "Beach", "Travel"],
    availability: "Weekends & Sunny Days",
    tags: ["Live Music", "Beach", "Organic"],
  },
  {
    id: "rose",
    name: "Rose",
    age: 24,
    photo: "https://images.unsplash.com/photo-1488716820149-c2a792ee3e67?w=600&h=800&fit=crop",
    location: "Arts District",
    distance: "2 mi",
    online: true,
    verified: false,
    warStories: [
      {
        promptKey: "weirdestPlace",
        answer:
          "In a coffee shop bathroom in Amsterdam. Not my proudest moment but hey, when in Rome... err, Amsterdam.",
      },
      {
        promptKey: "perfectSesh",
        answer:
          "Morning coffee, a sativa joint, and watching the city wake up from my balcony. Creative energy unlocked.",
      },
    ],
    strainType: "sativa",
    method: ["vapes", "joints"],
    frequency: "daily",
    tolerance: "moderate",
    favoriteStrains: ["Cafe Racer", "Lemon Tree", "Tangie"],
    interests: ["Design", "Coffee", "Galleries", "Fashion"],
    availability: "Mornings & Evenings",
    tags: ["Sativa", "Creative", "Coffee"],
  },
  {
    id: "ember",
    name: "Ember",
    age: 29,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop",
    location: "Downtown LA",
    distance: "3 mi",
    online: true,
    verified: true,
    warStories: [
      {
        promptKey: "legendarySession",
        answer:
          "Camping under the stars in Joshua Tree. The Milky Way was so clear, and everything felt connected.",
      },
      {
        promptKey: "controversialOpinion",
        answer:
          "Pre-rolls are underrated. Not everyone wants to be a rolling expert and that's okay.",
      },
    ],
    strainType: "indica",
    method: ["joints", "bongs", "edibles"],
    frequency: "daily",
    tolerance: "veteran",
    favoriteStrains: ["OG Kush", "Purple Punch", "Zkittlez"],
    interests: ["Camping", "Stargazing", "Meditation", "Tarot"],
    availability: "Anytime",
    tags: ["Indica", "Spiritual", "Nature"],
  },
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    matchId: "match-jasmine",
    profile: mockProfiles[0]!,
    lastMessage: "That sounds amazing! When are you free?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    unread: 2,
    messages: [
      {
        id: "msg-1",
        senderId: "me",
        text: "Hey! I saw we have the same taste in strains",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: "msg-2",
        senderId: "jasmine",
        text: "Omg yes! Lemon Haze is my absolute favorite",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
      },
      {
        id: "msg-3",
        senderId: "me",
        text: "Have you tried the batch from the new dispensary downtown?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: "msg-4",
        senderId: "jasmine",
        text: "Not yet! Is it good?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "msg-5",
        senderId: "me",
        text: "It's incredible. We should go together sometime",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
      {
        id: "msg-6",
        senderId: "jasmine",
        text: "That sounds amazing! When are you free?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
    ],
  },
  {
    id: "conv-2",
    matchId: "match-luna",
    profile: mockProfiles[1]!,
    lastMessage: "I love your art btw!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unread: 0,
    messages: [
      {
        id: "msg-7",
        senderId: "luna",
        text: "Hey there! Love your profile",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        id: "msg-8",
        senderId: "me",
        text: "Thanks! Your paintings are incredible",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
      },
      {
        id: "msg-9",
        senderId: "luna",
        text: "Aww thank you! I paint best when elevated haha",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
      },
      {
        id: "msg-10",
        senderId: "me",
        text: "Same! I take my best photos after a good sesh",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
      {
        id: "msg-11",
        senderId: "me",
        text: "I love your art btw!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
    ],
  },
  {
    id: "conv-3",
    matchId: "match-willow",
    profile: mockProfiles[3]!,
    lastMessage: "Same! What's your favorite comfort movie?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 1,
    messages: [
      {
        id: "msg-12",
        senderId: "willow",
        text: "Your profile is giving cozy vibes and I'm here for it",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
      {
        id: "msg-13",
        senderId: "me",
        text: "Haha thanks! I see you're an edibles person too",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 45),
      },
      {
        id: "msg-14",
        senderId: "willow",
        text: "The only way to truly enjoy a movie marathon",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 40),
      },
      {
        id: "msg-15",
        senderId: "willow",
        text: "Same! What's your favorite comfort movie?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ],
  },
  {
    id: "conv-4",
    matchId: "match-aurora",
    profile: mockProfiles[4]!,
    lastMessage: "Roll one?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    unread: 0,
    messages: [
      {
        id: "msg-16",
        senderId: "aurora",
        text: "OMG you like Wedding Cake too?!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
      },
      {
        id: "msg-17",
        senderId: "me",
        text: "It's literally the best strain ever created",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70),
      },
      {
        id: "msg-18",
        senderId: "aurora",
        text: "Finally someone with taste! We should watch a movie sometime",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50),
      },
      {
        id: "msg-19",
        senderId: "me",
        text: "Roll one?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
    ],
  },
];

// Helper function to get a profile by ID
export function getProfileById(id: string): Profile | undefined {
  if (id === "me") return currentUser;
  return mockProfiles.find((p) => p.id === id);
}

// Helper function to get conversation by ID
export function getConversationById(id: string): Conversation | undefined {
  return mockConversations.find((c) => c.id === id);
}

// Format time for display
export function formatMessageTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
}
