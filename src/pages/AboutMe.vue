<script lang="ts" setup>
import SpinBanner from "../components/SpinBanner.vue"
import LanguageBox from "../components/LanguageBox.vue";
import LinkBox from "../components/LinkBox.vue";

const bannerCfg = {
    text: 'mail me',
    action: () => {
        window.open('mailto:lopo@zju.edu.cn?subject=Matters about {Write Your Purpose Here}, from viewers from your homepage.')
    }
}
</script>

<template>
    <div class="about-me">
        <SpinBanner :text="bannerCfg.text" :action="bannerCfg.action"/>

        <div class="padding">
            <div class="title">
                <div class="name">lopo12123</div>
                <div class="quote">123</div>
            </div>

            <div class="body">
                <LanguageBox/>

                <LinkBox/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about-me {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;

    .padding {
        width: 832px;
        margin: 0 auto;

        .title {
            margin: 80px 0;

            .name {
                font-size: 48px;
                font-weight: bold;
                font-family: "Curlz MT", sans-serif;
            }
        }

        .body {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>