import {useEffect, useState} from 'react'
import IconLopo from '@/assets/lopo.png'

const formatDate = () => {
    const t = new Date()
    const yy = t.getFullYear()
    const M = t.getMonth()
    const d = t.getDate()
    const h = t.getHours()
    const m = t.getMinutes()
    const s = t.getSeconds()

    // return `${yy}-${M > 9 ? M : '0' + M}-${d > 9 ? d : '0' + d} ${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
    return `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
}

/**
 * @supported css `rotate` since chrome@114
 */
export default function PageHome() {
    const [timeStr, setTimeStr] = useState('')

    useEffect(() => {
        setTimeStr(formatDate())
        const timer = window.setInterval(() => {
            setTimeStr(formatDate())
        }, 1000)

        return () => window.clearInterval(timer)
    }, [])

    return (
        <div className="page-home"
             style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
            <div style={{marginTop: 48, fontSize: 52}}>{timeStr}</div>
            <img src={IconLopo} alt="lopo" width="80"
                 style={{position: 'absolute', left: 0, top: 56, rotate: '-45deg', transformOrigin: 'top left'}}/>
        </div>
    )
}