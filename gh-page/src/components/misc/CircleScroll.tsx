import { useLayoutEffect, useRef, useState } from "react";
import { Queue } from "lopo-lib";

interface CircleScrollProp {
    items: any[]
    fadeDelay: number
    itemTemplate: (item: any, keyStr: string | number) => JSX.Element
}

export const CircleScroll = (prop: CircleScrollProp): JSX.Element => {
    const { items, fadeDelay, itemTemplate } = prop

    const circleList = new Queue<any>(items.length)
    circleList.in(...items)

    const listRef = useRef<HTMLDivElement>(null)
    const [listToShow, setListToShow] = useState(circleList.getQueue())

    useLayoutEffect(() => {
        ;(listRef.current!.firstElementChild as HTMLElement).style.animation = `fade-out ${fadeDelay/1000}s infinite`
        ;(listRef.current!.lastElementChild as HTMLElement).style.animation = `fade-in ${fadeDelay/1000}s infinite`
        const timerId = setInterval(() => {
            circleList.circle(1)
            setListToShow(circleList.getQueue())
        }, fadeDelay)

        return () => {
            clearInterval(timerId)
        }
    }, [])

    return (
        <div ref={listRef} style={{
            height: '60px',
            overflow: 'hidden'
        }}>
            { listToShow.map((item, index) => {
                return itemTemplate(item, index)
            }) }
        </div>
    )
}