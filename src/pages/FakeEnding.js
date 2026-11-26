import {useEffect} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import {endings} from '../data/endings';
import Next from '../components/common/Next';
import Page from '../components/common/Layout';

export default function FakeEnding({number}) {
    const {unlock, advance} = useExam();
    const [open, setOpen] = useState(false);
    const ending = endings[number];
    useEffect(() => { unlock(`fake${number}`); advance(number === 3 ? 8 : 7); }, [number, unlock, advance]);
    return <Page title={ending.title} eyebrow={`열람 결과 · 제 ${number} 호`}>
        <div className="ending-mark">完</div>
        <p>{ending.text}</p>
        <p>수고하셨습니다.</p>
        <Link className="button secondary" to="/">처음으로</Link>
        <button className="text-button fineprint" onClick={() => setOpen(!open)} aria-expanded={open}>※ 결과에 이의가 있는 경우에만 확인 바랍니다.</button>
        {open && <aside className="notice"><p>{ending.clue}</p><Next to={ending.next} stage={number === 3 ? 8 : 7}>{ending.link}</Next></aside>}
    </Page>;
}
