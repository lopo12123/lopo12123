<script lang="ts" setup>
import { watch, onMounted, ref, shallowRef } from "vue";
import { FireworkController } from "@/scripts/firework";

const emits = defineEmits<{
    (ev: 'firework-ready', ctr: FireworkController): void
}>()

const container = ref<HTMLDivElement>()
const fireworkController = shallowRef<FireworkController>()

const createFirework = () => {
    const con = container.value
    if(!!con) {
        const ctr = new FireworkController(con)
        fireworkController.value = ctr
        emits('firework-ready', ctr)
    }
}

const isRunning = ref(false)
const toggleFirework = () => {
    const ctr = fireworkController.value
    if(!ctr) return;

    if(ctr.isRunning) {
        ctr.stop()
        isRunning.value = false
    }
    else {
        ctr.start()
        isRunning.value = true
    }
}

onMounted(() => {
    createFirework()
})
</script>

<template>
    <div class="firework-box-page">
        <div class="firework-ground" ref="container"></div>
        <img :class="['firework-base', isRunning ? 'water' : 'fire']"
             src="../assets/firework-base.png" alt="烟花底座"
             @click="toggleFirework">
    </div>
</template>

<style lang="scss" scoped>
.firework-box-page {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .firework-ground {
        position: relative;
        width: 100%;
        height: calc(100% - 30px);
        cursor: url("../assets/aim.png") 0 0, auto;
    }

    .firework-base {
        position: absolute;
        z-index: 10;
        bottom: 0;
    }

    .fire {
        cursor: url("../assets/fire.png") 0 0, auto;
    }

    .water {
        cursor: url("../assets/water.png") 0 0, auto;
    }
}
</style>
