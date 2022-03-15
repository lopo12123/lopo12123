import {Bodies, Body, Composites, Engine, Events, Mouse, MouseConstraint, Render, Runner, World} from "matter-js";

abstract class IAF_Base {
    private readonly element: HTMLCanvasElement
    public getElement() { return this.element }
    private readonly engine: Engine
    public getEngine() { return this.engine }
    private readonly render: Render
    public getRender() { return this.render }
    private readonly world: World
    public getWorld() { return this.world }
    private runner: (Runner | null) = null
    public getRunner() { return this.runner }

    constructor(canvas: HTMLCanvasElement) {
        this.element = canvas
        this.engine = Engine.create(canvas, {
            gravity: {},
            enableSleeping: true
        })  // 生成引擎
        this.render = Render.create({
            canvas: canvas,
            engine: this.engine,
            options: {
                width: 1000,  // 960 + 20 * 2
                height: 640,  // 600 + 20 * 2
                // wireframes: false,
                // background: '#efefef'
            }
        })
        this.world = this.engine.world
    }

    // region 通用方法
    /**
     * @description 世界添加边框
     * <br/>外尺寸 [1000, 640]
     * <br/>厚度20
     * <br/>内尺寸 [960, 600]
     */
    public addBoundary() {
        const wall_up = Bodies.rectangle(500, 10, 1000, 20)
        const wall_right = Bodies.rectangle(990, 320, 20, 640)
        const wall_bottom = Bodies.rectangle(500, 630, 1000, 20)
        const wall_left = Bodies.rectangle(10, 320, 20, 640)

        this.addToWorld(Body.create({
            parts: [wall_up, wall_right, wall_bottom, wall_left],
            isStatic: true
        }))
    }

    /**
     * @description 将任意事物添加到世界中
     */
    public addToWorld(...objects: any[]) {
        World.add(this.world, objects)
    }

    // endregion

    // region 生命周期事件
    /**
     * @description 开始
     */
    public start() {
        this.runner = Runner.run(this.engine)
        Render.run(this.render)
    }

    /**
     * @description 结束
     */
    public stop() {
        if (!!this.runner) {
            Runner.stop(this.runner)
            this.runner = null
        }
    }

    // endregion
}

/**
 * @description
 * [guide]{@link https://www.jianshu.com/p/00abe24db9bd}
 */
class IAF extends IAF_Base {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    runTest() {
        const ground = Bodies.rectangle(200, 300, 100, 20)
        const rect = Bodies.rectangle(200, 100, 20, 20)
        const circle = Bodies.circle(200, 100, 10, {restitution: 2})
        const stack = Composites.stack(200, 100, 1, 5, 0, 10, (x: number, y: number) => {
            return Bodies.circle(x, y, 10)
        })
        Composites.chain(stack, 0, 0, 0, 0, {})
        Composites.chain(stack, 0, 0.5, 0, 0.5, {})

        const car = Composites.car(200, 100, 100, 10, 10)

        let width = 960

        const mouseControl = MouseConstraint.create(this.getEngine(), { mouse: Mouse.create(this.getElement()) })

        Events.on(ground, 'mousedown', (e) => {
            console.log('clicked')
        })

        this.addToWorld(ground, mouseControl)
        this.addBoundary()
        this.start()
    }
}

export {
    IAF
}
