<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { commonSetup, setupAnimate } from "@/scripts/useThree";
import { AmbientLight, BoxGeometry, Mesh, MeshNormalMaterial, PointLight } from "three";
import { createPlanet, createSun, createTrack } from "@/scripts/Solar";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvasEl = ref<HTMLCanvasElement | null>(null)
const doRender = (el: HTMLCanvasElement) => {
    const { renderer, scene, camera } = commonSetup(el, {
        cameraPosition: [ 0, 100, 200 ]
    })
    camera.lookAt(0, 0, 0)

    const sunLight = new PointLight(0xff0000)
    const envLight = new AmbientLight(0x777777)

    const sun = createSun()
    const planetGroups = createPlanet()
    scene.add(sunLight, envLight, sun, ...planetGroups)

    const control = new OrbitControls(camera, el)
    control.update()
    control.minDistance = 50
    control.maxDistance = 500

    setupAnimate(() => {
        planetGroups.forEach(group => {
            group.rotation.y += 0.005
            const planet = group.getObjectByName('planet')!
            planet.rotation.y += 0.01
        })
        renderer.render(scene, camera)
        control.update()
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
