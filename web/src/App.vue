<script lang="ts" setup>
import { onMounted } from "vue";
import BaseBanner from "@/layouts/BaseBanner.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useToastStore } from "@/stores/store_toast";

const toast = useToast()
onMounted(() => {
    useToastStore().bind(toast)
})
</script>

<template>
    <div class="app">
        <Toast/>

        <div class="banner-container">
            <BaseBanner/>
        </div>

        <div class="view-container">
            <router-view/>
        </div>
    </div>
</template>

<style lang="scss">
.app {
    position: relative;
    width: 100%;
    height: 100%;

    .banner-container {
        position: relative;
        width: 100%;
        height: 60px;
    }

    .view-container {
        position: relative;
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>
