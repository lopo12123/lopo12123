<script lang="ts" setup>
import FireworkBox from "@/views/FireworkBox.vue";
import { FireworkController } from "@/scripts/firework";
import StarrySky from "@/views/StarrySky.vue";

const bindFirework = (ctr: FireworkController) => {
    ctr.start()
}
</script>

<template>
    <div class="index-view">
        <div class="star-sky-container">
            <StarrySky/>
        </div>
        <div class="firework-container">
            <FireworkBox @firework-ready="bindFirework"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.index-view {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: center;

    .star-sky-container {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        inset: 0;
        pointer-events: none;
    }

    .firework-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
