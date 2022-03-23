import { useLayoutEffect, useRef, useState } from "react";
import { ContextMenu, ContextMenuOnLoad } from "@/components/FlowChart/ContextMenu";
import { GojsOperate } from "@/scripts/FlowChart.script";

export default () => {
    const diagramContainer = useRef<HTMLDivElement>(null)
    const paletteContainer = useRef<HTMLDivElement>(null)
    const inspectorContainer = useRef<HTMLDivElement>(null)

    const [ diagramObj, setDiagramObj ] = useState<GojsOperate | null>(null)

    // 子组件onLoad后调用
    const doAfterOnLoad: ContextMenuOnLoad = (controlFn) => {
        if(
            !!diagramContainer.current &&
            !!paletteContainer.current &&
            !!inspectorContainer.current
        ) {
            const instance = new GojsOperate(diagramContainer.current, paletteContainer.current, inspectorContainer.current, controlFn)
            setDiagramObj(instance)
        }
    }

    // 清除子组件导致的副作用 - 解绑原有的diagram实例
    useLayoutEffect(() => {
        return () => {
            diagramObj?.dispose()
            setDiagramObj(null)
        }
    }, [])

    return (
        <div style={ {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        } }>

            <div ref={ diagramContainer }
                 className="custom-canvas-container"
                 style={ {
                     position: 'relative',
                     width: '100%',
                     height: '100%'
                 } }>
            </div>

            <div ref={ paletteContainer }
                 className="custom-canvas-container"
                 style={ {
                     position: 'absolute',
                     zIndex: '100',
                     width: '200px',
                     height: '100%',
                     top: '0',
                     left: '0',
                     backgroundColor: '#f5f5f5'
                 } }>
            </div>

            <div ref={ inspectorContainer }
                 style={ {
                     position: 'absolute',
                     zIndex: '200',
                     width: '200px',
                     height: '100%',
                     top: '50px',
                     right: '50px',
                     backgroundColor: '#f5f5f5'
                 } }>
            </div>

            <ContextMenu onLoad={ doAfterOnLoad } instance={ diagramObj }/>
        </div>
    )
}