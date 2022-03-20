import { useRef, useState } from "react";
import { BaseOperate, fabricOperate } from "@/scripts/CanvasOperate";
import { useToastStore } from "@/scripts/ToastStore";
import { Workspace } from "@/layouts/ImageParser/Workspace";
import { InputNumber } from "primereact/inputnumber";

export const ImageParser = () => {
    const imgIptRef = useRef<HTMLInputElement>(null)
    const [ fileDataStr, setFileDataStr ] = useState('')
    const [ fabObj, setFabObj ] = useState<fabricOperate | null>(null)

    const loadFile = (file: Blob) => {
        if(!fabObj) {
            useToastStore().warn('Please wait for canvas to finish initializing')
        }
        else {
            fabObj.render(file)
                .then((dataUrl) => {
                    setFileDataStr(dataUrl)
                    useToastStore().success('Image loaded')
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
        if(!fabObj || !fileDataStr) {
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
                case 'gray':
                    fabObj.setGray()
                    break
                case 'download':
                    fabObj.download()
                    console.log('download')
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
                <input ref={ imgIptRef } type="file"
                       style={ { display: 'none' } }
                       onChange={ () => {
                           if(imgIptRef.current!.files!.length > 0) {
                               const file = imgIptRef.current!.files![0]
                               const [ suffix, ...nameReverse ] = file.name.split('.').reverse()

                               if(!BaseOperate.allowType.includes(suffix)) {
                                   useToastStore().error('Type not allowed: *.' + suffix)
                               }
                               else {
                                   loadFile(file)
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
                    Operate
                </div>
                {
                    (fileDataStr !== '')
                        ? <img style={ {
                            position: 'relative',
                            width: 'calc(100% - 40px)',
                            margin: '0 20px',
                        } } src={ fileDataStr } alt=""/>
                        : ''
                }
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
                                <i className="pi pi-upload"/>&nbsp;Select (*.jpg, *.png)
                            </span>
                    </div>

                    <div className="p-inputgroup"
                         style={ {
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         } }>
                        <span className="p-inputgroup-addon" style={ { width: '80px' } }>Width</span>
                        <InputNumber value={ width } step={ 10 } allowEmpty={ false } suffix=" px"
                                     onChange={ (e) => {
                                         setWidth(e.value!)
                                     } }/>
                        <span className="p-inputgroup-addon"
                              onClick={ () => {
                                  imageSolve('width')
                              } }>
                            <span><i className="pi pi-check"/></span>
                        </span>
                    </div>

                    <div className="p-inputgroup"
                         style={ {
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         } }>
                        <span className="p-inputgroup-addon" style={ { width: '80px' } }>Height</span>
                        <InputNumber value={ height } step={ 10 } allowEmpty={ false } suffix=" px"
                                     onChange={ (e) => {
                                         setHeight(e.value!)
                                     } }/>
                        <span className="p-inputgroup-addon"
                              onClick={ () => {
                                  imageSolve('height')
                              } }>
                            <span><i className="pi pi-check"/></span>
                        </span>
                    </div>

                    <div className="p-inputgroup"
                         style={ {
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         } }>
                        <span className="p-inputgroup-addon" style={ { width: '80px' } }>Opacity</span>
                        <InputNumber value={ opacity } min={ 0 } max={ 1 } step={ 0.05 }
                                     minFractionDigits={ 2 } maxFractionDigits={ 2 }
                                     allowEmpty={ false }
                                     onChange={ (e) => {
                                         setOpacity(e.value!)
                                     } }/>
                        <span className="p-inputgroup-addon"
                              onClick={ () => {
                                  imageSolve('opacity')
                              } }>
                            <span><i className="pi pi-check"/></span>
                        </span>
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
                <Workspace onInit={ (fabObj) => {
                    setFabObj(fabObj)
                } }/>
            </div>
        </div>
    )
}
