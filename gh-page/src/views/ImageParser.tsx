import { useLayoutEffect, useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { v4 as UUID } from "uuid";

interface ImageBlockProp {
    id: string
    file?: File
    name: string
    type: string
    size: string
}

const ImageBlock = (prop: ImageBlockProp) => {

    return (
        <div style={ {
            position: 'relative',
            width: '100%',
            height: '70px',
            border: 'solid 1px #cccccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        } }>
            <canvas style={ {
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
                justifyContent: 'space-evenly'
            } }>
                <span><b style={{ width: '40px', display: 'inline-block' }}>name</b> { prop.name }</span>
                <span><b style={{ width: '40px', display: 'inline-block' }}>type</b> { prop.type }</span>
                <span><b style={{ width: '40px', display: 'inline-block' }}>size</b> { prop.size }</span>
            </div>
        </div>
    )
}

export const ImageParser = () => {
    const [ fileList, setFileList ] = useState<ImageBlockProp[]>([
        {
            id: UUID(),
            name: 'img1',
            type: 'png',
            size: '11KB'
        },
        {
            id: UUID(),
            name: 'img2',
            type: 'jpg',
            size: '14B'
        }
    ])

    // useLayoutEffect(() => {
    //     setTimeout(() => {
    //         setFileList([ {
    //             id: UUID(),
    //             name: 'img2',
    //             suffix: '.jpg',
    //             size: '14B'
    //         } ])
    //     }, 3000)
    // })

    return (
        <Splitter gutterSize={ 5 } style={ {
            position: 'relative',
            width: '100%',
            height: '100%'
        } }>
            <SplitterPanel className="panel-container" size={ 20 } minSize={ 20 }>
                <Splitter layout="vertical" style={ {
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                } }>
                    <SplitterPanel size={ 50 } minSize={ 30 }>
                        <div style={ {
                            position: 'relative',
                            width: '100%',
                            height: '40px',
                            lineHeight: '40px',
                            textAlign: 'center'
                        } }>
                            File List
                        </div>
                        <div style={ {
                            position: 'relative',
                            width: 'calc(100% - 40px)',
                            height: 'calc(100% - 40px)',
                            margin: '0 20px'
                        } }>
                            {
                                fileList.map((item, index) => {
                                    return (
                                        <ImageBlock key={ index } { ...item } />
                                    )
                                })
                            }
                        </div>
                    </SplitterPanel>
                    <SplitterPanel size={ 50 } minSize={ 30 }>
                        operate
                    </SplitterPanel>
                </Splitter>
            </SplitterPanel>
            <SplitterPanel className="view-container" size={ 80 } minSize={ 50 }>
                222
            </SplitterPanel>
        </Splitter>
    )
}