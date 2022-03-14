import { useEffect } from "react";
import { UseAxios } from "axios-canceller";

export const ZotterPrincipal = () => {
    const useAxios = new UseAxios()

    useEffect(() => {
        useAxios.get('zotter-principal', 'zotter57.json')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        return () => {
            useAxios.cancelScopes('zotter-principal')
        }
    })

    return (
        <div>
            zotter
        </div>
    )
}