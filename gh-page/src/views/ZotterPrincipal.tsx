import { useLayoutEffect, useRef, useState } from "react";
import { UseAxios } from "axios-canceller";
import { Animate, useToastStore } from "@/scripts/misc";
import { MessagesHoverSwitch } from "@/components/misc/MessagesHoverSwitch";

interface Principal {
    id: string  // uuid
    number: number  // 1-57
    commandment: {
        en: string
        zh: string
    }
    explain: {
        en: string
        zh: string
    }
}

export const ZotterPrincipal = () => {
    const useAxios = new UseAxios()

    const containerRef = useRef<HTMLDivElement>(null)
    const [ list, setList ] = useState<Principal[]>([])
    const [ headId, setHeadId ] = useState('')
    const [ move, setMove ] = useState(true)

    // 执行一次: 获取原始数据
    useLayoutEffect(() => {
        (async function () {
            await useAxios.get('zotter-principal', 'zotter57.json')
                .then((res) => {
                    setList(res.data)
                    setHeadId(res.data[0].id)
                })
                .catch((err) => {
                    useToastStore().error(err.toString())
                })
        })()

        return () => {
            useAxios.cancelScopes('zotter-principal')
        }
    }, [])

    // 依赖执行: 列表的首项变换后触发
    useLayoutEffect(() => {
        if(headId !== '' && !!containerRef.current) {
            const container = containerRef.current
            const head = container.firstElementChild as HTMLElement
            const tail = head.cloneNode(true)
            head.id = head.id + '-to-be-remove'
            Animate.fadeOut(head, 'height')
                ?.then(() => {
                    container.appendChild(tail)
                    setHeadId(container.firstElementChild!.id)
                })
        }
    }, [ headId ])

    return (
        <div ref={ containerRef } style={ {
            position: 'relative',
            width: '100%',
            height: '100px',
            fontFamily: 'lab',
            overflow: 'hidden auto'
        } }>
            {
                list.slice(0, 10).map(({ id, number, commandment, explain }) => {
                    return (
                        <MessagesHoverSwitch
                            key={ id }
                            id={ id }
                            number={ number }
                            normal={ { ...commandment } }
                            hover={ { ...explain } }/>
                    )
                })
            }
        </div>
    )
}
