import { spaMenuList } from "@/router/spaNavigate";

export const TestView = (prop: { label: string, icon: string }) => {

    const aa = spaMenuList

    return (
        <div>
            label: { prop.label } <br/>
            icon: { prop.icon }
        </div>
    )
}