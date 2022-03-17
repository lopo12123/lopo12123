import { useLayoutEffect, useRef, useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { v4 as UUID } from "uuid";
import { CanvasOperate, useToastStore } from "@/scripts/misc";
import { Button } from "primereact/button";

interface ImageBlockProp {
    id: string
    file: File
    name: string
    type: string
    size: string
    onClick?: () => void
    active?: boolean
}

const ImageBlock = (prop: ImageBlockProp) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useLayoutEffect(() => {
        if(!!canvasRef.current && !!prop.file) {
            CanvasOperate.drawBlobToCanvas(prop.file, canvasRef)
        }
    }, [])

    return (
        <div style={ {
            position: 'relative',
            width: 'calc(100% - 5px)',
            height: '70px',
            margin: '10px 0',
            borderLeft: `solid 5px ${ prop.active ? '#409eff' : '#909399' }`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        } } onClick={ prop.onClick }>
            <canvas id={ `canvas-${ prop.id }` } ref={ canvasRef }
                    width="58" height="58"
                    style={ {
                        position: 'relative',
                        width: '58px',
                        height: '58px',
                        border: 'solid 1px #cccccc',
                        outline: 'none'
                    } }/>
            <div style={ {
                position: 'relative',
                width: 'calc(100% - 80px)',
                height: '100%',
                outline: 'none',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
                overflow: 'auto'
            } }>
                <span style={ { whiteSpace: 'nowrap' } }>
                    <b style={ { width: '40px', display: 'inline-block' } }>name</b> { prop.name }
                </span>
                <span style={ { whiteSpace: 'nowrap' } }>
                    <b style={ { width: '40px', display: 'inline-block' } }>type</b> { prop.type }
                </span>
                <span style={ { whiteSpace: 'nowrap' } }>
                    <b style={ { width: '40px', display: 'inline-block' } }>size</b> { prop.size }
                </span>
            </div>
        </div>
    )
}

export const ImageParser = () => {
    const imgIptRef = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<ImageBlockProp[]>([])
    const [ activeId, setActiveId ] = useState('')

    const operateImage = (type: 'load' | 'remove' | 'resize' | 'gray') => {
        const item = fileList.find((file) => {
            return file.id === activeId
        })
        if(!item) {
            useToastStore().warn('Please select one first')
        }
    }

    return (
        <Splitter gutterSize={ 5 } style={ {
            position: 'relative',
            width: '100%',
            height: '100%'
        } }>
            <SplitterPanel className="panel-container" size={ 20 } minSize={ 20 }>
                <div style={ {
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                } }>
                    <input ref={ imgIptRef } type="file" style={ { display: 'none' } }
                           onChange={ () => {
                               if(imgIptRef.current!.files!.length > 0) {
                                   const file = imgIptRef.current!.files![0]
                                   const [ suffix, ...nameReverse ] = file.name.split('.').reverse()

                                   if(!CanvasOperate.allowType.includes(suffix)) {
                                       useToastStore().error('Type not allowed: *.' + suffix)
                                   }
                                   else {
                                       setFileList([
                                           ...fileList,
                                           {
                                               id: UUID(),
                                               name: nameReverse.reverse().join('.'),
                                               size: file.size + 'B',
                                               file: file,
                                               type: suffix,
                                           }
                                       ])
                                   }
                               }
                           } }/>

                    <div style={ {
                        position: 'relative',
                        width: '100%',
                        height: '30px',
                        fontFamily: 'Curlz MT',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        letterSpacing: '3px',
                        lineHeight: '30px',
                        textAlign: 'center'
                    } }>
                        File List
                    </div>
                    <div style={ {
                        position: 'relative',
                        width: 'calc(100% - 40px)',
                        height: '50%',
                        margin: '0 20px',
                        overflow: 'hidden auto'
                    } }>
                        {
                            fileList.map((item, index) => {
                                return (
                                    <ImageBlock key={ index } { ...item } active={ activeId === item.id }
                                                onClick={ () => {
                                                    setActiveId(item.id)
                                                } }/>
                                )
                            })
                        }
                    </div>
                    <div style={ {
                        position: 'relative',
                        width: 'calc(100% - 40px)',
                        height: 'calc(50% - 30px)',
                        margin: '0 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    } }>
                        <Button className="p-button-sm p-button-success"
                                label="Load local image"
                                icon="pi pi-folder-open"
                                style={{width: '100%', margin: '5px 0'}}
                                onClick={ () => {
                                    imgIptRef.current?.click()
                                } }/>
                        <Button className="p-button-sm"
                                label="Load selected image"
                                icon="pi pi-angle-double-right"
                                style={{width: '100%', margin: '5px 0'}}
                                onClick={ () => {
                                    operateImage('load')
                                } }/>
                        <Button className="p-button-sm p-button-warning"
                                label="Remove selected image"
                                icon="pi pi-trash"
                                style={{width: '100%', margin: '5px 0'}}
                                onClick={ () => {
                                    operateImage('remove')
                                } }/>
                    </div>
                </div>
            </SplitterPanel>
            <SplitterPanel className="view-container" size={ 80 } minSize={ 50 }>
                222
            </SplitterPanel>
        </Splitter>
    )
}
