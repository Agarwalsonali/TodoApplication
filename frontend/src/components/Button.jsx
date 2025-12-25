// export default function Button(props)
// {
//     return <div className="mt-6 flex">
//        <button className={`px-6 py-3 bg-${props.bgColor}-500 text-white rounded-lg hover:bg-${props.bgColor}-600 transition-colors`}>
                
//                 {props.label}
//             </button>
//     </div>
// }
export default function Button(props) {
    return (
        <button onClick={props.onClick} className={`px-6 py-3 bg-${props.bgColor}-500 text-white rounded-lg hover:bg-${props.bgColor}-600 transition-colors`}>
            {props.label}
        </button>
    );
}
