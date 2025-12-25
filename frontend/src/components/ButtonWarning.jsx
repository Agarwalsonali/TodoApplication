
import {Link} from 'react-router-dom'

export default function ButtonWarning({label,buttonText, to})
{
    return <div className="text-gray-500 flex justify-center mt-2">
       <div>
        {label}
       </div>
       <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
       </Link>

    </div>
}