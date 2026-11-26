import {ACHIEVEMENTS} from '../../data/achievements';

export default function AchievementList({earned}) {
    return <details className="achievement-list">
        <summary>숨겨진 업적 ({earned.length}/{Object.keys(ACHIEVEMENTS).length})</summary>
        {Object.entries(ACHIEVEMENTS).map(([id, [title, description]]) => <div className={`achievement ${earned.includes(id) ? 'earned' : ''}`} key={id}>
            <strong>{earned.includes(id) ? title : '???'}</strong>
            <small>{earned.includes(id) ? description : '아직 발견하지 못했습니다.'}</small>
        </div>)}
    </details>;
}
