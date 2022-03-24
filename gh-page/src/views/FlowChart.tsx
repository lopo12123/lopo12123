import { useLayoutEffect, useRef, useState } from "react";
import { ContextMenu, ContextMenuOnLoad } from "@/components/FlowChart/ContextMenu";
import { GojsOperate } from "@/scripts/FlowChart.script";
import { EnableDrag } from "@/components/misc/EnableDrag";
import Styles from "@/styles/flowchart.module.scss";

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

            <EnableDrag key="inspector-container"
                        initPos={ { left: '210px', top: '10px' } }
                        innerEl={
                            <div style={ {
                                position: 'relative',
                                width: '300px',
                                height: 'fit-content',
                                border: 'solid 2px #aaaaaa',
                                borderRadius: '10px',
                                backgroundColor: '#ffffff',
                                fontFamily: 'Fira Sans,Arial,sans-serif'
                            } }>
                                <div className="drag-controller"
                                     style={ {
                                         position: 'relative',
                                         width: 'calc(100% - 10px)',
                                         height: '10px',
                                         margin: '5px',
                                         borderRadius: '5px',
                                         backgroundColor: '#aaaaaa'
                                     } }>
                                </div>
                                <div className={ Styles.inspectorPanel }>
                                    <div ref={ inspectorContainer }/>
                                </div>
                            </div>
                        }/>

            <ContextMenu onLoad={ doAfterOnLoad } instance={ diagramObj }/>
        </div>
    )
}