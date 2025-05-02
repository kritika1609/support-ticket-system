
export default function Radiobutton({ label, value, checked, onChange, name }) {
    return (
        <label className="inline-flex items-center mx-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-radio text-indigo-600"
            />
            <span className="ml-2 text-gray-700">{label}</span>
        </label>
    );
}
