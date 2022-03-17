import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextMenu } from "primereact/contextmenu";
import { Tooltip } from "primereact/tooltip";
import type { MenuItem } from "primereact/menuitem";
import { MiscItemList, navigateToMisc, navigateToSubApp, navigateToTool, SubAppNameList, ToolNameList } from "@/router";
import { useToastStore } from "@/scripts/misc";

export default function NavigationMenu() {
    const navigate = useNavigate()
    const useToast = useToastStore()

    const ctxMenuRef = useRef<ContextMenu>(null)
    const ctxMenuConfig: MenuItem[] = [
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
        {
            label: 'Sub App',
            icon: 'pi pi-sitemap',
            items: SubAppNameList.map((subApp) => {
                return {
                    label: subApp,
                    icon: 'pi pi-book',
                    command() {
                        navigateToSubApp(navigate, subApp)
                    }
                }
            })
        },
        {
            label: 'Tool',
            icon: 'pi pi-box',
            items: ToolNameList.map((tool) => {
                return {
                    label: tool.label,
                    icon: tool.icon,
                    command() {
                        navigateToTool(navigate, tool.path)
                    }
                }
            })
        },
        {
            label: 'Misc',
            icon: 'pi pi-hashtag',
            items: MiscItemList.map((misc) => {
                return {
                    label: misc.label,
                    icon: misc.icon,
                    command() {
                        navigateToMisc(navigate, misc.path)
                    }
                }
            })
        },
        {
            label: 'Star Me',
            icon: 'pi pi-star',
            command: () => {
                window.open('https://github.com/lopo12123/lopo12123', '_blank')
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

    const [ ctxOpen, setCtxOpen ] = useState(false)
    const [ inMenu, setInMenu ] = useState(false)

    return (
        <div>
            <div className="drag-controller"
                 onContextMenu={ (e) => {
                     ctxMenuRef.current?.show(e)  // 组件内部有 preventDefault 和 stopPropagation
                 } }>
                <div id="navigate-menu"
                     data-pr-tooltip="Place me anywhere."
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
                                fontSize: '12px',
                                lineHeight: '16px',
                                fontFamily: 'lab',
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
                         model={ ctxMenuConfig }
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