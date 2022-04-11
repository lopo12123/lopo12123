import Styles from "./ProjectList.module.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAxios } from "@/stores/useAxiosStore";
import { useToast } from "@/stores/useToastStore";
import LinkLabel from "@/components/Misc/LinkLabel";

interface TableItem {
    index: number
    name: string
    links: {
        type: string
        url: string
    }[]
}

export default () => {
    const [ tableData, setTableData ] = useState<TableItem[]>([])

    useLayoutEffect(() => {
        useAxios()
            .get('project-list', '/ProjectList.json')
            .then((res) => {
                setTableData(res.data)
            })
            .catch((e) => {
                useToast().error(e.toString())
            })

        return () => {
            useAxios().cancelScopes('project-list')
        }
    }, [])

    const LinkTemplate = ({ links }: TableItem) => {
        return (
            <div>
                {
                    links.map((link, index) => {
                        return (
                            <LinkLabel key={index} {...link}/>
                            // <div key={ index }>{ link.type }</div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className={ Styles.projectList }>
            <DataTable className={ Styles.table }
                       value={ tableData }
                       columnResizeMode="fit"
                       responsiveLayout="scroll">
                <Column header="index" field="index" style={ { width: '100px' } }/>
                <Column header="name" field="name" style={ { width: '100px' } }/>
                <Column header="links" body={ LinkTemplate }/>
            </DataTable>
        </div>
    )
}