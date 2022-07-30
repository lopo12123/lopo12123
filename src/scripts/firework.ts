import { Fireworks } from "fireworks-js";

class FireworkController {
    #firework: Fireworks

    get isRunning() {
        return this.#firework.isRunning
    }

    constructor(dom: HTMLElement) {
        this.#firework = new Fireworks(dom)
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
