import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function NotFound() {
    const {unlock} = useExam();
    useEffect(() => { unlock('lost'); }, [unlock]);
    return <Page title="여기는 어디인가요?" eyebrow="404 / 지도에도 없는 곳" theme="night">
        <p>등록되지 않은 문서입니다. 주소를 직접 수정하셨나요? 탐구 정신이 대단하시군요.</p>
        <p>기록보관소라면 무언가 알고 있을지도 모릅니다.</p><Next to="/archive">구 기록보관소</Next><Link to="/">첫 문서로</Link>
    </Page>;
}
