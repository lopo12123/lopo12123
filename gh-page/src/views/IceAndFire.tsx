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
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <canvas ref={canvasRef} style={{
                position: 'relative',
                width: '960px',
                height: '600px',
                border: 'solid 5px #777777',
                borderRadius: '5px',
                backgroundColor: '#333333'
            }} />
        </div>
    )
}
