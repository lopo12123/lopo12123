<script lang="ts" setup>
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";
import { debounce, randInRange, rangeMapping } from "lopo-lib";

// 单个星的属性
type SingleStar = {
    x: number
    y: number
    radius: number
    scale: number
    alpha: number
}

// region 配置
// 密集度 < 1
const DENSITY_RATIO = 0.5
// 原始半径范围
const SIZE_LIMIT = [ 1, 3 ]
// 原始亮度范围 [0, 1]
const ALPHA_LIMIT = [ 0.2, 0.5 ]
// 放缩最大比例 > 1
const MAX_SCALE = 1.5
// endregion

// 画布ref
const canvasRef: Ref<HTMLCanvasElement | null> = ref(null)
const starsRef: Ref<SingleStar[]> = ref([])

// region 绘制
/**
 * @description 在画布上渲染星并添加交互动画
 * @param reGenerate 是否重新创建星
 */
const renderStars = (reGenerate: boolean = true) => {
    const cvs = canvasRef.value

    if(!!cvs) {
        // region 获得/设置 画布大小
        const w = cvs.offsetWidth
        const h = cvs.offsetHeight

        cvs.width = w
        cvs.height = h
        // endregion

        // region 构建星并存储其属性
        if(reGenerate) {
            const star_count = Math.floor(DENSITY_RATIO * Math.floor(w, h))
            starsRef.value = new Array(star_count).fill(0).map(() => ({
                x: randInRange(0, w, 'right', 5),
                y: randInRange(0, h, 'right', 5),
                radius: randInRange(SIZE_LIMIT[0], SIZE_LIMIT[1]),
                scale: 1,
                alpha: randInRange(ALPHA_LIMIT[0], ALPHA_LIMIT[1])
            }))
        }
        // endregion

        // region 绘制星
        // 获取画布上下文
        const ctx = cvs.getContext('2d')!
        // 绘制前清空总没错
        ctx.clearRect(0, 0, w, h)
        // 遍历绘制所有星
        starsRef.value.forEach(star => {
            ctx.fillStyle = `hsla(0, 100%, 100%, ${ rangeMapping([ 1, MAX_SCALE ], [ star.alpha, 1 ], star.scale) })`
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.radius * star.scale, 0, Math.PI * 2)
            ctx.fill()
        })
        // endregion
    }
}
// endregion

/**
 * @description 窗口大小变化后重绘背景
 * @description 采用防抖避免窗口大小变更时无用的中间渲染
 */
const resizeCB = debounce(() => {
    renderStars()
}, 1_000)

onMounted(() => {
    renderStars()

    window.addEventListener('resize', resizeCB)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCB)
})
</script>

<template>
    <canvas class="starry-sky" ref="canvasRef"/>
</template>

<style lang="scss" scoped>
.starry-sky {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: transparent;
}
</style>
