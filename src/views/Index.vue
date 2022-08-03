<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()
router.push({ name: 'Solar' })
</script>

<template>
    <div class="index-view">
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>
.index-view {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
