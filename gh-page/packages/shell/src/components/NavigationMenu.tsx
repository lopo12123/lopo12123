import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextMenu } from "primereact/contextmenu";
import { MenuItem } from "primereact/menuitem";
import { Tooltip } from "primereact/tooltip";
import { useToastStore } from "@shell/scripts/ToastStore";
import { useSpaMenu } from "@shell/router/spaNavigate";

export default function NavigationMenu() {
    const navigate = useNavigate()
    const useToast = useToastStore()

    const ctxMenuRef = useRef<ContextMenu>(null)
    const [ ctxOpen, setCtxOpen ] = useState(false)
    const [ inMenu, setInMenu ] = useState(false)

    const fullMenu: MenuItem[] = [
        {
            label: 'What do you want?',
            disabled: true
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            command() {
                navigate('/')
            }
        },
        ...useSpaMenu(navigate),
        {
            label: 'star',
            icon: 'pi pi-star',
            command: () => {
                window.open('https://github.com/lopo12123/lopo12123', '_blank')
            }
        },
        {
            label: 'some issues',
            icon: 'pi pi-envelope',
            command() {
                const aTag = document.createElement('a')
                const subject = '"Issues of flow chart"'
                aTag.href = `mailto:lopo@zju.edu.cn?subject=${subject}`
                aTag.click()
            }
        },
        {
            label: 'Noting',
            icon: 'pi pi-power-off',
            command() {
                useToast.replyCancel()
            }
        }
    ]

    return (
        <div>
            <div className="drag-controller"
                 onContextMenu={ (e) => {
                     ctxMenuRef.current?.show(e)  // 组件内部有 preventDefault 和 stopPropagation
                 } }>
                <div id="navigate-menu"
                     data-pr-tooltip="you can drag me anywhere."
                     style={ {
                         position: 'relative',
                         width: inMenu ? '80px' : '40px',
                         height: '40px',
                         marginLeft: inMenu ? '0' : '20px',
                         border: 'dashed 1px #777777',
                         borderRadius: '5px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         transition: 'ease 1s',
                         overflow: 'hidden'
                     } }
                     onMouseEnter={ () => {
                         if(!ctxOpen) setInMenu(true)
                     } }
                     onMouseLeave={ () => {
                         if(!ctxOpen) setInMenu(false)
                     } }>
                    {
                        inMenu
                            ? <span style={ {
                                color: '#777777',
                                fontFamily: 'Curlz MT',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                lineHeight: '16px',
                                whiteSpace: 'nowrap'
                            } }>
                                Right-Click <br/>
                                Show Menu
                            </span>
                            : <span className="custom-rgb" style={ { opacity: '0.5' } }>
                                <i className="pi pi-cog pi-spin" style={ { fontSize: '24px' } }/>
                            </span>
                    }
                </div>
            </div>

            <ContextMenu ref={ ctxMenuRef }
                         model={ fullMenu }
                         onShow={ () => {
                             setCtxOpen(true)
                         } }
                         onHide={ () => {
                             setCtxOpen(false)
                             setInMenu(false)
                         } }/>

            <Tooltip target="#navigate-menu" mouseTrack mouseTrackTop={ 20 } position="bottom"/>
        </div>
    )
}
