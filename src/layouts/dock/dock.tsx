import IconTool from '@/assets/dock/tool.png'
import IconNote from '@/assets/dock/note.png'
import IconStudy from '@/assets/dock/study.png'
import IconRSS from '@/assets/dock/rss.png'
import {Dock} from "primereact/dock";
import {MenuItem} from "primereact/menuitem";
import {useDeduplicateNavigate} from "@/routers";

const DockBar = () => {
    const deduplicateNavigate = useDeduplicateNavigate()
    const dockItems: MenuItem[] = [
        {
            label: 'Tool',
            icon: <img src={IconTool} width="48" alt=""/>,
            command: (_ev) => deduplicateNavigate('/tool')
        },
        {
            label: 'Note',
            icon: <img src={IconNote} width="48" alt=""/>,
            command: (_ev) => deduplicateNavigate('/note')
        },
        {
            label: 'Study',
            icon: <img src={IconStudy} width="48" alt=""/>,
            command: (_ev) => deduplicateNavigate('/study')
        },
        {
            label: 'RSS',
            icon: <img src={IconRSS} width="48" alt=""/>,
            command: (_ev) => deduplicateNavigate('/rss')
        },
    ]

    return (
        <Dock model={dockItems} position="left"
              style={{marginLeft: 32}}
              pt={{action: {className: 'p-help'}}}/>
    )
}

export default DockBar