export const TestView = (prop: { label: string, icon: string }) => {

    return (
        <div>
            label: { prop.label } <br/>
            icon: { prop.icon }
        </div>
    )
}