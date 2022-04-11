import { Outlet } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useToast } from "@/stores/useToastStore";

export default () => {
    const toastRef = useRef<Toast | null>(null)

    useEffect(() => {
        useToast().bind(toastRef.current)

        return () => {
            useToast().bind(null)
        }
    }, [])

    return (
        <div style={ {
            position: 'relative',
            width: '100%',
            height: '100%'
        } }>
            <Toast ref={ toastRef }/>

            <Outlet/>
        </div>
    )
}