import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextMenu } from "primereact/contextmenu";
import { Tooltip } from "primereact/tooltip";
import type { MenuItem } from "primereact/menuitem";
import { navigateToSubApp, navigateToTool, SubAppNameList, ToolNameList } from "@/router";
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
            label: 'Tool',
            icon: 'pi pi-box',
            items: ToolNameList.map((tool) => {
                return {
                    label: tool,
                    icon: 'pi pi-bolt',
                    command() {
                        navigateToTool(navigate, tool)
                    }
                }
            })
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

    const [ inMenu, setInMenu ] = useState(false)

    return (
        <div>
            <div className="drag-controller"
                 onClick={ (e) => {
                     ctxMenuRef.current?.show(e)
                 } }
                 onContextMenu={ (e) => {
                     ctxMenuRef.current?.show(e)  // 组件内部有 preventDefault 和 stopPropagation
                 } }>
                <div id="navigate-menu"
                     data-pr-tooltip="Place me anywhere."
                     style={ {
                         position: 'relative',
                         width: inMenu ? '80px' : '30px',
                         height: '30px',
                         marginLeft: inMenu ? '0' : '25px',
                         border: 'dashed 1px #777777',
                         borderRadius: '5px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         transition: 'ease 1s',
                         overflow: 'hidden'
                     } }
                     onMouseEnter={ () => {
                         setInMenu(true)
                     } }
                     onMouseLeave={ () => {
                         setInMenu(false)
                     } }>
                    {
                        inMenu
                            ? <span style={ {
                                fontSize: '12px',
                                fontFamily: 'lab',
                                whiteSpace: 'nowrap'
                            } }>
                                Menu
                            </span>
                            : <span className="custom-rgb" style={ { opacity: '0.5' } }>
                                <i className="pi pi-cog pi-spin" style={ { fontSize: '18px' } }/>
                            </span>
                    }
                </div>
            </div>

            <ContextMenu ref={ ctxMenuRef } model={ ctxMenuConfig }/>
            <Tooltip target="#navigate-menu" mouseTrack mouseTrackTop={20} position="bottom" />
        </div>
    )
}