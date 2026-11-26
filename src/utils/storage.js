import {INITIAL} from './game';
import {ACHIEVEMENTS} from '../data/achievements';

export const STORAGE_KEY = 'bboseok-exam-v1';

export function loadState() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data || typeof data !== 'object' || Array.isArray(data)) return {...INITIAL};
        const counters = Object.fromEntries(Object.entries(data.counters || {}).filter(([, value]) => Number.isSafeInteger(value) && value >= 0));
        const achievements = Array.isArray(data.achievements) ? [...new Set(data.achievements.filter(key => Object.hasOwn(ACHIEVEMENTS, key)))] : [];
        const visited = Array.isArray(data.visited) ? [...new Set(data.visited.filter(value => typeof value === 'string'))] : [];
        return {
            ...INITIAL, counters, achievements, visited,
            started: data.started === true, trust: typeof data.trust === 'boolean' ? data.trust : null,
            stage: Number.isInteger(data.stage) ? Math.min(9, Math.max(0, data.stage)) : 0,
            clue: data.clue === true, nightSeen: data.nightSeen === true, completed: data.completed === true,
            startedAt: Number.isFinite(data.startedAt) && data.startedAt > 0 ? data.startedAt : null,
            finishedAt: Number.isFinite(data.finishedAt) && data.finishedAt > 0 ? data.finishedAt : null,
            definition: typeof data.definition === 'string' ? data.definition : ''
        };
    } catch {
        return {...INITIAL};
    }
}


export function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* 저장이 막혀도 플레이는 계속됩니다. */ }
}
