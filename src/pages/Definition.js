import {useState} from 'react';
import {useExam} from '../hooks/useExam';
import Button from '../components/common/Button';
import Next from '../components/common/Next';
import Page from '../components/common/Layout';
import {definitionAnswers as answers} from '../data/dialogues';

export default function Definition() {
    const {state, patch, unlock} = useExam();
    const [answer, setAnswer] = useState(state.definition || '');
    return <Page title="글이란 무엇입니까?" eyebrow="열람 전 필수 확인 사항">
        <p>제출물을 열람하기에 앞서 간단한 질문이 있습니다. 정답은 없습니다. 아마도요.</p>
        <div className="choices">{answers.map(([id, label]) => <button key={id} className={`choice ${answer === id ? 'selected' : ''}`} onClick={() => { setAnswer(id); patch({definition: id}); }} aria-pressed={answer === id}>{label}</button>)}</div>
        {answer && <p className="notice" role="status">{answers.find(item => item[0] === answer)?.[2]}</p>}
        <div className="rule" />
        <p>제작자를 신뢰하십니까?</p>
        <div className="button-row">
            <Button secondary={state.trust !== true} onClick={() => { patch({trust: true}); unlock('trust'); }}>예</Button>
            <Button secondary={state.trust !== false} onClick={() => { patch({trust: false}); unlock('doubt'); }}>아니오</Button>
        </div>
        {state.trust !== null && <p className="small muted">{state.trust ? '탁월한 판단이십니다. (제작자 제공)' : '알겠습니다. 이 대답은 오래 기억될 예정입니다.'}</p>}
        {answer && state.trust !== null && <Next to="/error" stage={2}>이제 진짜 열람하기</Next>}
    </Page>;
}
