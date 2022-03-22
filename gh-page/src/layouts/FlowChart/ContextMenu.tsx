import { useEffect, useState } from "react";

// 菜单出现的位置类型
type CtxMenuType = 'blank' | 'node' | 'link' | 'hide'
// 菜单项类型
type CtxMenuItemType =
    'cut' | 'copy' | 'paste' | 'delete' |  // node/link operate
    'zoom' | 'download' | 'clear'  // diagram operate

interface CtxMenuItem {
    key: string
    label: string,
    type: CtxMenuItemType
    icon: string,
    fit: CtxMenuType[]
}

// 控制菜单类型及位置
export type ContextMenuControl = (type: CtxMenuType, position: [ number, number ]) => void

// 接受的onload参数
export type ContextMenuOnLoad = (controlFn: ContextMenuControl) => void

export const ContextMenu = (props: { onLoad: ContextMenuOnLoad }) => {
    // all items here, show or not depends on its 'fit'
    const allItems: CtxMenuItem[] = [
        { key: '1', label: 'Cut', type: 'cut', icon: '', fit: [ 'node', 'link' ] },
        { key: '2', label: 'Copy', type: 'copy', icon: '', fit: [ 'node', 'link' ] },
        { key: '3', label: 'paste', type: 'paste', icon: '', fit: [ 'blank' ] }
    ]

    const [ menuItems, setMenuItems ] = useState<CtxMenuItem[]>([])
    const [ visible, setVisible ] = useState(false)
    const [ position, setPosition ] = useState<[ number, number ]>([ -1000, -1000 ])

    const controlFunction: ContextMenuControl = (type, position) => {
        switch(type) {
            case 'blank':
                setMenuItems(allItems)
                setVisible(true)
                setPosition(position)
                break
            case 'node':

                break
            case 'link':

                break
            case 'hide':
                setVisible(false)
                setPosition(position)
                break
        }
    }

    useEffect(() => {
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
            {
                menuItems.map((item) => {
                    return (
                        <div key={ item.key }>
                            { item.label }
                        </div>
                    )
                })
            }
        </div>
    )
}