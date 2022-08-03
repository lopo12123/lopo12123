<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { commonSetup, setupAnimate } from "@/scripts/useThree";
import { AmbientLight, BoxGeometry, Mesh, MeshNormalMaterial, PointLight } from "three";
import { createPlanet, createSun } from "@/scripts/Solar";

const canvasEl = ref<HTMLCanvasElement | null>(null)
const doRender = (el: HTMLCanvasElement) => {
    const { renderer, scene, camera } = commonSetup(el, { cameraPosition: [ 0, 0, 200 ] })

    const _cube = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshNormalMaterial()
    )
    _cube.position.set(2, 0, 0)

    const sunLight = new PointLight(0xff0000)
    const envLight = new AmbientLight(0x777777)

    const sun = createSun()
    const planets = createPlanet()
    scene.add(sunLight, envLight, sun, ...planets)

    renderer.render(scene, camera)

    setupAnimate(() => {
        renderer.render(scene, camera)
    }, 1)
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
