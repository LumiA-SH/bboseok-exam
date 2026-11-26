import {createContext, useEffect, useMemo, useReducer} from 'react';
import {reduceExam} from '../utils/game';
import {loadState, saveState} from '../utils/storage';

export const ExamContext = createContext(null);

export function ExamProvider({children}) {
    const [state, dispatch] = useReducer(reduceExam, undefined, loadState);

    useEffect(() => {
        saveState(state);
    }, [state]);

    useEffect(() => {
        const navigation = performance.getEntriesByType?.('navigation')?.[0];
        if (navigation?.type === 'reload' && loadState().started) dispatch({type: 'unlock', key: 'refresh'});
    }, []);

    const actions = useMemo(() => ({
        dispatch,
        unlock: key => dispatch({type: 'unlock', key}),
        count: (key, rewards = []) => dispatch({type: 'count', key, rewards}),
        patch: value => dispatch({type: 'patch', value}),
        advance: value => dispatch({type: 'stage', value})
    }), [dispatch]);

    return <ExamContext.Provider value={{state, ...actions}}>{children}</ExamContext.Provider>;
}
