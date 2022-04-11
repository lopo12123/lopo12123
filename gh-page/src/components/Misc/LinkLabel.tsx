import Styles from "./misc.module.scss";

const BuildInColor: { [k: string]: string } = {
    repository: '#f8ba3f',
    homepage: '#0cd553'
}

export interface LinkLabelProps {
    type: string
    url: string
    color?: string
}

export default (props: LinkLabelProps) => {
    return (
        <div className={Styles.linkLabel}
            style={ {
                color: (props.color ?? BuildInColor[props.type] ?? '#ffffff'),
            } }
            onClick={ () => {
                window.open(props.url, '_blank')
            } }>
            { props.type }
        </div>
    )
}