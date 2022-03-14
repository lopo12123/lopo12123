import { useState } from "react";

interface DefaultHoverSwitchProp {
    normal: JSX.Element
    hover: JSX.Element
}

export const NormalHoverSwitch = (prop: DefaultHoverSwitchProp) => {
    const { normal, hover } = prop

    const [ ifHover, setIfHover ] = useState(false)

    return (
        <div
            style={ {
                position: 'relative',
                width: '100%',
                height: 'fit-content'
            } }
            onMouseEnter={ () => {
                setIfHover(true)
            } }
            onMouseLeave={ () => {
                setIfHover(false)
            } }>
            {
                ifHover ? hover : normal
            }
        </div>
    )
}