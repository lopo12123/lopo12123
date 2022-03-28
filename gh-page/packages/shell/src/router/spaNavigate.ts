import { NavigateFunction } from "react-router-dom";
import type { MenuItem } from "primereact/menuitem";

export interface SpaMenuItem extends MenuItem {
    path: string
    // label: string
    // icon?: string
    // command?: () => void
    items?: SpaMenuItem[]
}

const useSpaMenu = (navigate?: NavigateFunction): SpaMenuItem[] => {
    return [
        {
            path: 'tool',
            label: 'tool',
            icon: 'pi pi-box',
            items: [
                // {
                //     path: 'image-parser',
                //     label: 'Image Parser',
                //     icon: 'pi pi-images'
                // },
                {
                    path: 'flow-chart',
                    label: 'Flow Chart',
                    icon: 'pi pi-sitemap',
                    command() {
                        navigate?.('tool/flow-chart')
                    }
                }
            ]
        },
        {
            path: 'spa-demo',
            label: 'spa demo',
            icon: 'pi pi-database',
            items: [
                {
                    path: 'vite-react-ts',
                    label: 'vite-react-ts',
                    icon: 'pi pi-book',
                    command() {
                        navigate?.('spa-demo/vite-react-ts')
                    }
                },
                {
                    path: 'vite-vue-ts',
                    label: 'vite-vue-ts',
                    icon: 'pi pi-book',
                    command() {
                        navigate?.('spa-demo/vite-vue-ts')
                    }
                }
            ]
        }
    ]
}

export {
    useSpaMenu
}