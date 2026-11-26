export default function Button({children, onClick, type = 'button', secondary = false, disabled = false}) {
    return <button type={type} className={secondary ? 'button secondary' : 'button'} onClick={onClick} disabled={disabled}>{children}</button>;
}
