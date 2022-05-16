import { ToastServiceMethods } from "primevue/toastservice";

class Store_toast {
    #ref: ToastServiceMethods | null = null

    bind(val: ToastServiceMethods | null) {
        this.#ref = val
    }

    info(msg: string, title?: string, till: number = 3_000) {
        this.#ref?.removeAllGroups()
        this.#ref?.add({
            severity: 'info',
            summary: title,
            detail: msg,
            life: till
        })
    }

    success(msg: string, title?: string, till: number = 3_000) {
        this.#ref?.removeAllGroups()
        this.#ref?.add({
            severity: 'success',
            summary: title,
            detail: msg,
            life: till
        })
    }

    warn(msg: string, title?: string, till: number = 3_000) {
        this.#ref?.removeAllGroups()
        this.#ref?.add({
            severity: 'warn',
            summary: title,
            detail: msg,
            life: till
        })
    }

    error(msg: string, title?: string, till: number = 3_000) {
        this.#ref?.removeAllGroups()
        this.#ref?.add({
            severity: 'error',
            summary: title,
            detail: msg,
            life: till
        })
    }

    clear() {
        this.#ref?.removeAllGroups()
    }
}

const _ = new Store_toast()

export const useToastStore = () => _