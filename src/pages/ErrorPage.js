import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import Button from '../components/common/Button';
import Hint from '../components/common/Hint';
import Page from '../components/common/Layout';
import {retryReplies as replies} from '../data/dialogues';

export default function ErrorPage() {
    const {state, count, unlock} = useExam();
    const [message, setMessage] = useState('');
    const retry = state.counters.retry || 0;
    const help = state.counters.help || 0;
    return <Page title="제출물 조회 오류" eyebrow="문서관리시스템 / 민원창구" theme="system" footer="2026 문서관리시스템 · 민원 처리는 영업일 기준 기약 없습니다.">
        <div className="error-code">ERROR 404_BBOSEOK</div>
        <dl className="data-list"><dt>응시자</dt><dd>LumiA</dd><dt>제출 상태</dt><dd>제출 완료</dd><dt>제출물 상태</dt><dd>없음</dd><dt>분실 사유</dt><dd>담당자도 모름</dd></dl>
        <div className="button-row">
            <Button secondary onClick={() => { count('retry', [[5, 'retry']]); setMessage(replies[Math.min(retry, replies.length - 1)]); }}>다시 시도</Button>
            <Button secondary onClick={() => { count('help', [[3, 'help']]); setMessage(help >= 2 ? '세 번째 요청이시군요. 아래의 담당자 이름을 확인해 보세요.' : '도움이 필요하시군요. 힘내세요!'); }}>도움말</Button>
            <Button secondary onClick={() => { unlock('contact'); setMessage('담당자와 작성자와 개발자 모두 동일 인물입니다. 참 편리한 행정이죠.'); }}>관리자에게 문의</Button>
        </div>
        {message && <p className="notice" role="status">{message}</p>}
        <p className="small">담당자: <Link className="disguised" to="/office" onClick={() => unlock('contact')}>LumiA</Link></p>
        <Hint>담당자 이름은 단순한 글자가 아닐지도 모릅니다.</Hint>
    </Page>;
}
