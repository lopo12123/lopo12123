import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";

interface ContextMenuProps {
    onLoad: (controlFn: ContextMenuControl) => void
}

type CtxMenuEvent = 'blank' | 'node' | 'link' | 'hide'

export interface ContextMenuControl {
    (type: CtxMenuEvent, position: [ number, number ]): void
}

// const AllMenuItems = []

export const ContextMenu = (props: ContextMenuProps) => {
    const [ visible, setVisible ] = useState(false)
    const [ position, setPosition ] = useState<[ number, number ]>([ -1000, -1000 ])

    const [ menuItems, setMenuItems ] = useState([])

    const controlFunction: ContextMenuControl = (type, position) => {
        switch(type) {
            case 'blank':
                setVisible(true)
                setPosition(position)
                break
            case 'hide':
                setVisible(false)
                setPosition(position)
                break
        }
    }

    useLayoutEffect(() => {
        props.onLoad(controlFunction)
    }, [])

    return (
        <div
            style={ {
                position: 'absolute',
                left: position[0] + 5,
                top: position[1] + 5,
                zIndex: '1000',
                display: visible ? 'block' : 'none'
            } }
            onContextMenu={ (e) => {
                e.preventDefault()
            } }>
            <div>
                item1
            </div>
            <div>
                item2
            </div>
        </div>
    )
}