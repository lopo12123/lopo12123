<script lang="ts" setup>
defineProps<{
    text: string
    action: () => void
}>()
</script>

<template>
    <div class="affix-banner">
        <div class="affix-banner__bg" @click="action">
            <span class="affix-banner__text">{{ text }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.affix-banner {
    position: absolute;
    width: 256px;
    height: 160px;
    top: 0;
    right: 0;
    overflow: hidden;

    &__bg {
        width: 100%;
        padding: 3px;
        background: #444;
        cursor: pointer;
        transform: translate(50%, -50%) rotate(45deg) translate(0, 80px);
        -webkit-transform: translate(50%, -50%) rotate(45deg) translate(0, 80px);
    }

    &__text {
        border: dashed white 1px;
        text-align: center;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
    }
}
</style>