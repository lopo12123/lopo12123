import { useLayoutEffect, useRef } from "react";
import { fabric } from "fabric";

interface WorkspaceProp {
    onInit: (canvas: fabric.Canvas | null) => void
}

export const Workspace = (prop: WorkspaceProp) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    let canvas: fabric.Canvas
    useLayoutEffect(() => {
        if(!!containerRef.current && !!canvasRef.current) {
            const [ width, height ] = [ containerRef.current.offsetWidth - 20, containerRef.current.offsetHeight - 20 ]
            canvas = new fabric.Canvas(canvasRef.current, {width: width, height: height})

            prop.onInit(canvas)
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
                        border: 'solid 1px #efefef'
                    } }/>
        </div>
    )
}