import { useLayoutEffect, useRef } from "react";
import { Physical } from "@/scripts/physical";

export const TestView = () => {
    const worldContainer = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        let phy: Physical

        if(!!worldContainer.current) {
            phy = new Physical(worldContainer.current)
            phy.runTest()
        }

        return () => {
            phy?.stop()
        }
    }, [])

    return (
        <canvas ref={ worldContainer }
                width={ 400 }
                height={ 300 }/>
    )
}