<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue";
import { confetti } from "party-js";
import FireworkBox from "@/views/FireworkBox.vue";
import { FireworkController } from "@/scripts/firework";

const setupConfetti = (e: MouseEvent) => {
    confetti(e)
}

const bindFirework = (ctr: FireworkController) => {
    // ctr.start()
}
</script>

<template>
    <div class="index-view">
        <div class="fireworks">
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

    .fireworks {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
</style>
