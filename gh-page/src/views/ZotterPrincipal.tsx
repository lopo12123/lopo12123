import {useEffect, useState} from "react";
import {UseAxios} from "axios-canceller";
import {useToastStore} from "@/scripts/misc";
import {NormalHoverSwitch} from "@/components/NormalHoverSwitch";

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

const PrincipalBox = (prop: { number: number, zh: string, en: string, highlight?: boolean }) => {
    return (
        <div style={{
            position: 'relative',
            width: 'calc(100% - 206px)',
            height: '54px',
            margin: '15px 50px',
            padding: '0 50px',
            border: `solid 3px ${ prop.highlight ? '#673b47' : '#c0c0c0' }`,
            borderRadius: '5px',
            background: `linear-gradient(90deg,
                #919191 0,
                #4e4e4e 25%,
                #5e5e5e 50%,
                #919191 75%,
                #c6c6c6 100%
            )`,
            boxShadow: '#cccccc 10px 3px 20px',
            color: prop.highlight ? '#ffffff' : '#777777',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <div className="index"
                 style={{
                     width: '150px',
                     minWidth: '150px',
                     marginRight: '50px',
                     color: '#ffffff',
                     fontSize: '18px',
                     letterSpacing: '3px'
                 }}>
                Principle {prop.number}
            </div>
            <div className="content">
                <div className="en">
                    {prop.en}
                </div>
                <div className="zh" style={{fontFamily: 'cursive'}}>
                    {prop.zh}
                </div>
            </div>
        </div>
    )
}

export const ZotterPrincipal = () => {
    const useAxios = new UseAxios()

    const [list, setList] = useState<Principal[]>([])

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
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#efefef',
            fontFamily: 'lab',
            overflow: 'hidden auto'
        }}>
            {list.map(({id, number, commandment, explain}) => {
                return (
                    <NormalHoverSwitch
                        key={id}
                        normal={
                            <PrincipalBox number={number} en={commandment.en} zh={commandment.zh}/>
                        }
                        hover={
                            <PrincipalBox number={number} en={explain.en} zh={explain.zh} highlight={true}/>
                        }/>
                )
            })}
        </div>
    )
}
