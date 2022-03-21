import { useLayoutEffect, useRef, useState } from "react";
import { ContextMenu, ContextMenuControl } from "@/layouts/FlowChart/ContextMenu";
import { GojsOperate } from "@/scripts/FlowChart.script";

export default () => {
    const paletteContainer = useRef<HTMLDivElement>(null)
    const diagramContainer = useRef<HTMLDivElement>(null)

    const [ diagramObj, setDiagramObj ] = useState<GojsOperate | null>(null)

    const doAfterOnLoad = (controlFn: ContextMenuControl) => {
        if(
            !!diagramContainer.current
            && !!paletteContainer.current
        ) {
            const instance = new GojsOperate(diagramContainer.current, paletteContainer.current, controlFn)
            setDiagramObj(instance)
        }
    }
    // useLayoutEffect(() => {
    //     if(
    //         !!diagramContainer.current
    //         && !!paletteContainer.current
    //     ) {
    //         const instance = new GojsOperate(diagramContainer.current, paletteContainer.current, ctxControl)
    //         setDiagramObj(instance)
    //     }
    // }, [])

    return (
        <div style={ {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        } }>

            <div ref={ paletteContainer }
                 style={ {
                     position: 'relative',
                     width: '200px',
                     height: '100%',
                     backgroundColor: '#f5f5f5'
                 } }>
            </div>

            <div ref={ diagramContainer }
                 style={ {
                     position: 'relative',
                     width: 'calc(100% - 200px)',
                     height: '100%'
                 } }>
            </div>

            <ContextMenu onLoad={ doAfterOnLoad }/>
        </div>
    )
}