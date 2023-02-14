<script lang="ts" setup>
import {nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import hljs from "highlight.js/lib/core";
import {descInLangs, iconsOfDesc} from "../constants/DescInLangs";

const descIdx = ref(0)

const cancelWatch = watch(() => descIdx.value, () => {
    nextTick(() => hljs.highlightAll())
})

onMounted(() => {
    hljs.highlightAll()
})

onBeforeUnmount(() => {
    cancelWatch()
})
</script>

<template>
    <div class="language-box">
        <pre><code :class="['hljs',
        `language-${descInLangs[descIdx].lang}`]">{{ descInLangs[descIdx].code }}</code></pre>
        <div class="switcher">
            <i :class="`iconfont ${iconDetail.class} ${idx === descIdx ? 'active' : ''}`"
               v-for="(iconDetail, idx) in iconsOfDesc"
               :title="iconDetail.title"
               @click="() => descIdx = idx"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.language-box {
    position: relative;
    width: 480px;
    padding: 16px;
    border: solid 1px;
    border-color: #400 #700 #700 #400;
    background: #500;

    code {
        height: 304px;
        font-size: 14px;
        font-family: Consolas, monospace;
        display: block;
    }

    .switcher {
        height: 36px;
        background: rebeccapurple;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        i {
            padding: 2px;
            margin: 0 4px;
            border-radius: 4px;
            color: #400;
            font-size: 24px;
            cursor: pointer;
            display: inline-block;

            &.active {
                color: #f0f0f0;
            }
        }
    }
}
</style>