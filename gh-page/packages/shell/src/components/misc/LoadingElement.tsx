export interface LoadingElementProps {
    text?: string
}

export const LoadingElement = (props: LoadingElementProps) => {
    return (
        <div style={ {
            position: 'relative',
            width: 'fit-content',
            height: '30px',
            lineHeight: '30px'
        } }>
            <i className="pi pi-spinner pi-spin"/>
            { props.text ?? 'loading' }
        </div>
    )
}