import { RefObject } from "react";
import { fabric } from "fabric";
import { Misc } from "@/scripts/misc";
import { useToastStore } from "@/scripts/ToastStore";

class BaseOperate {
    public static allowType = [ 'jpg', 'png' ]

    public static drawBlobToCanvas(blob: File, canvasRef: RefObject<HTMLCanvasElement>) {
        if(!!canvasRef.current && !!blob) {
            const reader = new FileReader()
            const ctx = canvasRef.current.getContext('2d')!
            const [ w, h ] = [ canvasRef.current.width, canvasRef.current.height ]
            reader.readAsDataURL(blob)
            reader.onload = (e) => {
                const img = document.createElement('img')
                img.style.width = '50px'
                img.style.height = '50px'
                img.src = e.target!.result as string

                img.onload = () => {
                    ctx.drawImage(img, 0, 0, w, h)
                }
            }
        }
    }
}

class fabricOperate {
    private canvas: fabric.Canvas
    private grayFilter = new fabric.Image.filters.Grayscale()
    private originWidth: number | undefined
    private originHeight: number | undefined

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas
    }

    public getSize() {
        return [this.originWidth ?? 0, this.originHeight ?? 0]
    }

    public render(blob: Blob) {
        return new Promise<[string, number, number]>((resolve, reject) => {
            Misc.readBlobAsDataUrl(blob)
                .then((dataUrlStr) => {
                    const imgEl = document.createElement('img')
                    imgEl.src = dataUrlStr

                    fabric.Image.fromURL(dataUrlStr, (imgObj) => {
                        this.canvas.clear().add(imgObj)
                        this.originWidth = this.canvas._objects[0].width
                        this.originHeight = this.canvas._objects[0].height
                        resolve([dataUrlStr, this.originWidth ?? 0, this.originHeight ?? 0])
                    })
                })
                .catch(reject)
        })
    }

    public reset() {
        const obj = this.canvas._objects[0]
        obj.scaleX = 1
        obj.scaleY = 1
        obj.opacity = 1
        // @ts-ignore
        obj.filters = []
        // @ts-ignore
        this.canvas._objects[0].applyFilters()
        this.canvas.renderAll()
    }

    public setOpacity(opacity: number) {
        if(opacity < 0 || opacity > 1) return false
        else {
            this.canvas._objects[0].opacity = opacity
            this.canvas.renderAll()
            return true
        }
    }

    public setWidth(width: number) {
        if(!this.originWidth) return false
        else {
            this.canvas._objects[0].scaleX = width / this.originWidth
            this.canvas.renderAll()
            return true
        }
    }

    public setHeight(height: number) {
        if(!this.originHeight) return false
        else {
            this.canvas._objects[0].scaleY = height / this.originHeight
            this.canvas.renderAll()
            return true
        }
    }

    public setGray(yes: boolean) {
        // @ts-ignore
        this.canvas._objects[0].filters = yes ? [this.grayFilter] : []
        // @ts-ignore
        this.canvas._objects[0].applyFilters()
        this.canvas.renderAll()
    }

    public download() {
        if(!this.originWidth || !this.originHeight) return

        const canvasSize = [this.canvas.getWidth(), this.canvas.getHeight()]
        const objSize = [this.canvas._objects[0].getScaledWidth(), this.canvas._objects[0].getScaledHeight()]

        this.canvas._objects[0].left = 0
        this.canvas._objects[0].top = 0
        this.canvas.width = objSize[0]
        this.canvas.height = objSize[1]

        const aTag = document.createElement('a')
        aTag.download = 'file'+Date.now()+'.png'
        aTag.href = this.canvas.toDataURL()
        aTag.click()

        this.canvas.width = canvasSize[0]
        this.canvas.height = canvasSize[1]

        this.canvas.renderAll()
    }
}

export {
    BaseOperate,
    fabricOperate
}
