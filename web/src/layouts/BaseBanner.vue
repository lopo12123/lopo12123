<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const route = useRoute()
const bread_home = {
    icon: 'pi pi-home',
    to: { name: 'Home' }
}
const bread_other = computed(() => {
    return route.meta.bread ?? []
})
</script>

<template>
    <div class="base-banner">

        <div class="bread-container">
            <Breadcrumb :home="bread_home" :model="bread_other"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.base-banner {
    position: relative;
    width: 100%;
    height: calc(100% - 1px);
    border-bottom: solid 1px #ccc;
}
</style>