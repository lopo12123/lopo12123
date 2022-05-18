<script lang="ts" setup>
import { Two_zero_four_eight } from "@/scripts/two_zero_four_eight";
import { ref } from "vue";

const game = new Two_zero_four_eight()
const gridState = ref(game.have_a_look())
</script>

<template>
    <div class="two-zero-four-eight">
        <div class="banner-area">

        </div>
        <div class="game-area">
            <div class="grid-container">
                <div class="row" :key="'row-'+row_idx"
                     v-for="(row, row_idx) in gridState">
                    <div class="column" :key="'col-'+col_idx"
                         v-for="(col, col_idx) in row">
                        {{ col }}
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

    .banner-area {
        position: relative;
        width: 100%;
        height: 100px;
    }

    .game-area {
        position: relative;
        width: 100%;
        height: calc(100% - 100px);
        display: flex;
        align-items: center;
        justify-content: center;

        .grid-container {
            position: relative;
            width: fit-content;
            height: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>