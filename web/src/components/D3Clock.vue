<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { select } from "d3";
import Timeout = NodeJS.Timeout;

const d3CanvasRef = ref<HTMLDivElement | null>(null)
const clock_timer = ref<Timeout | null>(null)

const draw_d3_clock = (w: number, h: number) => {
    const size = Math.min(w, h)
    const radius = size / 2

    // region 画布
    const svg = select('#d3-canvas')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
    // endregion

    // region 60等分数据
    const divide_to_60 = new Array(60).fill(0).map((_, idx) => idx)
    // endregion

    // region 边框刻度
    const labels = svg
        .append('g')
        .selectAll('g')
        .data(divide_to_60)
        .enter()
        .append('g')
        // 平移到画布中央
        .attr('transform', `translate(${ radius }, ${ radius })`)
        // 绘制刻度
        .append('line')
        .attr('x1', 1)
        .attr('y1', 0)
        .attr('x2', 6)
        .attr('y2', 0)
        // 边框颜色、角度
        .attr('transform', (d, i) => {
            return `rotate(${ 6 * i - 90 }) translate(${ radius - 10 })`
        })
        // 刻度颜色
        .style('stroke', (d, i) => {
            return i % 15 === 0 ? '#7fae02' : '#ffa500'
        })
        // 刻度宽度
        .style('stroke-width', (d, i) => {
            return i % 15 === 0 ? 3 : 2
        })
    // endregion

    // region 时分秒 pointer
    // region 图例
    const text = svg
        .append('g')
        .selectAll('.label-text')
        .data([ [ 'H', '#ec4117' ], [ 'M', '#2da0ff' ], [ 'S', '#001c33' ] ])
        .enter()
        .append('text')
        .attr('class', 'label-text')
        .attr('transform', (d, i) => {
            return `translate(${ radius - 20 + i * 20 }, ${ radius + 5 })`
        })
        .text((p) => p[0])
        .style('font-size', '12px')
        .style('fill', (p) => p[1])
        .style('text-anchor', "middle")
    // endregion
    // region 时针
    const hour = svg
        .append('g')
        // 平移到画布中央
        .attr('transform', `translate(${ radius }, ${ radius })`)
        // 绘制指针
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 3)
        .attr('y2', 0)
        .style('stroke', '#ec4117')
        .style('stroke-width', 3)
    // endregion
    // region 分针
    const min = svg
        .append('g')
        // 平移到画布中央
        .attr('transform', `translate(${ radius }, ${ radius })`)
        // 绘制指针
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 3)
        .attr('y2', 0)
        .style('stroke', '#2da0ff')
        .style('stroke-width', 3)
    // endregion
    // region 秒针
    const sec = svg
        .append('g')
        // 平移到画布中央
        .attr('transform', `translate(${ radius }, ${ radius })`)
        // 绘制指针
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 3)
        .attr('y2', 0)
        .style('stroke', '#001c33')
        .style('stroke-width', 3)
    // endregion

    const update_pointers = () => {
        const date = new Date()
        const val_sec = date.getSeconds()
        const val_min = date.getMinutes()
        const val_hour = date.getHours() % 12

        sec.attr('transform', () => {
            // 角度: 右侧为0, 顺时针
            return `rotate(${ val_sec * 6 - 90 }) translate(${ radius - 20 })`
        })
        min.attr('transform', () => {
            // 角度: 右侧为0, 顺时针
            return `rotate(${ val_min * 6 - 90 }) translate(${ radius - 25 })`
        })
        hour.attr('transform', () => {
            // 角度: 右侧为0, 顺时针
            return `rotate(${ val_hour * 30 - 90 }) translate(${ radius - 30 })`
        })
    }

    update_pointers()
    clock_timer.value = setInterval(update_pointers, 1_000)
    // endregion
}

onMounted(() => {
    const container = d3CanvasRef.value
    if(container !== null) {
        draw_d3_clock(container.clientWidth, container.clientHeight)
    }
})
onBeforeUnmount(() => {
    if(clock_timer.value !== null) clearInterval(clock_timer.value)
})
</script>

<template>
    <div class="d3-clock">
        <div id="d3-canvas" ref="d3CanvasRef"/>
    </div>
</template>

<style lang="scss" scoped>
.d3-clock {
    position: relative;
    width: 150px;
    height: 150px;

    &:hover {
        border-radius: 30px;
        outline: solid 1px #ccc;
        box-shadow: #ccc 3px 3px 5px;
    }

    #d3-canvas {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
}
</style>