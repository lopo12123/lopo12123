import { Fireworks } from "fireworks-js";

class FireworkController {
    #firework: Fireworks

    get isRunning() {
        return this.#firework.isRunning
    }

    constructor(dom: HTMLElement) {
        this.#firework = new Fireworks(dom, {
            rocketsPoint: {
                min: 10,
                max: 90
            },
            gravity: 1,
            opacity: 0.3,
            mouse: {
                click: true,
                max: 3
            }
        })
    }

    start() {
        this.#firework.start()
    }

    stop() {
        this.#firework.stop()
    }
}

export {
    FireworkController
}
