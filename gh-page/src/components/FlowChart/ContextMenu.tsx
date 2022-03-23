import { useEffect, useState } from "react";
import { MenuItem } from "primereact/menuitem";
import { GojsLinkData, GojsNodeData, GojsOperate } from "@/scripts/FlowChart.script";
import { useToastStore } from "@/scripts/ToastStore";

// 菜单出现的位置类型
type CtxMenuType = 'blank' | 'node' | 'link' | 'hide'
// 菜单项类型
type CtxMenuItemType = 'separate' |  // separate of menu
    'cut' | 'copy' | 'paste' | 'delete' |  // node/link operate
    'zoom' | 'clear' | 'download' |  // diagram operate
    'load' | 'store'  // store/load operate
// todo store/load json file

export interface CtxMenuItem extends MenuItem {
    type: CtxMenuItemType
    fit: CtxMenuType[]
}

// 控制菜单类型及位置
export type ContextMenuControl = (
    type: CtxMenuType,
    position: [ number, number ],
    objData: GojsNodeData | GojsLinkData | null,
    originEv: PointerEvent | null
) => void

// 接受的onload参数
export type ContextMenuOnLoad = (controlFn: ContextMenuControl) => void

// 全部参数
export interface ContextMenuProps {
    onLoad: ContextMenuOnLoad
    instance: GojsOperate | null
}

export const ContextMenu = (props: ContextMenuProps) => {
    // all items here, show or not depends on its 'fit'
    const allItems: CtxMenuItem[] = [
        {
            type: 'cut', fit: [ 'node', 'link' ],
            label: 'Cut', icon: ''
        },
        {
            type: 'copy', fit: [ 'node', 'link' ],
            label: 'Copy', icon: ''
        },
        {
            type: 'paste', fit: [ 'node', 'link', 'blank' ],
            label: 'Paste', icon: ''
        },
        {
            type: 'delete', fit: [ 'node', 'link' ],
            label: 'Delete', icon: ''
        },
        {
            type: 'separate', fit: [],
            separator: true
        },
        {
            type: 'zoom', fit: [ 'blank' ],
            label: 'Zoom to Fit', icon: ''
        },
        {
            type: 'clear', fit: [ 'blank' ],
            label: 'Clear Canvas', icon: ''
        },
        {
            type: 'download', fit: [ 'blank' ],
            label: 'Download diagram', icon: ''
        },
        {
            type: 'separate', fit: [],
            separator: true
        },
        {
            type: 'load', fit: [ 'blank' ],
            label: 'Load diagram from file', icon: ''
        },
        {
            type: 'store', fit: ['blank'],
            label: 'store diagram to file', icon: ''
        }
    ]

    const [ menuItems, setMenuItems ] = useState<CtxMenuItem[]>([])
    const [ visible, setVisible ] = useState(false)
    const [ position, setPosition ] = useState<[ number, number ]>([ -1000, -1000 ])
    const [ lastObjData, setLastObjData ] = useState<GojsNodeData | GojsLinkData | null>(null)

    /**
     * @description callback for contextClick on diagram
     * @param type event type
     * @param position event position
     * @param objData event`s target`s data (equals null if clicked on blank)
     * @param originEv origin event
     */
    const controlFunction: ContextMenuControl = (type, position, objData, originEv) => {
        if(type === 'hide') {
            setLastObjData(null)
            setVisible(false)
            setPosition(position)
        }
        else {
            setMenuItems(allItems.filter((item) => {
                return item.fit.includes(type)
            }))
            setLastObjData(objData)
            setVisible(true)
            setPosition(position)
        }
    }

    /**
     * @description callback for menuitem`s click
     */
    const doMenuCmd = (type: CtxMenuItemType) => {
        switch(type) {
            case 'cut':
                props.instance?.doCut()
                break
            case 'copy':
                props.instance?.doCopy()
                break
            case 'paste':
                console.log(position)
                useToastStore().warn('Some bug with paste, i`ll do it later.')
                // props.instance?.doPaste(position)
                break
            case 'delete':
                props.instance?.doDelete()
                break
            case 'zoom':
                props.instance?.doZoomToFit()
                break
            case 'clear':
                props.instance?.doClear()
                break
            case 'download':
                props.instance?.doDownload()
                break
            case 'load':
                props.instance?.doLoad()
                break
            case 'store':
                props.instance?.doStore()
                break
        }
        controlFunction('hide', [ -1000, -1000 ], null, null)
    }

    useEffect(() => {
        props.onLoad(controlFunction)
    }, [])

    return (
        <div
            style={ {
                position: 'absolute',
                zIndex: '1000',
                left: position[0] + 5,
                top: position[1] + 5,
                width: '200px',
                border: 'solid 1px #777777',
                display: visible ? 'block' : 'none'
            } }
            onContextMenu={ (e) => {
                e.preventDefault()
            } }>

            {
                menuItems.map((item) => {
                    return (
                        <div key={ item.type }
                             onClick={ () => {
                                 doMenuCmd(item.type)
                             } }>
                            { item.label }
                        </div>
                    )
                })
            }
        </div>
    )
}