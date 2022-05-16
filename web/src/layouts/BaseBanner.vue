<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";
import TieredMenu from "primevue/tieredmenu";
import { MenuItem } from "primevue/menuitem";

const route = useRoute()

// region bread
const bread_home = {
    icon: 'pi pi-home',
    to: { name: 'Home' }
}
const bread_other = computed(() => {
    return route.meta.bread ?? []
})
// endregion

// region tiered
const tiered_ref = ref<TieredMenu | null>(null)
const tiered_items: MenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home',
    },
    {
        separator: true
    },
    {
        label: 'Github',
        icon: 'pi pi-pencil'
    },
    {
        label: 'Npm',
        icon: 'pi pi-pencil'
    }
]
const tiered_toggle = (e: MouseEvent) => {
    tiered_ref.value?.toggle(e)
}
// endregion
</script>

<template>
    <div class="base-banner">
        <div class="tiered-container" @click="tiered_toggle">
            <img class="lopo-blink" src="../assets/icon.png" alt="">
            <TieredMenu ref="tiered_ref" :popup="true" :model="tiered_items"/>
        </div>

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
    display: flex;
    align-items: center;
    justify-content: center;

    .tiered-container {
        position: relative;
        width: 59px;
        height: 24px;
        border-right: solid 1px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            position: relative;
            width: 24px;
            height: 24px;
        }
    }

    .bread-container {
        position: relative;
        width: calc(100% - 60px);
    }
}
</style>