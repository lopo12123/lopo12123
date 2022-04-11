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
            <span className="custom-rgb">
                <i className="pi pi-sync pi-spin"/>
            </span>
            <span className="custom-blink"
                  style={ {
                      marginLeft: '10px',
                      fontFamily: 'consolas'
                  } }>
                { props.text ?? 'loading' }
            </span>
        </div>
    )
}