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

    constructor(canvas: fabric.Canvas, blob: Blob) {
        this.canvas = canvas
        Misc.readBlobAsDataUrl(blob)
            .then((dataUrlStr) => {
                const rect = new fabric.Rect({
                    width: 50, height: 50, fill: '#333'
                })
                canvas.add(rect)
            })
            .catch((e) => {
                useToastStore().error(e.toString())
            })
    }
}

export {
    BaseOperate,
    fabricOperate
}