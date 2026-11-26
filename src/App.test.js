import {act, Simulate} from 'react-dom/test-utils';
import {createRoot} from 'react-dom/client';
import App from './App';
import {STORAGE_KEY} from './utils/storage';

let container;
let root;
const text = () => container.textContent;
const saved = () => JSON.parse(localStorage.getItem(STORAGE_KEY));
function click(label) {
    const button = [...container.querySelectorAll('button, a')].find(element => element.textContent === label || element.getAttribute('aria-label') === label);
    expect(button).toBeDefined();
    act(() => button.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, button: 0})));
}
function answer(id, value) {
    act(() => Simulate.change(container.querySelector(`#${id}`), {target: {value}}));
    act(() => Simulate.submit(container.querySelector('form')));
}
async function visit(path) {
    await act(async () => { window.location.hash = '#' + path; await new Promise(resolve => setTimeout(resolve, 0)); });
}

beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
    window.history.replaceState(null, '', '/#/');
    window.scrollTo = jest.fn();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<App />));
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.useRealTimers();
});

test('첫 문서부터 복구, 재방문, 세 가짜 엔딩, 진짜 엔딩, 성적표 및 초기화', async () => {
    for (let i = 0; i < 20; i++) click('제출 완료 직인');
    expect(text()).toContain('직인을 20회');
    click('제출물 열람하기');
    click('코드도 글이다.');
    click('아니오');
    click('이제 진짜 열람하기');
    for (let i = 0; i < 5; i++) click('다시 시도');
    expect(text()).toContain('제출물이 없다는 사실을 찾았습니다.');
    for (let i = 0; i < 3; i++) click('도움말');
    expect(text()).toContain('세 번째 요청');
    click('LumiA');
    for (let i = 0; i < 20; i++) click('복복복');
    expect(text()).toContain('아니 이제 진짜 그만');
    for (let i = 0; i < 5; i++) answer('payment', '틀림');
    jest.useFakeTimers();
    answer('payment', '복 복 복');
    for (let i = 0; i < 7; i++) act(() => jest.advanceTimersByTime(850));
    expect(text()).toContain('99%');
    expect(document.title).toContain('99%');
    click('복구 진행률 확인');
    jest.useRealTimers();
    click('첫 문서 확인');
    expect(text()).toContain('추가 공문');
    click('야간 열람실 입장');
    click('조명 끄기');
    expect(text()).toContain('제출물 분류: 개소리');
    click('조명 켜기');
    answer('classification', '개소리');
    click('합격증 확인');
    for (const label of ['제출문 미열람 신고', '열람 완료 여부 재확인', '아니 진짜 글을 보여주세요']) {
        click('※ 결과에 이의가 있는 경우에만 확인 바랍니다.');
        click(label);
    }
    expect(text()).toContain('아 졸잼ㅋ');
    click('열람 성적표 발급');
    expect(text()).toContain('열람자 성적표');
    expect(saved().achievements).toEqual(expect.arrayContaining(['seal', 'doubt', 'retry', 'help', 'praise', 'excess', 'wrong', 'bar', 'return', 'night', 'light', 'fake1', 'fake2', 'fake3', 'final']));
    const before = saved();
    act(() => root.unmount());
    root = createRoot(container);
    act(() => root.render(<App />));
    expect(text()).toContain('열람자 성적표');
    expect(saved().achievements).toEqual(before.achievements);
    window.confirm = jest.fn(() => true);
    click('기록 초기화');
    expect(text()).toContain('글로그를 제출합니다.');
    expect(saved()).toMatchObject({stage: 0, completed: false, achievements: [], counters: {}});
});

test('접근 제한, 숨은 URL, 기록보관소, 업무일지, 확인서와 잘못된 주소', async () => {
    await visit('/final');
    expect(text()).toContain('글로그를 제출합니다.');
    await visit('/unknown');
    expect(text()).toContain('여기는 어디인가요?');
    click('구 기록보관소');
    click('차 한 잔 마시기');
    click('추가 공문 복사하기');
    click('담당자 업무일지');
    expect(text()).toContain('09:00');
    click('담당자 창구로');
    click('확인서 발급');
    click('확인서 발급 신청');
    expect(text()).toContain('확 인 서');
    expect(saved().achievements).toEqual(expect.arrayContaining(['lost', 'archive', 'tea', 'author', 'stamp']));
});
