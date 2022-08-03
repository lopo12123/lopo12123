import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

/**
 * @description 通用初始化参数
 */
export type CommonSetupOptions = {
    /**
     * @description 相机初始位置
     * @default [0, 0, 20]
     */
    cameraPosition: [ x: number, y: number, z: number ]
}

/**
 * @description 通用的初始化部分, 抽取公共部分
 * @param canvas 画布容器
 * @param setupOptions 初始化参数
 */
const commonSetup = (
    canvas: HTMLCanvasElement,
    setupOptions: CommonSetupOptions = {
        cameraPosition: [ 0, 0, 20 ]
    }) => {
    // 渲染器
    const renderer = new WebGLRenderer({ canvas })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    // 场景
    const scene = new Scene()
    // 相机
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 2000)
    camera.position.set(...setupOptions.cameraPosition)

    return {
        renderer,
        scene,
        camera
    }
}

/**
 * @description 循环
 * @param job 循环任务
 * @param ms 执行间隔
 */
const setupAnimate = (job: (t: number) => void, ms: number = 1_000) => {
    let _cancelId: number = -1

    let t0 = performance.now()
    ;(function rerenderJob(_t: number) {
        if(_t - t0 >= ms) {
            job(_t)
            t0 = _t
        }
        _cancelId = requestAnimationFrame(rerenderJob)
    })(performance.now())

    return (function stopAnimate() {
        cancelAnimationFrame(_cancelId)
    })
}

export {
    commonSetup,
    setupAnimate,
}
