import {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {useExam} from '../hooks/useExam';
import Guard from './Guard';
import Introduction from '../pages/Introduction';
import Definition from '../pages/Definition';
import ErrorPage from '../pages/ErrorPage';
import Administrator from '../pages/Administrator';
import Recovery from '../pages/Recovery';
import Returned from '../pages/Returned';
import Night from '../pages/Night';
import Conclusion from '../pages/Conclusion';
import FakeEnding from '../pages/FakeEnding';
import TrueEnding from '../pages/TrueEnding';
import ReportCard from '../pages/ReportCard';
import Archive from '../pages/Archive';
import Author from '../pages/Author';
import Certificate from '../pages/Certificate';
import NotFound from '../pages/NotFound';

export default function ExamRoutes() {
    const location = useLocation();
    const {dispatch} = useExam();
    useEffect(() => {
        dispatch({type: 'visit', path: location.pathname});
        document.title = location.pathname === '/recovery' ? '복구 진행 중 · 99%를 의심하시오' : '글로그를 제출합니다. | LumiA';
        window.scrollTo(0, 0);
    }, [location.pathname, dispatch]);
    return <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/question" element={<Guard minimum={1}><Definition /></Guard>} />
        <Route path="/error" element={<Guard minimum={2}><ErrorPage /></Guard>} />
        <Route path="/office" element={<Administrator />} />
        <Route path="/recovery" element={<Guard minimum={3}><Recovery /></Guard>} />
        <Route path="/returned" element={<Guard minimum={4}><Returned /></Guard>} />
        <Route path="/night" element={<Night />} />
        <Route path="/conclusion" element={<Guard minimum={6}><Conclusion /></Guard>} />
        <Route path="/end/1" element={<Guard minimum={7}><FakeEnding key="1" number={1} /></Guard>} />
        <Route path="/end/2" element={<Guard minimum={7}><FakeEnding key="2" number={2} /></Guard>} />
        <Route path="/end/3" element={<Guard minimum={7}><FakeEnding key="3" number={3} /></Guard>} />
        <Route path="/final" element={<Guard minimum={8}><TrueEnding /></Guard>} />
        <Route path="/report" element={<ReportCard />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/author" element={<Author />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="*" element={<NotFound />} />
    </Routes>;
}
