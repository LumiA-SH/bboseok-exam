import {useEffect} from 'react';
import {sealReplies} from '../data/dialogues';
import {getDialogue} from '../utils/game';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import Button from '../components/common/Button';
import Page from '../components/common/Layout';

export default function Introduction() {
    const {state, count, unlock, dispatch, advance} = useExam();
    const navigate = useNavigate();
    const seals = state.counters.seal || 0;
    useEffect(() => { if (state.clue) unlock('return'); }, [state.clue, unlock]);
    return <Page title="글로그를 제출합니다." eyebrow="二〇二六年 · 뽀석함 과거시험" footer="본 제출물은 글의 형식을 띠고 있습니다.">
        <p className="subtitle">글러 냐후냐후 짜란다짜란다 대회</p>
        <div className="document">
            <p>본 응시자는 과거시험에 응시하고자<br />성실히 작성한 글을 제출합니다.</p>
            <p className="signature">作. LumiA</p>
            <button className="seal" aria-label="제출 완료 직인" onClick={() => count('seal', [[20, 'seal']])}>提出<br />完了</button>
            {seals >= 3 && <p className="small note" role="status">{getDialogue(sealReplies, seals)}</p>}
        </div>
        {state.clue && <aside className="notice">추가 공문: 제출물을 열람하는 데에는 <strong>야간</strong> 근무가 필요합니다. <Link to="/night">야간 열람실 입장</Link></aside>}
        <Button onClick={() => { dispatch({type: 'start'}); advance(1); navigate('/question'); }}>제출물 열람하기</Button>
        {state.completed && <Link className="quiet-link" to="/report">지난 열람 성적표 확인</Link>}
        <p className="small muted">※ 열람에는 약간의 시간이 소요될 수 있습니다.</p>
    </Page>;
}
