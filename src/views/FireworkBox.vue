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

onMounted(() => {
    createFirework()
})
</script>

<template>
    <div class="firework-ground" ref="container"></div>
</template>

<style lang="scss" scoped>
.firework-ground {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
}
</style>
