import {HashRouter} from 'react-router-dom';
import {ExamProvider} from './context/ExamContext';
import ExamRoutes from './routes/ExamRoutes';

export default function App() {
    return (
        <HashRouter>
            <ExamProvider>
                <ExamRoutes />
            </ExamProvider>
        </HashRouter>
    );
}
