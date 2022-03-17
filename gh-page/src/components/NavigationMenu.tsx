import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContextMenu } from "primereact/contextmenu";
import { useToastStore } from "@/scripts/misc";
import type { MenuItem } from "primereact/menuitem";
import { navigateToSubApp, navigateToTool, SubAppNameList, ToolNameList } from "@/router";

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

    return (
        <div>
            <div className="drag-controller"
                 onContextMenu={ (e) => {
                     ctxMenuRef.current?.show(e)  // 组件内部有 preventDefault 和 stopPropagation
                 } }>
                <div className="sprite">
                    Navigation menu
                </div>
            </div>

            <ContextMenu ref={ ctxMenuRef } model={ ctxMenuConfig }/>
        </div>
    )
}