<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";
import TieredMenu from "primevue/tieredmenu";
import { MenuItem } from "primevue/menuitem";

const router = useRouter()
const route = useRoute()

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
const open_in_new_tag = (url: string) => {
    window.open(url, '__blank')
}
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
                            open_in_new_tag('https://lopo12123.github.io/flow-chart')
                        }
                    },
                    {
                        label: 'download .exe',
                        icon: 'pi pi-download',
                        command() {

                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            open_in_new_tag('https://github.com/lopo12123/flow-chart')
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
                            open_in_new_tag('https://www.npmjs.com/package/axios-canceller')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            open_in_new_tag('https://github.com/lopo12123/axios-canceller')
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
                            open_in_new_tag('https://www.npmjs.com/package/lopo-lib')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            open_in_new_tag('https://github.com/lopo12123/lopo-lib')
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
                            open_in_new_tag('https://www.npmjs.com/package/diff-myers')
                        }
                    },
                    {
                        label: 'repository',
                        icon: 'pi pi-github',
                        command() {
                            open_in_new_tag('https://github.com/lopo12123/myers-diff')
                        }
                    }
                ]
            }
        ]
    },
    {
        label: 'links',
        icon: 'pi pi-link',
        items: [
            {
                label: 'npm',
                icon: 'iconfont icon-npm1',
                command() {
                    open_in_new_tag('https://www.npmjs.com/~lopo12123')
                }
            },
            {
                label: 'github',
                icon: 'pi pi-github',
                command() {
                    open_in_new_tag('https://github.com/lopo12123')
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
</script>

<template>
    <div class="base-banner">
        <div class="tiered-container" @click="tiered_toggle">
            <img class="lopo-blink" src="../assets/icon.png" alt="">
            <TieredMenu ref="tiered_ref" :popup="true" :model="tiered_items"/>
        </div>

        <div class="bread-container">
            <Breadcrumb :home="bread_home" :model="bread_other"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.base-banner {
    position: relative;
    width: 100%;
    height: calc(100% - 1px);
    border-bottom: solid 1px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;

    .tiered-container {
        position: relative;
        width: 59px;
        height: 24px;
        border-right: solid 1px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            position: relative;
            width: 24px;
            height: 24px;
        }
    }

    .bread-container {
        position: relative;
        width: calc(100% - 60px);
    }
}
</style>