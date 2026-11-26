import {useState} from 'react';
import {useExam} from '../../hooks/useExam';

export default function Hint({children}) {
    const [open, setOpen] = useState(false);
    const {unlock} = useExam();
    return <div className="hint">
        <button className="text-button" onClick={() => { setOpen(!open); if (!open) unlock('hint'); }} aria-expanded={open}>{open ? '힌트 접기' : '정말 모르겠다면'}</button>
        {open && <p>{children}</p>}
    </div>;
}
