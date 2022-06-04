<script lang="ts" setup>
import { Two_zero_four_eight } from "@/scripts/two_zero_four_eight";
import { onBeforeUnmount, onMounted, ref } from "vue";

const game = new Two_zero_four_eight()
const grid = ref(game.have_a_look())

// region 自定义设置
const x_len = ref(4)
const y_len = ref(4)
const custom_set = () => {
    if(x_len.value > 10) x_len.value = 10
    else if(x_len.value < 4) x_len.value = 4
    else x_len.value = Math.floor(x_len.value)

    if(y_len.value > 10) y_len.value = 10
    else if(y_len.value < 4) y_len.value = 4
    else y_len.value = Math.floor(y_len.value)

    game.reset(x_len.value, y_len.value)
    grid.value = game.have_a_look()
}
// endregion

/**
 * @description 根据数字构建颜色
 * @param val [2, 2**17]
 */
const color_generator = (val: number) => {
    const color_map = [ '#f9ae61', '#a6d5fa', '#5e8f32' ]
    const alpha_map = [ '33', '66', '99', 'cc', 'ee' ]
    const times = Math.log2(val)
    if(times >= 15) return '#ffd700'
    else return color_map[times % 3] + alpha_map[Math.floor(times / 3)]
}

const keyboard_listener_cb = (e: KeyboardEvent) => {
    let ifEnd
    switch (e.key) {
        case 'ArrowUp':
            ifEnd = game.apply_force('up')
            grid.value = game.have_a_look()
            break
        case 'ArrowRight':
            ifEnd = game.apply_force('right')
            grid.value = game.have_a_look()
            break
        case 'ArrowDown':
            ifEnd = game.apply_force('down')
            grid.value = game.have_a_look()
            break
        case 'ArrowLeft':
            ifEnd = game.apply_force('left')
            grid.value = game.have_a_look()
            break
        default:
            break
    }
    if(ifEnd) alert('结束！')
}

onMounted(() => {
    document.addEventListener('keyup', keyboard_listener_cb)
})
onBeforeUnmount(() => {
    document.addEventListener('keyup', keyboard_listener_cb)
})
</script>

<template>
    <div class="two-zero-four-eight">
        <div class="banner-area">
            <div class="ipt">
                <span>长度</span>
                <input type="number" v-model="x_len" placeholder="范围: 4 - 10">
            </div>
            <div class="ipt">
                <span>高度</span>
                <input type="number" v-model="y_len" placeholder="范围: 4 - 10">
            </div>

            <div class="btn" title="重新开始" @click="custom_set">
                <i class="iconfont icon-start"/> 重新开始
            </div>
        </div>
        <div class="game-area">
            <div class="grid-container">
                <div class="row" :key="'row-'+row_idx"
                     v-for="(row, row_idx) in grid">
                    <div class="column" :style="`background-color: ${color_generator(col)}`" :key="'col-'+col_idx"
                         v-for="(col, col_idx) in row">
                        {{ col === 0 ? '&nbsp;' : col }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.two-zero-four-eight {
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

        .btn {
            position: relative;
            width: calc(50% - 20px);
            height: 40px;
            margin-top: 40px;
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

    .game-area {
        position: relative;
        width: calc(100% - 301px);
        height: 100%;
        border-left: solid 1px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;

        .grid-container {
            position: relative;
            width: fit-content;
            min-width: fit-content;
            height: fit-content;
            min-height: fit-content;
            border: solid 2px #2da0ff;
            background-color: #fff;
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
                display: block;

                .column {
                    position: relative;
                    width: 50px;
                    height: 50px;
                    border: solid 1px #aaa;
                    font-family: "Ink Free", cursive;
                    user-select: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    transition: all 1s;
                }
            }
        }
    }
}
</style>
