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
    private originWidth: number | undefined
    private originHeight: number | undefined

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas
    }

    public render(blob: Blob) {
        return new Promise<boolean>((resolve, reject) => {
            Misc.readBlobAsDataUrl(blob)
                .then((dataUrlStr) => {
                    const imgEl = document.createElement('img')
                    imgEl.src = dataUrlStr
                    this.canvas.add(new fabric.Image(imgEl, { cacheKey: 'origin-image' }))
                    this.originWidth = this.canvas._objects[0].width
                    this.originHeight = this.canvas._objects[0].height
                    setTimeout(() => {
                        resolve(true)
                    }, 200)
                })
                .catch(reject)
        })
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
            this.canvas._objects[0].scaleX = height / this.originHeight
            this.canvas.renderAll()
            return true
        }
    }
}

export {
    BaseOperate,
    fabricOperate
}