<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";
import TieredMenu from "primevue/tieredmenu";
import type { MenuItem } from "primevue/menuitem";
import anime from "animejs";

const router = useRouter()
const route = useRoute()

// region logo animate
const logoAnime = () => {
    anime({
        targets: '.logo-container .chars path',
        // strokeDashoffset: [ anime.setDashoffset, 0 ],
        strokeDashoffset: (el: HTMLOrSVGElement) => {
            const svgLength = anime.setDashoffset(el);
            return [ svgLength * 2, 0 ];
        },
        easing: 'easeInOutSine',
        duration: 2000,
        delay: 500,
        direction: 'normal',
        loop: true
    })
}
// endregion

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
const tiered_items = ref<MenuItem[]>([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command() {
            router.push({ name: 'Home' })
        }
    },
    {
        separator: true,
    },
    {
        label: 'docs',
        icon: 'iconfont icon-record1',
        items: [
            {
                label: '- EMPTY -'
            }
        ]
    },
    {
        label: 'games',
        icon: 'iconfont icon-game',
        items: [
            {
                label: '2048',
                icon: 'iconfont icon-2048',
                to: {
                    name: 'TwoZeroFourEight'
                }
            },
            {
                label: 'mine-sweeper',
                icon: 'iconfont icon-mine',
                to: {
                    name: 'MineSweeper'
                }
            }
        ]
    },
    {
        label: 'projects',
        icon: 'pi pi-folder-open',
        items: [
            {
                label: 'flow chart',
                icon: 'iconfont icon-gongzuoliuchengtu',
                items: [
                    {
                        label: 'try it online',
                        icon: 'pi pi-bolt',
                        command() {
                            window.open('https://lopo12123.github.io/flow-chart')
                        }
                    },
                    {
                        label: 'download (*.exe)',
                        icon: 'pi pi-download',
                        command() {
                            window.open('https://github.com/lopo12123/flow-chart/releases/download/v0.0.1/flow-chart_setup_0.0.1.exe')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            window.open('https://github.com/lopo12123/flow-chart')
                        }
                    }
                ]
            },
            {
                label: 'loco (git app)',
                icon: 'iconfont icon-record',
                items: [
                    {
                        label: 'download (*.exe)',
                        icon: 'pi pi-download',
                        command() {
                            window.open('https://github.com/lopo12123/loco/releases/tag/v0.0.1/loco-0.0.1-setup.exe')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            window.open('https://github.com/lopo12123/loco')
                        }
                    }
                ]
            },
            {
                label: 'photo resize',
                icon: 'iconfont icon-resize',
                items: [
                    {
                        label: 'download (*.7z)',
                        icon: 'pi pi-download',
                        command() {
                            window.open('https://github.com/lopo12123/photo-resize/releases/download/v0.0.2/release-v0.0.2.7z')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            window.open('https://github.com/lopo12123/photo-resize')
                        }
                    }
                ]
            }
        ]
    },
    {
        label: 'packages',
        icon: 'pi pi-box',
        items: [
            {
                label: 'axios-canceller',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'npm',
                        icon: 'iconfont icon-npm1',
                        command() {
                            window.open('https://www.npmjs.com/package/axios-canceller')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            window.open('https://github.com/lopo12123/axios-canceller')
                        }
                    }
                ]
            },
            {
                label: 'lopo-lib',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'npm',
                        icon: 'iconfont icon-npm1',
                        command() {
                            window.open('https://www.npmjs.com/package/lopo-lib')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            window.open('https://github.com/lopo12123/lopo-lib')
                        }
                    }
                ]
            },
            {
                label: 'myers-diff',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'npm',
                        icon: 'iconfont icon-npm1',
                        command() {
                            window.open('https://www.npmjs.com/package/diff-myers')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            window.open('https://github.com/lopo12123/myers-diff')
                        }
                    }
                ]
            }
        ]
    },
    {
        separator: true
    },
    {
        label: 'links',
        icon: 'pi pi-link',
        items: [
            {
                label: 'npm',
                icon: 'iconfont icon-npm1',
                command() {
                    window.open('https://www.npmjs.com/~lopo12123')
                }
            },
            {
                label: 'github',
                icon: 'pi pi-github',
                command() {
                    window.open('https://github.com/lopo12123')
                }
            },
            {
                label: 'mail',
                icon: 'pi pi-envelope',
                command() {
                    window.open('mailto:lopo@zju.edu.cn')
                }
            }
        ]
    }
])
const tiered_toggle = (e: MouseEvent) => {
    tiered_ref.value?.toggle(e)
}
// endregion

onMounted(() => {
    logoAnime()
})
</script>

<template>
    <div class="base-banner">
        <div class="logo-container">
            <svg width="100%" height="100%" viewBox="0 0 64 24">
                <g class="chars" stroke-width="1" stroke="#8453e3" fill="transparent">
                    <!-- L -->
                    <path d="M0 0 L0 24 18 24 18 18 6 18 6 0 0 0"/>
                    <!-- O -->
                    <path d="M24 0 A8 12 0 1 0 24 24"/>
                    <path d="M24 24 A8 12 0 1 0 24 0"/>
                    <path d="M24 6 A4 6 0 0 0 24 18"/>
                    <path d="M24 18 A4 6 0 0 0 24 6"/>
                    <!-- P -->
                    <path d="M32 0 L32 24 38 24 38 16 A10 8 0 0 0 38 0 L32 0"/>
                    <path d="M38 4 L38 12 A6 4 0 0 0 38 4"/>
                    <!-- O -->
                    <path d="M56 0 A8 12 0 1 0 56 24"/>
                    <path d="M56 24 A8 12 0 1 0 56 0"/>
                    <path d="M56 6 A4 6 0 0 0 56 18"/>
                    <path d="M56 18 A4 6 0 0 0 56 6"/>
                </g>
            </svg>
        </div>

        <div class="tiered-container" @click="tiered_toggle">
            <i class="iconfont icon-record" title="menu"/>
            <TieredMenu ref="tiered_ref" :popup="true" :model="tiered_items"/>
        </div>

        <div class="bread-container">
            <Breadcrumb :model="bread_other"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.base-banner {
    position: relative;
    width: calc(100% - 40px);
    height: calc(100% - 1px);
    padding: 0 20px;
    border-bottom: solid 1px #ccc;
    background-color: #262626;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-container {
        position: relative;
        width: 64px;
        height: 24px;
        color: #8453e3;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tiered-container {
        position: relative;
        width: 38px;
        height: 24px;
        margin: 0 10px;
        border-left: solid 1px #cccccc80;
        border-right: solid 1px #cccccc80;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            position: relative;
            width: 24px;
            height: 24px;
            font-size: 24px;
            line-height: 24px;
            text-align: center;
            color: #ccc;
        }
    }

    .bread-container {
        position: relative;
        width: calc(100% - 124px);
    }
}
</style>
