<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue";
import { confetti } from "party-js";

const setupConfetti = (e: MouseEvent) => {
    confetti(e)
}

onMounted(() => {
    document.addEventListener('click', setupConfetti)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', setupConfetti)
})
</script>

<template>
    <div class="index-view"></div>
</template>

<style lang="scss" scoped>
.index-view {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #333;
}
</style>