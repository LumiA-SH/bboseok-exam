import {ACHIEVEMENTS} from '../data/achievements';

export const INITIAL = {
    started: false, trust: null, stage: 0, achievements: [], visited: [], counters: {},
    clue: false, nightSeen: false, completed: false, startedAt: null, finishedAt: null, definition: ''
};

export function addAchievement(state, key) {
    if (!ACHIEVEMENTS[key] || state.achievements.includes(key)) return state;
    return {...state, achievements: [...state.achievements, key]};
}

export function reduceExam(state, action) {
    switch (action.type) {
        case 'start': return {...state, started: true, startedAt: state.startedAt || Date.now()};
        case 'patch': return {...state, ...action.value};
        case 'stage': return {...state, stage: Math.max(state.stage, action.value)};
        case 'unlock': return addAchievement(state, action.key);
        case 'visit': return state.visited.includes(action.path) ? state : {...state, visited: [...state.visited, action.path]};
        case 'count': {
            const count = (state.counters[action.key] || 0) + 1;
            let next = {...state, counters: {...state.counters, [action.key]: count}};
            for (const [threshold, key] of action.rewards || []) {
                if (count >= threshold) next = addAchievement(next, key);
            }
            return next;
        }
        case 'finish': return addAchievement({...state, completed: true, finishedAt: state.finishedAt || Date.now(), stage: Math.max(9, state.stage)}, 'final');
        case 'reset': return {...INITIAL, achievements: [], visited: [], counters: {}};
        default: return state;
    }
}

export function normalizeAnswer(value) {
    return value.trim().toLowerCase().replace(/\s+/g, '');
}

export function getDialogue(entries, count) {
    return (entries.find(entry => count >= entry.minimum)?.text || '').replace('{count}', count);
}

export function getElapsedSeconds(state) {
    return Math.max(0, Math.floor(((state.finishedAt || Date.now()) - (state.startedAt || state.finishedAt || Date.now())) / 1000));
}

export function getRank(state) {
    if (state.achievements.length === Object.keys(ACHIEVEMENTS).length) return '개소리의 계승자';
    if (state.achievements.length >= 18) return '장원급제';
    if (state.achievements.length >= 12) return '개소리 연구원';
    if (state.achievements.length >= 8) return '의심 많은 선비';
    return '개소리 탐구 우수자';
}
