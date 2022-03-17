import { Link } from "react-router-dom";
import { ContextMenu } from "primereact/contextmenu";
import { useToastStore } from "@/scripts/misc";
import { useRef } from "react";
import type { MenuItem } from "primereact/menuitem";

export default function NavigationMenu() {
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
                console.log('go home')
            }
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
        },
        {
            separator: true
        },
        {
            label: 'Sub App',
            icon: 'pi pi-sitemap',
            items: [
                {
                    label: 'vite-react-ts',
                    icon: 'pi pi-book'
                },
                {
                    label: 'vite-vue-ts',
                    icon: 'pi pi-book'
                }
            ]
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

                <button onClick={ () => {
                    useToast.info('message')
                } }>toast
                </button>
                <button onClick={ () => {
                    useToast.clear()
                } }>clear
                </button>
                <Link to="/">home</Link> <br/>
                <Link to="/vite-react-ts">vite-react-ts</Link> <br/>
                <Link to="/vite-vue-ts">vite-vue-ts</Link> <br/>
            </div>

            <ContextMenu ref={ ctxMenuRef } model={ ctxMenuConfig }/>
        </div>
    )
}