import {useEffect, useState} from "react";

export default function PageHome() {
    const [timeStr, setTimeStr] = useState('')

    useEffect(() => {
        const timer = window.setInterval(() => {
            setTimeStr(new Date().toLocaleString())
        }, 1000)

        return () => window.clearInterval(timer)
    }, [])

    return (
        <div className="page-home">
            <div>{timeStr}</div>
        </div>
    )
}