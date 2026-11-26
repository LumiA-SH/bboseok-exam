import PuzzleInput from '../components/exam/PuzzleInput';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import {normalizeAnswer} from '../utils/game';
import {PUZZLES} from '../data/puzzles';
import Button from '../components/common/Button';
import Hint from '../components/common/Hint';
import Page from '../components/common/Layout';

export default function Night() {
    const {state, unlock, patch, advance, count} = useExam();
    const [dark, setDark] = useState(false);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    function toggle() {
        if (!dark) { unlock('night'); patch({nightSeen: true}); } else unlock('light');
        setDark(!dark);
    }
    function submit(event) {
        event.preventDefault();
        if (state.nightSeen && normalizeAnswer(answer) === PUZZLES.classification) { advance(6); navigate('/conclusion'); }
        else { count('wrong', [[5, 'wrong']]); setFeedback('제출물의 분류가 일치하지 않습니다. 조명을 점검해 보세요.'); }
    }
    return <Page title="야간 열람실" eyebrow="비인가 열람자 출입 금지" theme={dark ? 'night' : 'system'}>
        <p>모든 제출물은 빛을 비추면 잘 보인다고들 합니다. 과연 그럴까요?</p>
        <Button secondary onClick={toggle}>{dark ? '조명 켜기' : '조명 끄기'}</Button>
        <div className={`secret-document ${dark ? 'revealed' : ''}`} aria-hidden={!dark}>{dark ? '제출물 분류: 개소리' : '내용 없음'}</div>
        <PuzzleInput id="classification" label="제출물 분류를 입력하세요." value={answer} onChange={setAnswer} onSubmit={submit}>열람 승인 요청</PuzzleInput>
        {feedback && <p className="notice" role="status">{feedback}</p>}
        <Hint>방 안의 조명을 끄면 숨겨진 문서의 분류가 나타납니다.</Hint>
        <Link to="/">첫 문서로</Link>
    </Page>;
}
