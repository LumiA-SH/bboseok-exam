import AchievementList from '../components/achievement/AchievementList';
import {useRef, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {toBlob} from 'html-to-image';
import {useExam} from '../hooks/useExam';
import {ACHIEVEMENTS} from '../data/achievements';
import {getElapsedSeconds, getRank} from '../utils/game';
import Button from '../components/common/Button';
import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function ReportCard() {
    const {state, dispatch} = useExam();
    const ref = useRef(null);
    const navigate = useNavigate();
    const [name, setName] = useState('익명의 뽀석이');
    const [exporting, setExporting] = useState(false);
    const [message, setMessage] = useState('');
    async function saveImage() {
        if (!ref.current || exporting) return;
        setExporting(true); setMessage('');
        try {
            await document.fonts.ready;
            const blob = await toBlob(ref.current, {pixelRatio: 2, backgroundColor: '#f7f1e4', skipFonts: true});
            if (!blob) throw new Error('PNG 생성 실패');
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'bboseok-exam-report.png';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        } catch { setMessage('이미지를 저장하지 못했습니다. 화면 캡처로 대신해 주세요.'); }
        finally { setExporting(false); }
    }
    if (!state.completed) return <Navigate to="/" replace />;
    const seconds = getElapsedSeconds(state);
    const earned = state.achievements.length;
    return <Page title="열람 성적표 발급" eyebrow="과거시험 성적관리처">
        <label className="field-label" htmlFor="reader-name">성적표에 적힐 이름 (선택)</label>
        <input id="reader-name" maxLength={24} value={name} onChange={event => setName(event.target.value)} />
        <div className="report" ref={ref}>
            <p className="eyebrow">2026 뽀석함 과거시험</p>
            <h2>열람자 성적표</h2>
            <p className="signature">{name.trim() || '익명의 뽀석이'}</p>
            <dl className="data-list">
                <dt>열람 시간</dt><dd>{Math.floor(seconds / 60)}분 {seconds % 60}초</dd>
                <dt>방문 기록</dt><dd>{state.visited.length}곳</dd>
                <dt>복복복 제공</dt><dd>{state.counters.praise || 0}회</dd>
                <dt>쓸데없는 직인 클릭</dt><dd>{state.counters.seal || 0}회</dd>
                <dt>오답 제출</dt><dd>{state.counters.wrong || 0}회</dd>
                <dt>개발자 신뢰</dt><dd>{state.trust ? '양호' : '심각하게 부족'}</dd>
                <dt>발견한 업적</dt><dd>{earned} / {Object.keys(ACHIEVEMENTS).length}</dd>
            </dl>
            <h3>{getRank(state)}</h3>
            <p className="small">귀하는 개발자의 유희에 상당한 기여를 하였습니다.</p>
            <p className="signature">발급자 LumiA</p>
        </div>
        <Button onClick={saveImage} disabled={exporting}>{exporting ? '발급 중...' : '성적표 이미지 저장'}</Button>
        {message && <p role="status">{message}</p>}
        <AchievementList earned={state.achievements} />
        <Next to="/">업적 더 찾기 (기록 유지)</Next>
        <button className="text-button" onClick={() => { if (window.confirm('모든 진행 기록과 업적을 지우시겠습니까?')) { dispatch({type: 'reset'}); navigate('/', {replace: true}); } }}>기록 초기화</button>
    </Page>;
}
