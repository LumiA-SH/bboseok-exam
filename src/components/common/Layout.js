import {useExam} from '../../hooks/useExam';

export default function Page({eyebrow, title, children, theme = 'paper', footer}) {
    const {state} = useExam();
    return <main className={`page ${theme}`}>
        <article className="sheet">
            <header className="page-header">
                <p className="eyebrow">{eyebrow || '二〇二六年 · 丙午年'}</p>
                <h1>{title}</h1>
            </header>
            <div className="page-body">{children}</div>
            <footer className="page-footer">{footer || '뽀석함 과거시험 · 作. LumiA'}{state.trust === false && <small>본 열람자는 제작자를 신뢰하지 않습니다. 제작자는 기억합니다.</small>}</footer>
        </article>
    </main>;
}
