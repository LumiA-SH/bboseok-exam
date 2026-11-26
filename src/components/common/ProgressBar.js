export default function ProgressBar({value, label, onClick}) {
    const fill = <span style={{width: `${value}%`}} />;
    if (onClick) return <button className="meter clickable" aria-label={label} onClick={onClick}>{fill}</button>;
    return <div className="meter" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>{fill}</div>;
}
