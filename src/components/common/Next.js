import {useNavigate} from 'react-router-dom';
import {useExam} from '../../hooks/useExam';
import Button from './Button';

export default function Next({to, children, stage}) {
    const {advance} = useExam();
    const navigate = useNavigate();
    return <Button onClick={() => { if (stage !== undefined) advance(stage); navigate(to); }}>{children}</Button>;
}
