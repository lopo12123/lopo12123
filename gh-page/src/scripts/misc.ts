import { Toast } from "primereact/toast";
import { RefObject } from "react";

// region toast
class ToastStore {
    private ref: Toast | null = null

    bind(newRef: Toast | null) {
        this.ref = newRef
    }

    info(msg: string, title?: string, till: number = 3_000) {
        // this.ref?.clear()
        this.ref?.show({
            severity: 'info',
            summary: title,
            detail: msg,
            life: till
        })
    }

    success(msg: string, title?: string, till: number = 3_000) {
        // this.ref?.clear()
        this.ref?.show({
            severity: 'success',
            summary: title,
            detail: msg,
            life: till
        })
    }

    warn(msg: string, title?: string, till: number = 3_000) {
        // this.ref?.clear()
        this.ref?.show({
            severity: 'warn',
            summary: title,
            detail: msg,
            life: till
        })
    }

    error(msg: string, title?: string, till: number = 3_000) {
        // this.ref?.clear()
        this.ref?.show({
            severity: 'error',
            summary: title,
            detail: msg,
            life: till
        })
    }

    clear() {
        this.ref?.clear()
    }

    // region fast-use-words
    replyCancel() {
        this.info('Think twice before you press your mouse!')
    }
    // endregion
}

const _toastStore = new ToastStore()
const useToastStore = () => {
    return _toastStore
}

// endregion

// region animate
class Animate {
    /**
     * @description fade-out by fixed time
     * @param el element
     * @param type horizontal or vertical
     * @param till time to fade out
     */
    public static fadeOut_Percent(el: HTMLElement, type: 'height' | 'width' = 'height', till: number = 3000) {
        if(!el) return;

        const oriLength = type === 'height' ? el.offsetHeight : el.offsetWidth

        let percent = 1
        el.style.overflow = 'hidden'

        return new Promise<boolean>((resolve, reject) => {
            const timer = setInterval(() => {
                if(percent <= 0) {
                    clearInterval(timer)

                    el.style[type] = '0'
                    el.style.opacity = '0'
                    el.remove()

                    resolve(true)
                }
                el.style[type] = oriLength * percent + 'px'
                el.style.opacity = percent + ''
                percent -= 0.05
            }, till / 20)
        })
    }

    /**
     * @description fade-out by fixed step
     * @param el element
     * @param type horizontal or vertical
     * @param lps length per second
     */
    public static fadeOut_Fix(el: HTMLElement, type: 'height' | 'width' = 'height', lps: number = 10) {
        if(!el || lps < 10) return;

        const getLength = () => {
            return type === 'height' ? el.offsetHeight : el.offsetWidth
        }
        const oriLength = getLength()
        const step = Math.floor(lps / 5)

        el.style.overflow = 'hidden'

        return new Promise<boolean>((resolve, reject) => {
            const timer = setInterval(() => {
                if(getLength() <= step) {
                    clearInterval(timer)

                    el.style[type] = '0'
                    el.style.opacity = '0'
                    el.remove()

                    resolve(true)
                }
                el.style[type] = (getLength() - step) + 'px'
                el.style.opacity = (getLength() / oriLength).toFixed(2)
            }, 200)
        })
    }
}

//endregion

// region canvas operate
class CanvasOperate {
    public static allowType = ['jpg', 'png']

    public static drawBlobToCanvas (blob: File, canvasRef: RefObject<HTMLCanvasElement>) {
        if (!!canvasRef.current && !!blob) {
            const reader = new FileReader()
            const ctx = canvasRef.current.getContext('2d')!
            const [w, h] = [canvasRef.current.width, canvasRef.current.height]
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

    public static drawTextToCanvas(text: string, canvasRef: RefObject<HTMLCanvasElement>) {
        if(!!canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')!
            ctx.fillStyle = 'black'
            ctx.font = '12px cursive'
            ctx.textBaseline = 'bottom'
            ctx.fillText(text, 0, canvasRef.current.height / 2)
        }
    }
}

export {
    useToastStore,

    Animate,

    CanvasOperate
}
