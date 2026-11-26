import Button from '../common/Button';

export default function PuzzleInput({id, label, value, onChange, onSubmit, children}) {
    return <form className="answer-form" onSubmit={onSubmit}>
        <label htmlFor={id}>{label}</label>
        <input id={id} value={value} onChange={event => onChange(event.target.value)} autoComplete="off" />
        <Button type="submit">{children}</Button>
    </form>;
}
