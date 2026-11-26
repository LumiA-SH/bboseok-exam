import {Navigate} from 'react-router-dom';
import {useExam} from '../hooks/useExam';

export default function Guard({minimum, children}) {
    const {state} = useExam();
    return state.stage >= minimum ? children : <Navigate to="/" replace />;
}
