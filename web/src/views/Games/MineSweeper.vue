<script lang="ts" setup>
import { ref } from "vue";
import { Mine_sweeper } from "@/scripts/mine_sweeper";
import TimerBox from "@/components/TimerBox.vue";

// region 游戏相关
const ifEnd = ref(false)
const game = new Mine_sweeper()
const ground = ref(game.have_a_look())
// endregion

// region 侧面板数据绑定
const width = ref('')
const height = ref('')
const mine = ref('')
// endregion

const start = () => {
    game.init_game(parseInt(width.value) || 9, parseInt(height.value) || 9, parseInt(mine.value) || 0)
    ground.value = game.have_a_look()
}

const dig = (x: number, y: number) => {
    if(ifEnd.value) {
        alert('已结束')
        return
    }
    ifEnd.value = game.dig(x, y)[0]
    ground.value = game.have_a_look()
}
const mark = (x: number, y: number, e: MouseEvent) => {
    if(ifEnd.value) {
        alert('已结束')
        return
    }
    e.preventDefault()
    game.mark(x, y)
    ground.value = game.have_a_look()
}

const label_color = (num: number) => {
    switch(num) {
        case 1:
            return '#ff0000'
        case 2:
            return '#ffa500'
        case 3:
            return '#ffff00'
        case 4:
            return '#008000'
        case 5:
            return '#2da0ff'
        case 6:
            return '#0000ff'
        case 7:
            return '#800080'
        case 8:
            return '#000000'
    }
}
</script>

<template>
    <div class="mine-sweeper">
        <div class="banner-area">
            <!--            <TimerBox/>-->

            <div class="ipt">
                <span>宽度: </span>
                <input type="number" v-model="width" placeholder="范围: 9 - 30">
            </div>
            <div class="ipt">
                <span>高度: </span>
                <input type="number" v-model="height" placeholder="范围: 9 - 30">
            </div>
            <div class="ipt">
                <span>雷数: </span>
                <input type="number" v-model="mine" placeholder="最小为10个">
            </div>
            <div class="group">
                <div class="btn" title="提示一个安全位置">
                    <i class="iconfont icon-note"/>
                    提示
                </div>
                <div class="btn" title="开始" @click="start">
                    <i class="iconfont icon-start"/>
                    开始
                </div>
            </div>
        </div>

        <div class="ground-area">
            <div class="ground-container">
                <div class="row" :key="'row-'+row_idx"
                     v-for="(row, row_idx) in ground">
                    <div :class="['column', col < 0 ? 'uncheck' : 'checked']" :key="'col-'+col_idx"
                         v-for="(col, col_idx) in row"
                         @click.left="dig(col_idx, row_idx)"
                         @click.right="mark(col_idx, row_idx, $event)">
                        <span v-if="col === -1 || col === -2" class="mark">{{ '❓' }}</span>
                        <span v-if="col === -3 || col === -4" class="mark">{{ '🚩' }}</span>

                        <span v-if="col >= 0" class="label" :style="`color: ${label_color(col)}`">
                            {{ col > 0 ? col : '&nbsp;' }}
                        </span>
                        <span v-if="ifEnd && (col === -6 || col === -4 || col === -2)" class="label">
                            {{ '💣' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mine-sweeper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .banner-area {
        position: relative;
        width: 300px;
        height: calc(100% - 40px);
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .ipt {
            position: relative;
            width: calc(100% - 40px);
            height: 40px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            span {
                position: relative;
                width: 60px;
                color: #ccc;
                font-family: cursive;
                font-size: 18px;
                display: inline-block;
            }

            input {
                position: relative;
                width: calc(100% - 60px);
                height: 30px;
                border: none;
                border-bottom: solid 1px #ccc;
                outline: none;
                background-color: transparent;
                color: #777;
                font-family: cursive;
                font-size: 18px;
                display: inline-block;
            }
        }

        .group {
            position: relative;
            width: calc(100% - 40px);
            height: 40px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .btn {
                position: relative;
                width: calc(50% - 20px);
                height: 40px;
                border: solid 1px #ccc;
                color: #ccc;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                user-select: none;
                transition: font-size, color 0.5s;

                &:hover {
                    font-size: 18px;
                    color: #2da0ff;
                }
            }
        }
    }

    .ground-area {
        position: relative;
        width: calc(100% - 301px);
        height: 100%;
        border-left: solid 1px #ccc;
        //color: ;
        display: flex;
        align-items: center;
        justify-content: center;

        .ground-container {
            position: relative;
            width: fit-content;
            min-width: fit-content;
            height: fit-content;
            min-height: fit-content;
            border: solid 2px #2da0ff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .row {
                position: relative;
                width: fit-content;
                min-width: fit-content;
                height: fit-content;
                min-height: fit-content;
                display: flex;
                align-items: center;
                justify-content: center;

                .column {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    border: solid 3px #aaa;
                    font-family: "Ink Free", cursive;
                    user-select: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    .label {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .mark {
                        position: absolute;
                        z-index: 100;
                        width: 100%;
                        height: 100%;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }

                .uncheck {
                    background-color: #ccc;
                    cursor: pointer;

                    &:hover {
                        border: solid 3px #f9ae61;
                    }

                    &:active {
                        border: solid 3px #2da0ff;
                    }
                }

                .checked {
                    background-color: #eee;
                }
            }
        }
    }
}
</style>