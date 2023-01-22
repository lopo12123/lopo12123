<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter()
const backToHome = () => router.replace('/')
</script>

<template>
    <div class="not-found">
        <span class="context">
            Oops! You seem to have come to a page that does not exist, click the
            <span class="btn" @click="backToHome">button</span>
            to return to the home page.
        </span>
    </div>
</template>

<style lang="scss" scoped>
.not-found {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;

    .context {
        width: 832px;
        padding: 16px;
        margin: auto;
        font-size: 32px;
        user-select: none;

        .btn {
            font-style: italic;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>