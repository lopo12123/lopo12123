import { useEffect, useState } from "react";
import { GojsLinkData, GojsNodeData, GojsOperate } from "@/scripts/FlowChart.script";

// 菜单出现的位置类型
type CtxMenuType = 'blank' | 'node' | 'link' | 'hide'
// 菜单项类型
type CtxMenuItemType =
    'cut' | 'copy' | 'paste' | 'delete' |  // node/link operate
    'fill' | 'stroke' |  // style operate
    'zoom' | 'clear' |'download'  // diagram operate
    // todo store/load json file

interface CtxMenuItem {
    label: string,
    type: CtxMenuItemType
    icon: string,
    fit: CtxMenuType[]
}

// 控制菜单类型及位置
export type ContextMenuControl = (type: CtxMenuType, position: [ number, number ], objData: GojsNodeData | GojsLinkData | null) => void

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
        { type: 'cut', label: 'Cut', icon: '', fit: [ 'node', 'link' ] },
        { type: 'copy', label: 'Copy', icon: '', fit: [ 'node', 'link' ] },
        { type: 'paste', label: 'Paste', icon: '', fit: [ 'node', 'link', 'blank' ] },
        { type: 'delete', label: 'Delete', icon: '', fit: [ 'node', 'link' ] },
        { type: 'fill', label: 'Background Color', icon: '', fit: [ 'node' ] },
        { type: 'stroke', label: 'Stroke Color', icon: '', fit: ['node', 'link'] },
        { type: 'zoom', label: 'Zoom to Fit', icon: '', fit: [ 'blank' ] },
        { type: 'clear', label: 'Clear Canvas', icon: '', fit: [ 'blank' ] },
        { type: 'download', label: 'Download Canvas', icon: '', fit: [ 'blank' ] }
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
     */
    const controlFunction: ContextMenuControl = (type, position, objData) => {
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
                props.instance?.doPaste(position)
                break
            case 'delete':
                props.instance?.doDelete()
                break
            case 'fill':
                if(!!lastObjData && lastObjData.isNode) {
                    props.instance?.doSetFill(lastObjData, '#cccccc')
                }
                break
            case 'stroke':
                if(!!lastObjData) {
                    props.instance?.doSetStroke(lastObjData, '#cccccc')
                }
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