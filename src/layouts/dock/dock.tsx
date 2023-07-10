import IconHome from '@/assets/dock/home.png'
import IconGithub from '@/assets/dock/github.png'
import IconTerminal from '@/assets/dock/terminal.png'
import IconTrash from '@/assets/dock/trash.png'
import IconQuit from '@/assets/dock/quit.png'
import {Dock} from "primereact/dock";
import {MenuItem} from "primereact/menuitem";

const dockItems: MenuItem[] = [
    {
        label: 'Home',
        icon: <img src={IconHome} width="100%" alt="Home"/>,
        command(_ev) {
            // TODO: terminal
        }
    },
    {
        label: 'Terminal',
        icon: <img src={IconTerminal} width="100%" alt="Terminal"/>,
        command(_ev) {
            // TODO: terminal
        }
    },
    {
        label: 'Github',
        icon: <img src={IconGithub} width="100%" alt="Github"/>,
        command(_ev) {
            window.open('https://github.com/lopo12123', '_blank')
        }
    },
    // {
    //     label: 'Trash',
    //     icon: <img src={IconTrash} width="100%" alt="Trash"/>,
    //     command(_ev) {
    //         // TODO: terminal
    //     }
    // },
    {
        label: 'Quit',
        icon: <img src={IconQuit} width="100%" alt="Quit"/>,
        command(_ev) {
            // TODO: terminal
            const quit = confirm('确认退出?')
            if (quit) window.close()
        }
    },
]

const DockBar = () => {

    return (
        <Dock style={{marginBottom: 30}} model={dockItems} pt={{action: {style: {cursor: 'pointer'}}}}/>
    )
}

export default DockBar