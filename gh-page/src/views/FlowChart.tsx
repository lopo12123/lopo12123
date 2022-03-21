import { useState } from "react";

export default () => {
    const [ aa, setAa ] = useState(1)

    return (
        <div onClick={ () => {
            setAa(aa + 1)
        } }>
            { aa }
        </div>
    )
}