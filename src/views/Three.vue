<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { commonSetup, setupAnimate } from "@/scripts/useThree";
import { BoxGeometry, Mesh, MeshNormalMaterial } from "three";

const canvasEl = ref<HTMLCanvasElement | null>(null)
const doRender = (el: HTMLCanvasElement) => {
    const { renderer, scene, camera } = commonSetup(el, { cameraPosition: [ 0, 0, 100 ] })

    for (let i = 0; i < 20; i++) {
        const _cube = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshNormalMaterial()
        )
        _cube.position.set(Math.random() * 70 - 35, Math.random() * 40 - 20, Math.random() * 40 - 20)
        scene.add(_cube)
    }

    renderer.render(scene, camera)

    // setupAnimate(() => {
    //     cube.rotation.x += 0.03
    //     cube.rotation.y += 0.04
    //     cube.rotation.z += 0.05
    //     renderer.render(scene, camera)
    // }, 1)
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
