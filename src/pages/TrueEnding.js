import {useEffect} from 'react';
import {useExam} from '../hooks/useExam';
import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function TrueEnding() {
    const {dispatch} = useExam();
    useEffect(() => { dispatch({type: 'finish'}); }, [dispatch]);
    return <Page title="글에 관하여" eyebrow="뽀석함 과거시험 · 최종 제출문">
        <div className="final-prose">
            <p>글이란 참으로 신비로운 것이다.</p>
            <p>사람은 글을 쓰고,<br />다른 사람은 그 글을 읽는다.</p>
            <p>개발자 역시 글을 쓴다.<br />다만 그것을 읽는 것이 사람이 아니라 컴퓨터일 뿐이다.</p>
            <p>그런데 오늘은 사람이 읽었다.</p>
            <p>그것도 아주 열심히.</p>
        </div>
        <div className="rule" />
        <p className="big-ending">아 졸잼ㅋ</p>
        <p className="signature">作. LumiA</p>
        <p className="small muted">기획 · 각본 · 개발 · 디자인 · 개소리 — LumiA</p>
        <Next to="/report" stage={9}>열람 성적표 발급</Next>
    </Page>;
}
