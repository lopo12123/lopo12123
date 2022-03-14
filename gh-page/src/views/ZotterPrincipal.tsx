import { useEffect, useState } from "react";
import { UseAxios } from "axios-canceller";
import { useToastStore } from "@/scripts/misc";
import { NormalHoverSwitch } from "@/components/NormalHoverSwitch";

export interface Principal {
    id: string  // uuid
    number: number  // 1-57
    commandment: {
        zh: string
        en: string
    }
    explain: {
        zh: string
        en: string
    }
}

const PrincipalBox = (prop: { number: number, zh: string, en: string }) => {
    return (
        <div style={{
            position: 'relative',
            width: 'calc(100% - 202px)',
            height: '58px',
            margin: '10px 50px',
            padding: '0 50px',
            border: 'solid 1px #cccccc80',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            123
        </div>
    )
}

export const ZotterPrincipal = () => {
    const useAxios = new UseAxios()

    const [ list, setList ] = useState<Principal[]>([])

    useEffect(() => {
        useAxios.get('zotter-principal', 'zotter57.json')
            .then((res) => {
                setList(res.data)
            })
            .catch((err) => {
                useToastStore().error(err.toString())
            })
        return () => {
            useAxios.cancelScopes('zotter-principal')
        }
    }, [])

    return (
        <div style={ {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#001c33',
            color: '#eeeeee',
            fontFamily: 'lab',
            overflow: 'auto hidden'
        } }>
            { list.map(({ id, number, commandment, explain }) => {
                return (
                    <NormalHoverSwitch
                        key={ id }
                        normal={
                            <PrincipalBox number={number} en={commandment.en} zh={commandment.zh}/>
                        }
                        hover={
                            <PrincipalBox number={number} en={commandment.en} zh={commandment.zh}/>
                        }/>
                )
            }) }
        </div>
    )
}