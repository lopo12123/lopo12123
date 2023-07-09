import IconGithub from '@/assets/dock/github.svg'
import IconTerminal from '@/assets/dock/terminal.svg'
import {Dock} from "primereact/dock";
import {MenuItem} from "primereact/menuitem";

const dockItems: MenuItem[] = [
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
]

const DockBar = () => {

    return (
        <Dock style={{marginBottom: 30}} model={dockItems}/>
    )
}

export default DockBar