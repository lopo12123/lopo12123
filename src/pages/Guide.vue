<script lang="ts" setup>
import SpinBanner from "../layouts/AffixBanner.vue"
import LanguageBox from "../layouts/LanguageBox.vue";
import LinkBox from "../layouts/LinkBox.vue";

const bannerCfg = {
    text: 'mail me',
    action: () => {
        window.open('mailto:lopo@zju.edu.cn?subject=Matters about {Write Your Purpose Here}, from viewers from your homepage.')
    }
}

const quoteText = "If you're a plumber, you're better off learning how to use an ax by chopping down trees with it than unclogging gutters."
</script>

<template>
    <div class="guide">
        <SpinBanner :text="bannerCfg.text" :action="bannerCfg.action"/>

        <div class="padding">
            <div class="title">
                <div class="name">lopo12123</div>
                <div class="quote">"{{ quoteText }}"</div>
            </div>

            <div class="body">
                <LanguageBox/>

                <LinkBox/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.guide {
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

            .quote {
                margin-top: 16px;
                font-style: italic;
                font-family: cursive;
                text-indent: 2em;
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