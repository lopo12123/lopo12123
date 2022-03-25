import { NavigateFunction } from "react-router-dom";
import type { MenuItem } from "primereact/menuitem";

interface SpaMenu {
    [groupName: string]: {
        [spaName: string]: {
            // label
            label: string
            // icon
            icon: string
        }
    }
}
const spaMenuConfig: SpaMenu = {
    tool: {
        // 'image-parser': {
        //     label: 'Image Parser',
        //     icon: 'pi pi-images'
        // },
        'flow-chart': {
            label: 'Flow Chart',
            icon: 'pi pi-sitemap'
        }
    },
    demo: {
        'vite-react-ts': {
            label: 'vite-react-ts',
            icon: ''
        },
        'vite-vue-ts': {
            label: 'vite-vue-ts',
            icon: ''
        }
    }
}

export interface SpaMenuItem extends MenuItem{
    path: string
    // label: string
    // icon?: string
    // command?: () => void
    items?: SpaMenuItem[]
}
const spaMenuList: SpaMenuItem[] = [
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
                icon: 'pi pi-sitemap'
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
                icon: 'pi pi-book'
            },
            {
                path: 'vite-vue-ts',
                label: 'vite-vue-ts',
                icon: 'pi pi-book'
            }
        ]
    }
]


/**
 * @description navigate to spa page
 * @param group
 * @param name
 * @param navigate
 */
const gotoSpa = (group: string, name: string, navigate: NavigateFunction) => {
    navigate(`${group}/${name}`)
}


export {
    // spaMenuConfig,
    spaMenuList,
    gotoSpa
}