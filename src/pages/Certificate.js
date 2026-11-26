import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import Button from '../components/common/Button';
import Page from '../components/common/Layout';

export default function Certificate() {
    const {unlock} = useExam();
    const [issued, setIssued] = useState(false);
    return <Page title="확인서 발급" eyebrow="문서관리시스템 / 서류 발급" theme="system">
        <p>제출물 열람 신청을 확인하기 위한 확인서를 발급합니다. 확인서는 제출물 열람에 필요하지 않습니다.</p>
        <Button onClick={() => { unlock('stamp'); setIssued(true); }}>확인서 발급 신청</Button>
        {issued && <div className="document"><h2>확 인 서</h2><p>귀하께서 확인서를 신청하셨음을 확인합니다.</p><p className="signature">발급자 LumiA</p></div>}
        <Link to="/office">돌아가기</Link>
    </Page>;
}
