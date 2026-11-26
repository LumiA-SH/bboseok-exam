import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function Returned() {
    return <Page title="복구에 성공했습니다." eyebrow="문서관리시스템 / 처리 결과" theme="system">
        <p>물론 제출물을 복구한 것은 아닙니다. 첫 페이지에 공문 하나를 추가했습니다.</p>
        <p>처음 읽으셨던 문서를 다시 확인해 주시기 바랍니다. 기왕 읽으시는 거 두 번 읽으시면 좋잖아요.</p>
        <Next to="/" stage={4}>첫 문서 확인</Next>
    </Page>;
}
