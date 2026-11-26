import ProgressBar from '../components/common/ProgressBar';
import {praiseReplies} from '../data/dialogues';
import {getDialogue} from '../utils/game';
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

export default function Administrator() {
    const {state, count, patch, advance} = useExam();
    const praise = state.counters.praise || 0;
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    function submit(event) {
        event.preventDefault();
        if (normalizeAnswer(answer) === PUZZLES.payment) {
            advance(3); navigate('/recovery');
        } else {
            count('wrong', [[5, 'wrong']]); setFeedback('인상적인 의견입니다. 하지만 보상은 세 글자입니다.');
        }
    }
    return <Page title="담당자 상담 창구" eyebrow="문서관리시스템 / 직원 전용" theme="system">
        <p>담당자의 가오가 부족하여 업무 처리가 지연되고 있습니다. 복구 신청을 위해 담당자를 격려해 주세요.</p>
        <div className="praise-box">
            <p>담당자 만족도 <strong>{Math.min(praise * 10, 100)}%</strong></p>
            <ProgressBar value={Math.min(praise * 10, 100)} label="담당자 만족도" />
            <Button onClick={() => count('praise', [[10, 'praise'], [20, 'excess']])}>복복복</Button>
            <p className="small" role="status">{getDialogue(praiseReplies, praise)}</p>
        </div>
        <PuzzleInput id="payment" label="보상 명칭 확인 (세 글자)" value={answer} onChange={setAnswer} onSubmit={submit}>복구 신청</PuzzleInput>
        {feedback && <p className="notice" role="status">{feedback}</p>}
        <div className="link-row"><Link to="/archive">구 기록보관소</Link><Link to="/author">업무일지</Link><Link to="/certificate">확인서 발급</Link></div>
        <button className="text-button" onClick={() => { patch({clue: true}); navigate('/'); }}>처음부터 다시 살펴보기</button>
        <Hint>방금 눌렀던 격려 버튼에 적힌 세 글자를 그대로 입력해 보세요.</Hint>
    </Page>;
}
