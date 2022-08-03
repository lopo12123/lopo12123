<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { commonSetup } from "@/scripts/useThree";
import { Mesh } from "three";

const canvasEl = ref<HTMLCanvasElement | null>(null)
const doRender = (el: HTMLCanvasElement) => {
    const { renderer, scene, camera } = commonSetup(el)

    const cube = new Mesh()
}

onMounted(() => {
    const cvs = canvasEl.value
    if(!!cvs) doRender(cvs)
    else alert('Error!')
})
</script>

<template>
    <div class="three-view">
        <canvas class="three-container" ref="canvasEl"></canvas>
    </div>
</template>

<style lang="scss" scoped>
.three-view {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .three-container {
        position: relative;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
    }
}
</style>
