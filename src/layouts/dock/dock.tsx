import IconHome from '@/assets/dock/home.png'
import IconGithub from '@/assets/dock/github.png'
import IconTerminal from '@/assets/dock/terminal.png'
import IconQuit from '@/assets/dock/quit.png'
import {Dock} from "primereact/dock";
import {MenuItem} from "primereact/menuitem";
import {GlobalUtils} from "@/utils/global";

const DockBar = () => {
    const dockItems: MenuItem[] = [
        {
            label: 'Home',
            icon: <img src={IconHome} width="100%" alt="Home"/>,
            command(_ev) {
                // TODO: back to home
            }
        },
        {
            label: 'Terminal',
            icon: <img src={IconTerminal} width="100%" alt="Terminal"/>,
            command(_ev) {
                // TODO: show terminal
            }
        },
        {
            label: 'Github',
            icon: <img src={IconGithub} width="100%" alt="Github"/>,
            command: GlobalUtils.jumpToGithub,
        },
        {
            label: 'Quit',
            icon: <img src={IconQuit} width="100%" alt="Quit"/>,
            command: GlobalUtils.quit,
        },
    ]

    return (
        <Dock style={{marginBottom: 30}} model={dockItems} pt={{action: {style: {cursor: 'pointer'}}}}/>
    )
}

export default DockBar