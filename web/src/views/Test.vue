<script lang="ts" setup>
import D3Clock from "@/layouts/D3Clock.vue";
</script>

<template>
    <div class="test">
        test <br>
        <div style="width: 200px; height: 200px">
<!--        <div style="width: 600px; height: 400px">-->
            <D3Clock/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.test {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>