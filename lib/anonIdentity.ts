/**
 * Anonymous identity management
 * Generates and maintains a random anonymous ID for each user
 */

const ANON_ID_KEY = 'snakes_anon_id';
const ANON_NICKNAME_KEY = 'snakes_anon_nickname';

/**
 * Generate a random anonymous ID
 */
function generateRandomId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}${randomPart}`;
}

/**
 * Generate a random snake-themed nickname
 */
function generateNickname(): string {
  const adjectives = [
    'Venomous',
    'Silent',
    'Deadly',
    'Shadow',
    'Toxic',
    'Crimson',
    'Dark',
    'Phantom',
    'Raging',
    'Cursed',
    'Broken',
    'Savage',
    'Twisted',
    'Hollow',
    'Bitter',
  ];

  const snakes = [
    'Viper',
    'Cobra',
    'Python',
    'Adder',
    'Mamba',
    'Rattler',
    'Boa',
    'Serpent',
    'Asp',
    'Anaconda',
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const snake = snakes[Math.floor(Math.random() * snakes.length)];
  const number = Math.floor(Math.random() * 9999);

  return `${adj} ${snake} #${number}`;
}

/**
 * Get or create the anonymous ID for this user
 */
export function getAnonId(): string {
  if (typeof window === 'undefined') {
    return 'server-side-id';
  }

  let anonId = localStorage.getItem(ANON_ID_KEY);

  if (!anonId) {
    anonId = generateRandomId();
    localStorage.setItem(ANON_ID_KEY, anonId);
  }

  return anonId;
}

/**
 * Get or create the anonymous nickname for this user
 */
export function getAnonNickname(): string {
  if (typeof window === 'undefined') {
    return 'Server Snake';
  }

  let nickname = localStorage.getItem(ANON_NICKNAME_KEY);

  if (!nickname) {
    nickname = generateNickname();
    localStorage.setItem(ANON_NICKNAME_KEY, nickname);
  }

  return nickname;
}

/**
 * Reset the anonymous identity (generates new ID and nickname)
 */
export function resetAnonIdentity(): void {
  if (typeof window === 'undefined') return;

  const newId = generateRandomId();
  const newNickname = generateNickname();

  localStorage.setItem(ANON_ID_KEY, newId);
  localStorage.setItem(ANON_NICKNAME_KEY, newNickname);
}

/**
 * Check if this anonymous ID has performed an action
 * (like liking a post or commenting)
 */
export function hasPerformedAction(
  actionType: string,
  targetId: string
): boolean {
  if (typeof window === 'undefined') return false;

  const key = `snakes_action_${actionType}_${targetId}`;
  return localStorage.getItem(key) !== null;
}

/**
 * Mark that this anonymous ID has performed an action
 */
export function markActionPerformed(
  actionType: string,
  targetId: string
): void {
  if (typeof window === 'undefined') return;

  const key = `snakes_action_${actionType}_${targetId}`;
  const anonId = getAnonId();
  localStorage.setItem(key, anonId);
}

/**
 * Remove an action mark (for undo operations)
 */
export function removeActionMark(actionType: string, targetId: string): void {
  if (typeof window === 'undefined') return;

  const key = `snakes_action_${actionType}_${targetId}`;
  localStorage.removeItem(key);
}

/**
 * Get all saved story IDs for this user
 */
export function getSavedStories(): string[] {
  if (typeof window === 'undefined') return [];

  const saved = localStorage.getItem('snakes_saved_stories');
  return saved ? JSON.parse(saved) : [];
}

/**
 * Save a story ID
 */
export function saveStory(storyId: string): void {
  if (typeof window === 'undefined') return;

  const saved = getSavedStories();
  if (!saved.includes(storyId)) {
    saved.push(storyId);
    localStorage.setItem('snakes_saved_stories', JSON.stringify(saved));
  }
}

/**
 * Unsave a story ID
 */
export function unsaveStory(storyId: string): void {
  if (typeof window === 'undefined') return;

  const saved = getSavedStories();
  const filtered = saved.filter(id => id !== storyId);
  localStorage.setItem('snakes_saved_stories', JSON.stringify(filtered));
}

/**
 * Check if a story is saved
 */
export function isStorySaved(storyId: string): boolean {
  return getSavedStories().includes(storyId);
}
