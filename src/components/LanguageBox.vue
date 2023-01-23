<script lang="ts" setup>
import {onMounted, ref} from "vue";
import hljs from "highlight.js/lib/core";
import descInLangs from "../constants/DescInLangs";

const descIdx = ref(2)

onMounted(() => {
    console.log(123)
    hljs.highlightAll()
})
</script>

<template>
    <div class="language-box">
        <pre><code :class="['hljs',
        `language-${descInLangs[descIdx].lang}`]">{{ descInLangs[descIdx].code }}</code></pre>
        <div class="switcher">switcher</div>
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
}
</style>