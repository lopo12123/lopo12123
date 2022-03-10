<template>
    <div class="root">
        <div class="root-nav-bar">
            <div class="root-logo-container">
                <img class="logo" src="@/assets/logo.png" alt="" @click="jumpTo('npm')">
                <span class="quote" title="梦游天姥吟留别" @click="jumpTo('quote')">海客谈瀛洲，烟涛微茫信难求。越人语天姥，云霞明灭或可睹！</span>
            </div>
            <div class="root-operate-container">
                <i class="iconfont icon-github" title="Go to GitHub" @click="jumpTo('github')" />
                <i class="iconfont icon-npm" title="Go to NPM" @click="jumpTo('npm')" />
            </div>
        </div>
        <div class="root-body">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted} from "vue";
import {useRouter} from "vue-router";

type JumpList = {
    npm: string
    github: string
    quote: string
}

export default defineComponent({
    name: "Root",
    setup() {
        // region 链接跳转
        const jumpList: JumpList = {
            npm: 'https://www.npmjs.com/package/lopo-lib',
            github: 'https://github.com/lopo12123/lopo-lib',
            quote: 'https://hanyu.baidu.com/shici/detail?pid=c9445bc0f57411e58459c8e0eb15ce01&from=kg0'
        }
        const jumpTo = (to: keyof JumpList) => {
            window.open(jumpList[to], '_blank')
        }
        // endregion

        // region 聚焦/失焦事件
        const focusEv = () => {
            document.title = '给你嗦嗨嗨 😋'
        }
        const blurEv = () => {
            document.title = '两眼一黑了 😅'
        }
        onMounted(() => {
            focusEv()
            window.addEventListener('focus', focusEv)
            window.addEventListener('blur', blurEv)
        })
        onBeforeUnmount(() => {
            window.removeEventListener('focus', focusEv)
            window.removeEventListener('blur', blurEv)
        })
        // endregion

        return {
            jumpTo
        }
    }
})
</script>

<style lang="scss" scoped>
.root {
    position: relative;
    width: 100%;
    height: 100%;

    .root-nav-bar {
        position: relative;
        z-index: 10;
        width: calc(100% - 60px);
        height: 59px;
        padding: 0 30px;
        border-bottom: solid 1px #dcdfe6;
        box-shadow: #dcdfe6 0 5px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .root-logo-container {
            position: relative;
            width: fit-content;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .logo {
                width: 40px;
                height: 40px;
                margin-right: 20px;
                cursor: pointer;
            }
            .quote {
                white-space: nowrap;
                font-size: 14px;
                font-family: cursive;
                user-select: none;
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                    text-decoration: underline;
                }
            }
        }
        .root-operate-container {
            position: relative;
            width: fit-content;  // calc(100% - 200px);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            > i {
                margin: 0 10px;
                font-size: 32px;
                cursor: pointer;
            }
        }
    }

    .root-body {
        position: relative;
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>
