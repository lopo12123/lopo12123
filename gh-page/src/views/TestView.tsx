import { useLayoutEffect, useRef } from "react";
import { fabric } from "fabric";

export const TestView = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current)

        const rect = new fabric.Rect({
            top: 100,
            left: 100,
            width: 60,
            height: 60,
            fill: '#cccccc'
        })

        canvas.add(rect)
    }, [])

    return (
        <div>
            <canvas ref={canvasRef}/>
        </div>
    )
}