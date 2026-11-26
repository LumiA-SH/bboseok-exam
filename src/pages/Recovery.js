import ProgressBar from '../components/common/ProgressBar';
import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import {loadingMessages} from '../data/dialogues';
import Hint from '../components/common/Hint';
import Page from '../components/common/Layout';

export default function Recovery() {
    const {unlock, patch, advance} = useExam();
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (step >= 7) return;
        const timer = setTimeout(() => setStep(value => value + 1), 850);
        return () => clearTimeout(timer);
    }, [step]);
    const progress = step === 7 ? 99 : step * 14;
    function recover() {
        if (step < 7) return;
        unlock('bar'); patch({clue: true}); advance(4); navigate('/returned');
    }
    return <Page title="제출물 복구 중" eyebrow="문서관리시스템 / 복구실" theme="system">
        <p>복구가 끝날 때까지 기다려 주세요. 모든 업무는 정상적으로 처리되고 있습니다.</p>
        <p className="progress-number">{progress}%</p>
        <ProgressBar value={progress} label="복구 진행률 확인" onClick={recover} />
        <p role="status">{loadingMessages[step]}</p>
        {step === 7 && <><p className="notice">나머지 1%는 열람자의 정성으로 채워집니다.</p><Hint>진행률 막대를 직접 눌러 보세요.</Hint></>}
    </Page>;
}
