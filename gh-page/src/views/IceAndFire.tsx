import {useLayoutEffect, useRef} from "react";
import {IAF} from "@/scripts/IceAndFire";

export const IceAndFire = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        let iaf: IAF

        if(!!canvasRef.current) {
            iaf = new IAF(canvasRef.current)
            iaf.runTest()
        }

        return () => {
            iaf?.stop()
        }
    }, [])

    return (
        <div className="styled-scroll" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#efefef',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        }}>
            <canvas ref={canvasRef} style={{
                position: 'relative',
                width: '400px',  // '960px',
                height: '300px',  // '600px',
                borderRadius: '5px',
                outline: 'none',
                backgroundColor: '#333333'
            }} />
        </div>
    )
}
