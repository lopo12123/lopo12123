import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Toast } from "primereact/toast";
import NavigationMenu from "./components/NavigationMenu";
import { EnableDrag } from "./components/misc/EnableDrag";
import { useToastStore } from "@/scripts/misc";

export default function App() {
    const toastRef = useRef<Toast>(null)

    useEffect(() => {
        useToastStore().bind(toastRef.current)
        return () => {
            useToastStore().bind(null)
        }
    }, [])

    return (
        <div className="App custom-cursor"
             style={ {
                 position: 'relative',
                 width: '100%',
                 height: '100%',
             } }>

            <Toast ref={ toastRef }/>

            <EnableDrag
                key="test" initPos={ { left: '500px', top: '200px' } }
                innerEl={ <NavigationMenu/> }/>

            <Outlet/>
        </div>
    )
}
