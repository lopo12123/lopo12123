import { Bodies, Composites, Engine, Render, Runner, World } from "matter-js";

/**
 * @description
 * [guide]{@link https://www.jianshu.com/p/00abe24db9bd}
 */
class Physical {
    private readonly engine: Engine
    private readonly render: Render
    private readonly world: World
    private runner: (Runner | null) = null

    constructor(canvas: HTMLCanvasElement, width: number = 800, height: number = 600) {
        this.engine = Engine.create(canvas, {
            gravity: {},
            enableSleeping: true
        })  // 生成引擎
        this.render = Render.create({
            canvas: canvas,
            engine: this.engine,
            options: {
                width, height,
                showAngleIndicator: true
            }
        })
        this.world = this.engine.world
    }

    // region inner
    public addToWorld(...objects: any[]) {
        World.add(this.world, objects)
    }

    // endregion

    // region life
    public start() {
        this.runner = Runner.run(this.engine)
        Render.run(this.render)
    }

    public stop() {
        if(!!this.runner) {
            Runner.stop(this.runner)
            this.runner = null
        }
    }

    // endregion

    runTest() {
        const ground = Bodies.rectangle(200, 300, 100, 20, { isStatic: true })
        const rect = Bodies.rectangle(200, 100, 20, 20)
        const circle = Bodies.circle(200, 100, 10, { restitution: 2 })
        const stack = Composites.stack(200, 100, 1, 5, 0, 10, (x: number, y: number) => {
            return Bodies.circle(x, y, 10)
        })
        Composites.chain(stack, 0, 0, 0, 0, {})
        Composites.chain(stack, 0, 0.5, 0, 0.5, {})

        const car = Composites.car(200, 100, 100, 10, 10)
        this.addToWorld(ground, circle)
        this.start()
    }
}

export {
    Physical
}