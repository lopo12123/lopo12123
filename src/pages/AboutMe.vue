<script lang="ts" setup>
import SpinBanner from "../components/SpinBanner.vue"
import LanguageBox from "../components/LanguageBox.vue";

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
                title
            </div>

            <div class="body">
                <LanguageBox/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about-me {
    position: relative;
    width: 100%;
    height: 100%;

    .padding {
        width: 832px;
        margin: auto;
    }
}
</style>