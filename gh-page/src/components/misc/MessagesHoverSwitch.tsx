import { useRef, useState } from "react";

interface MessagesHoverSwitchProp {
    id: string
    number: number
    normal: {
        en?: string
        zh?: string
    }
    hover: {
        en?: string
        zh?: string
    }
    type?: 'info' | 'success' | 'warn' | 'error'
}

const baseStyle = {}

export const MessagesHoverSwitch = (prop: MessagesHoverSwitchProp) => {
    const { id, number, normal, hover, type } = prop

    const [ ifHover, setIfHover ] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)

    return (
        <div
            id={ id }
            ref={ boxRef }
            style={ {} }  // todo: style of principle
            onMouseEnter={ () => {
                setIfHover(true)
            } }
            onMouseLeave={ () => {
                setIfHover(false)
            } }>
            { number }: { ifHover ? 'hover' : 'normal' }
        </div>
    )
}