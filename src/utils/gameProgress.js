const KEY = 'flicker-progress-v1';
const ACHIEVEMENTS_KEY = 'flicker-achievements-v1';
const STATS_KEY = 'flicker-stats-v1';

export function saveProgress(index){
  try{ localStorage.setItem(KEY, String(index)); }catch{}
}

export function loadProgress(){
  try{ const v = Number(localStorage.getItem(KEY)); return Number.isFinite(v) ? v : 0; }catch{ return 0; }
}

export function saveAchievement(achievementId, data = {}) {
  try {
    const achievements = loadAchievements();
    achievements[achievementId] = {
      unlocked: true,
      timestamp: Date.now(),
      ...data
    };
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch {}
}

export function loadAchievements() {
  try {
    const achievements = localStorage.getItem(ACHIEVEMENTS_KEY);
    return achievements ? JSON.parse(achievements) : {};
  } catch {
    return {};
  }
}

export function updateStats(statType, value = 1) {
  try {
    const stats = loadStats();
    stats[statType] = (stats[statType] || 0) + value;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {}
}

export function loadStats() {
  try {
    const stats = localStorage.getItem(STATS_KEY);
    return stats ? JSON.parse(stats) : {};
  } catch {
    return {};
  }
}

export function getCompletionPercentage() {
  try {
    const progress = loadProgress();
    return Math.round((progress / 12) * 100); // 12 total slides
  } catch {
    return 0;
  }
}


