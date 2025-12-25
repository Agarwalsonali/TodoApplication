export default function InputBox(props)
{
    return <div className="mb-4">
    <div className="flex font-semibold">
        <label htmlFor={props.id} className={`text-${props.labelColor}`}>{props.label}</label>
    </div>

    <div>
        <input
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        id={props.id}
        className={`w-full p-3 mt-2 rounded-lg text-black bg-white ${props.className}`}
        placeholder={props.placeholder}
        />
    </div>
  </div>
}