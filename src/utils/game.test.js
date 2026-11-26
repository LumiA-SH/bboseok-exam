import {INITIAL, reduceExam, normalizeAnswer, getDialogue, getRank} from './game';
import {loadState, saveState, STORAGE_KEY} from './storage';
import {ACHIEVEMENTS} from '../data/achievements';
import {sealReplies} from '../data/dialogues';

beforeEach(() => localStorage.clear());

test('누적 횟수와 업적은 중복 없이 유지되고 초기화는 기존 상태를 변경하지 않는다', () => {
    let state = reduceExam(INITIAL, {type: 'start'});
    for (let i = 0; i < 25; i++) state = reduceExam(state, {type: 'count', key: 'seal', rewards: [[20, 'seal']]});
    expect(state.counters.seal).toBe(25);
    expect(state.achievements).toEqual(['seal']);
    expect(getDialogue(sealReplies, 25)).toContain('25회');
    const reset = reduceExam(state, {type: 'reset'});
    expect(reset).toEqual(INITIAL);
    expect(state.counters.seal).toBe(25);
});

test('이전 v1 기록과 새 선택을 보존하며 잘못된 필드와 JSON을 복구한다', () => {
    saveState({...INITIAL, stage: 7, achievements: ['fake1', 'fake1', 'unknown'], trust: false, counters: {praise: 20}, definition: 'c'});
    expect(loadState()).toMatchObject({stage: 7, achievements: ['fake1'], trust: false, counters: {praise: 20}, definition: 'c'});
    localStorage.setItem(STORAGE_KEY, JSON.stringify({stage: 'broken', achievements: null, counters: {seal: -1, retry: '5'}, visited: [1, '/archive', '/archive']}));
    expect(loadState()).toMatchObject({stage: 0, achievements: [], counters: {}, visited: ['/archive']});
    localStorage.setItem(STORAGE_KEY, '{bad json');
    expect(loadState()).toEqual(INITIAL);
});

test('진행도 역행과 종료 시간 갱신을 방지하고 최고 성적을 계산한다', () => {
    let state = reduceExam({...INITIAL, stage: 8}, {type: 'stage', value: 2});
    expect(state.stage).toBe(8);
    state = reduceExam(state, {type: 'finish'});
    expect(reduceExam(state, {type: 'finish'}).finishedAt).toBe(state.finishedAt);
    expect(state).toMatchObject({completed: true, stage: 9, achievements: ['final']});
    expect(getRank({...state, achievements: Object.keys(ACHIEVEMENTS)})).toBe('개소리의 계승자');
    expect(normalizeAnswer(' 복 복 복 ')).toBe('복복복');
});
