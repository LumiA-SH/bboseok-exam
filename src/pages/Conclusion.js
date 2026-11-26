import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function Conclusion() {
    return <Page title="科擧試驗 合格" eyebrow="二〇二六年 · 丙午年">
        <div className="ending-mark">合格</div>
        <p>귀하께서는 제출물 분류에 성공하셨습니다. 모든 절차가 완료되었음을 알려드립니다.</p>
        <Next to="/end/1" stage={7}>합격증 확인</Next>
        <p className="small muted">이제 정말 끝일까요?</p>
    </Page>;
}
