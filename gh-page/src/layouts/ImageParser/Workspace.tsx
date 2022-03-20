import { useLayoutEffect, useRef } from "react";
import { fabric } from "fabric";
import { fabricOperate } from "@/scripts/CanvasOperate";

interface WorkspaceProp {
    onInit: (canvas: fabricOperate | null) => void
}

export const Workspace = (prop: WorkspaceProp) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)


    useLayoutEffect(() => {
        if(!!containerRef.current && !!canvasRef.current) {
            const [ width, height ] = [ containerRef.current.offsetWidth - 20, containerRef.current.offsetHeight - 20 ]
            const fabObj = new fabricOperate(
                new fabric.Canvas(
                    canvasRef.current,
                    {
                        width: width,
                        height: height
                    }
                )
            )
            prop.onInit(fabObj)
        }
        else {
            prop.onInit(null)
        }
    }, [])

    return (
        <div className="custom-scroll"
             ref={ containerRef }
             style={ {
                 position: 'relative',
                 width: '100%',
                 height: '100%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 overflow: 'auto'
             } }>
            <canvas ref={ canvasRef }
                    style={ {
                        position: 'relative',
                        border: 'solid 1px #cccccc'
                    } }/>
        </div>
    )
}
