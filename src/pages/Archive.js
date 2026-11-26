import {useEffect} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import Button from '../components/common/Button';
import Page from '../components/common/Layout';

export default function Archive() {
    const {unlock, patch} = useExam();
    const [tea, setTea] = useState(false);
    useEffect(() => { unlock('archive'); }, [unlock]);
    return <Page title="구 기록보관소" eyebrow="폐쇄된 열람실 / 접근 기록 중" theme="night">
        <p>이곳은 오래전에 폐쇄되었습니다. 왜 아직 열리냐고요? 좋은 질문입니다.</p>
        <p className="notice">보관 문서 제 0호: 첫 문서에 남겨둔 추가 공문을 확인할 것.</p>
        <Button onClick={() => { unlock('tea'); setTea(true); }}>차 한 잔 마시기</Button>
        {tea && <p>차는 맛있었습니다. 제출물과는 무관합니다.</p>}
        <div className="link-row"><Link to="/author">담당자 업무일지</Link><Link to="/office">민원창구</Link></div>
        <Button secondary onClick={() => patch({clue: true})}>추가 공문 복사하기</Button>
        <Link to="/">첫 문서로 돌아가기</Link>
    </Page>;
}
