import {useEffect} from 'react';
import {useExam} from '../hooks/useExam';
import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function Author() {
    const {unlock} = useExam();
    useEffect(() => { unlock('author'); }, [unlock]);
    return <Page title="담당자 업무일지" eyebrow="열람 등급: 심심한 사람" theme="system">
        <div className="document diary">
            <p>09:00 — 오늘은 믹싱을 할지 고민했다.</p>
            <p>10:00 — 프로그램을 만들었다.</p>
            <p>11:00 — 배포했다.</p>
            <p>12:00 — 과거시험 제출물을 만들어야겠다는 생각이 들었다.</p>
            <p>13:00 — 제출물 열람 절차를 불필요하게 늘렸다.</p>
            <p>14:00 — 아 졸잼ㅋ</p>
        </div>
        <p className="small muted">※ 이 일지는 허구의 업무 기록입니다. 아마도요.</p>
        <Next to="/office">담당자 창구로</Next>
    </Page>;
}
