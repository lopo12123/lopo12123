import { useLayoutEffect, useRef, useState } from "react";
import { v4 as UUID } from "uuid";
import { BaseOperate, fabricOperate } from "@/scripts/CanvasOperate";
import { useToastStore } from "@/scripts/ToastStore";
import { Workspace } from "@/layouts/ImageParser/Workspace";
import { InputNumber } from "primereact/inputnumber";

interface ImageBlockProp {
    // props in item
    id: string
    file: File
    name: string
    type: string
    size: string
    // props in jsx
    onSelect?: () => void
    onClose?: () => void
    active?: boolean
}

const ImageBlock = (prop: ImageBlockProp) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useLayoutEffect(() => {
        if(!!canvasRef.current && !!prop.file) {
            BaseOperate.drawBlobToCanvas(prop.file, canvasRef)
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
        } } onClick={ prop.onSelect }>
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
            <div style={ {
                position: 'absolute',
                zIndex: '10',
                width: '20px',
                height: '20px',
                top: '2px',
                right: '0',
                borderRadius: '0 0 0 20px',
                outline: 'solid 1px #1890ff',
                backgroundColor: '#1890ff',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end'
            } }
                 onClick={ (e) => {
                     e.stopPropagation();
                     prop.onClose?.()
                 } }>
                <i className="pi pi-times" style={ { margin: '2px 2px 0 0', fontSize: '14px' } }/>
            </div>
        </div>
    )
}

export const ImageParser = () => {
    const imgIptRef = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<ImageBlockProp[]>([])
    const [ activeId, setActiveId ] = useState('')
    const [ fabObj, setFabObj ] = useState<fabricOperate | null>(null)
    const [ operating, setOperating ] = useState(false)

    const imageSelected = (item: ImageBlockProp) => {
        if(!fabObj) {
            useToastStore().warn('Please wait for canvas to finish initializing')
        }
        else if(activeId === item.id) {
            useToastStore().warn('you selected the same file')
        }
        else {
            fabObj.render(item.file)
                .then(() => {
                    setActiveId(item.id)
                    setOperating(true)
                })
                .catch((e) => {
                    useToastStore().error(e.toString())
                })
        }
    }

    const [ opacity, setOpacity ] = useState(1)
    const [ width, setWidth ] = useState(0)
    const [ height, setHeight ] = useState(0)

    const imageSolve = (type: 'width' | 'height' | 'opacity' | 'gray' | 'download') => {
        if(!operating || !fabObj) {
            useToastStore().warn('Select a file first')
        }
        else {
            switch (type) {
                case 'width':
                    fabObj.setWidth(width)
                    break
                case 'height':
                    fabObj.setHeight(height)
                    break
                case 'opacity':
                    fabObj.setOpacity(opacity)
                    break
            }
        }
    }

    return (
        <div style={ {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        } }>
            <div style={ {
                position: 'relative',
                width: '299px',
                height: '100%',
                borderRight: 'solid 1px #cccccc'
            } }>
                <input ref={ imgIptRef } type="file" style={ { display: 'none' } }
                       onChange={ () => {
                           if(imgIptRef.current!.files!.length > 0) {
                               const file = imgIptRef.current!.files![0]
                               const [ suffix, ...nameReverse ] = file.name.split('.').reverse()

                               if(!BaseOperate.allowType.includes(suffix)) {
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
                                            onSelect={ () => {
                                                imageSelected(item)
                                            } }
                                            onClose={ () => {
                                                setFileList(fileList.filter((file) => {
                                                    return file.id !== activeId
                                                }))
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
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                } }>
                    <div style={ { width: '100%' } }
                         onClick={ () => {
                             imgIptRef.current?.click()
                         } }>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-upload"/>&nbsp;Upload(*.jpg, *.png)
                            </span>
                    </div>

                    <div className="p-inputgroup"
                         style={ {
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         } }
                         onClick={ () => {
                             imageSolve('width')
                         } }>
                        <span className="p-inputgroup-addon" style={ { width: '80px' } }>Width</span>
                        <InputNumber value={ width } step={ 10 } allowEmpty={ false } suffix=" px"
                                     onChange={ (e) => {
                                         setWidth(e.value!)
                                     } }/>
                        <span className="p-inputgroup-addon"><span><i className="pi pi-check"/></span></span>
                    </div>

                    <div className="p-inputgroup"
                         style={ {
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         } }
                         onClick={ () => {
                             imageSolve('height')
                         } }>
                        <span className="p-inputgroup-addon" style={ { width: '80px' } }>Height</span>
                        <InputNumber value={ height } step={ 10 } allowEmpty={ false } suffix=" px"
                                     onChange={ (e) => {
                                         setHeight(e.value!)
                                     } }/>
                        <span className="p-inputgroup-addon"><span><i className="pi pi-check"/></span></span>
                    </div>

                    <div className="p-inputgroup"
                         style={ {
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         } }
                         onClick={ () => {
                             imageSolve('opacity')
                         } }>
                        <span className="p-inputgroup-addon" style={ { width: '80px' } }>Opacity</span>
                        <InputNumber value={ opacity } min={ 0 } max={ 1 } step={ 0.05 }
                                     minFractionDigits={ 2 } maxFractionDigits={ 2 }
                                     allowEmpty={ false }
                                     onChange={ (e) => {
                                         setOpacity(e.value!)
                                     } }/>
                        <span className="p-inputgroup-addon"><span><i className="pi pi-check"/></span></span>
                    </div>

                    <div style={ { width: '100%' } }
                         onClick={ () => {
                             imageSolve('gray')
                         } }>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-sync"/>&nbsp;RGB to Gray
                            </span>
                    </div>

                    <div style={ { width: '100%' } }
                         onClick={ () => {
                             imageSolve('download')
                         } }>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-download"/>&nbsp;Download (*.png)
                            </span>
                    </div>
                </div>
            </div>
            <div style={ {
                position: 'relative',
                width: 'calc(100% - 300px)',
                height: '100%'
            } }>
                <Workspace onInit={ (canvas) => {
                    if(!!canvas) {
                        setFabObj(new fabricOperate(canvas))
                    }
                } }/>
            </div>
        </div>
    )
}
