import { Toast } from "primereact/toast";

// region toast
class ToastStore {
    private ref: Toast | null = null

    bind(newRef: Toast | null) {
        this.ref = newRef
    }

    info(msg: string, title?: string, till: number = 3_000) {
        this.ref?.clear()
        this.ref?.show({
            severity: 'info',
            summary: title,
            detail: msg,
            life: till
        })
    }

    success(msg: string, title?: string, till: number = 3_000) {
        this.ref?.clear()
        this.ref?.show({
            severity: 'success',
            summary: title,
            detail: msg,
            life: till
        })
    }

    warn(msg: string, title?: string, till: number = 3_000) {
        this.ref?.clear()
        this.ref?.show({
            severity: 'warn',
            summary: title,
            detail: msg,
            life: till
        })
    }

    error(msg: string, title?: string, till: number = 3_000) {
        this.ref?.clear()
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
}

const _toastStore = new ToastStore()
const useToastStore = () => {
    return _toastStore
}

// endregion

// region animate
class Animate {
    public static fadeOut(el: HTMLElement, type: 'height' | 'width' = 'height', till: number = 3000) {
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
}

//endregion

export {
    useToastStore,

    Animate
}