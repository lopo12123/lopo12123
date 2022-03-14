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

export {
    useToastStore
}