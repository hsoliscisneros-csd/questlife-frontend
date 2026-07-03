export function Input({ label, id, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm text-slate-400">{label}</span>}
      <input id={id} className={`input-field ${className}`} {...props} />
    </label>
  )
}
