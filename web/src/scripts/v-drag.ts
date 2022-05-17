import { ObjectDirective } from "vue";
import { v4 as UUID } from "uuid";

const drag_mousedown_cb = (mousedown_ev: MouseEvent) => {
    const source_el = mousedown_ev.currentTarget as HTMLDivElement
    const target_el_id = source_el.getAttribute('drag-target')!

    // @ts-ignore          chrome                  ff & safari
    const ev_path: HTMLElement[] = mousedown_ev.path || (mousedown_ev.composedPath && mousedown_ev.composedPath())
    const target_el = ev_path.find(el => {
        return el.getAttribute('drag-id') === target_el_id
    })

    if(!source_el || !target_el_id || !target_el) return

    const dis_x = mousedown_ev.clientX - target_el.offsetLeft
    const dis_y = mousedown_ev.clientY - target_el.offsetTop
    const drag_mousemove_cb = (mousemove_ev: MouseEvent) => {
        const new_x = mousemove_ev.clientX - dis_x
        const new_y = mousemove_ev.clientY - dis_y

        if(new_x > 0 && new_x < (window.innerWidth - source_el.offsetWidth - 10)) target_el.style.left = new_x + 'px'
        if(new_y > 0 && new_y < (window.innerHeight - source_el.offsetHeight - 10)) target_el.style.top = new_y + 'px'
    }
    const drag_mouseup_cb = (mouseup_ev: MouseEvent) => {
        document.removeEventListener('mousemove', drag_mousemove_cb)
        document.removeEventListener('mouseup', drag_mouseup_cb)
    }
    document.addEventListener('mousemove', drag_mousemove_cb)
    document.addEventListener('mouseup', drag_mouseup_cb)
}

export const drag: ObjectDirective<HTMLDivElement> = {
    mounted(el) {
        const drag_el = el.className.includes('draggable') ? el : el.getElementsByClassName('draggable')[0] as HTMLDivElement
        if(!!drag_el) {
            const drag_id = UUID()
            el.style.position = 'absolute'
            el.setAttribute('drag-id', drag_id)
            drag_el.setAttribute('drag-target', drag_id)
            drag_el.addEventListener('mousedown', drag_mousedown_cb)
        }
    },
    beforeUnmount(el) {
        const drag_el = el.className.includes('draggable') ? el : el.getElementsByClassName('draggable')[0] as HTMLDivElement
        if(!!drag_el) {
            drag_el.removeEventListener('mousedown', drag_mousedown_cb)
        }
    }
}