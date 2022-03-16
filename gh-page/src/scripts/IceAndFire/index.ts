import { Bodies, Body, Composites, Engine, Events, Mouse, MouseConstraint, Render, Runner, World } from "matter-js";
import { GlobalConfig } from "@/scripts/IceAndFire/BasicConfig";
import { PlayerControl } from "@/scripts/IceAndFire/PlayerControl";
import { BasicComponents } from "@/scripts/IceAndFire/BasicComponents";

abstract class IAF_Base {

    // region 各属性及其get方法 (子类中用到)
    private readonly element: HTMLCanvasElement

    public getElement() {
        return this.element
    }

    private readonly engine: Engine

    public getEngine() {
        return this.engine
    }

    private readonly render: Render

    public getRender() {
        return this.render
    }

    private readonly world: World

    public getWorld() {
        return this.world
    }

    private runner: (Runner | null) = null

    public getRunner() {
        return this.runner
    }

    // endregion

    protected constructor(canvas: HTMLCanvasElement) {
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
                wireframes: false,
                background: '#efefef'
            }
        })
        this.world = this.engine.world
    }

    // region 通用方法 - 调用
    /**
     * @description 将任意事物添加到世界中
     */
    public addToWorld(...objects: any[]) {
        World.add(this.world, objects)
    }

    // endregion

    // region 通用方法 - 实体
    /**
     * @description 世界添加边框
     */
    public addBoundary(boundaryColor: string = '#777777') {
        const { outerSize, boundaryThickness } = GlobalConfig.world
        const wall_up = Bodies.rectangle(outerSize[0] / 2, boundaryThickness / 2, outerSize[0], boundaryThickness, { render: { fillStyle: boundaryColor } })
        const wall_right = Bodies.rectangle(outerSize[0] - boundaryThickness / 2, outerSize[1] / 2, boundaryThickness, outerSize[1], { render: { fillStyle: boundaryColor } })
        const wall_bottom = Bodies.rectangle(outerSize[0] / 2, outerSize[1] - boundaryThickness / 2, outerSize[0], boundaryThickness, { render: { fillStyle: boundaryColor }, frictionStatic: 0 })
        const wall_left = Bodies.rectangle(boundaryThickness / 2, outerSize[1] / 2, boundaryThickness, outerSize[1], { render: { fillStyle: boundaryColor } })

        this.addToWorld(Body.create({
            parts: [ wall_up, wall_right, wall_bottom, wall_left ],
            isStatic: true
        }))
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
        if(!!this.runner) {
            Render.stop(this.render)
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

        this.addBoundary()
    }

    runTest() {
        const ground = Bodies.rectangle(100, 500, 200, 5, { render: { fillStyle: '#cccccc' } })
        const rect = Bodies.rectangle(200, 100, 20, 20)
        const circle = Bodies.circle(400, 200, 15)
        const stack = Composites.stack(200, 100, 1, 5, 0, 10, (x: number, y: number) => {
            return Bodies.circle(x, y, 10)
        })
        Composites.chain(stack, 0, 0, 0, 0, {})
        Composites.chain(stack, 0, 0.5, 0, 0.5, {})
        const car = Composites.car(200, 100, 100, 10, 10)
        const rock = Bodies.polygon(400, 200, 8, 20)

        const mouseControl = MouseConstraint.create(this.getEngine(), { mouse: Mouse.create(this.getElement()) })

        const pl0 = PlayerControl.createPlayer('#777777', [ 400, 600 ])
        const pl1 = PlayerControl.createPlayer('#0000ff', [ 350, 600 ])
        const pl2 = PlayerControl.createPlayer('#00ff00', [ 100, 300 ])

        const bridge = BasicComponents.bridge(300, 530)
        const door = BasicComponents.door(550, 500, [50, 100], 5)


        this.addToWorld(ground, ...bridge, door[0], pl0, pl1, pl2)

        this.start()

        Body.rotate(ground, Math.PI / 10)
        ground.isStatic = true

        setTimeout(() => {
            door[1]()
        }, 2000)

        // const timer = setInterval(() => {
        //     // Body.setVelocity(pl2, { x: 5, y: 0 })
        //     PlayerControl.control(pl0, ['up'])
        //     PlayerControl.control(pl1, ['up'])
        // }, 1000)
        //
        // setTimeout(() => {
        //     clearInterval(timer)
        //     // Body.applyForce(pl1, {x: pl1.position.x, y: pl1.position.y - 30}, { x: 0.01, y: 0 })
        //     // Body.applyForce(pl2, {x: pl2.position.x, y: pl2.position.y - 30}, { x: 0.05, y: 0 })
        //
        // }, 8_000)
    }
}

export {
    IAF
}
