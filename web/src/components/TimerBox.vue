<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import TimerId = NodeJS.Timeout;

export type TimerHandle = {
    start: () => void,
    stop: () => void
}

const timerId = ref<TimerId | null>(null)
const min = ref(0)
const sec = ref(0)

const start = () => {
    if(timerId.value !== null) clearInterval(timerId.value)

    min.value = 0
    sec.value = 0

    timerId.value = setInterval(() => {
        if(sec.value === 59) {
            sec.value = 0
            min.value = (min.value + 1) % 60
        }
        else {
            sec.value += 1
        }
    }, 1000)
}
const stop = () => {
    if(timerId.value !== null) {
        clearInterval(timerId.value)
    }
    timerId.value = null
}

const emits = defineEmits<{
    (ev: 'ready', handle: TimerHandle): void
}>()

onMounted((() => {
    emits('ready', { start, stop })
}))

onBeforeUnmount(() => {
    stop()
})
</script>

<template>
    <div class="timer-box">
        <div class="min">
            {{ min < 10 ? '0' + min : '' + min }}
        </div>
        <div class="tick">
            :
        </div>
        <div class="sec">
            {{ sec < 10 ? '0' + sec : '' + sec }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.timer-box {
    position: relative;
    width: 160px;
    height: 60px;
    border-top: solid 10px #333;
    border-bottom: solid 10px #333;
    border-left: solid 10px #666;
    border-right: solid 10px #666;
    color: #ffa500;
    font-size: 40px;
    font-family: UniDream-LED, cursive;
    display: flex;
    align-items: center;
    justify-content: center;

    .min, .sec {
        width: 50px;
        letter-spacing: 5px;
        text-align: center;
    }

    .tick {
        width: 20px;
        text-align: center;
        animation: tick_tick infinite 1s linear;
        @keyframes tick_tick {
            0% {
                opacity: 1;
            }
            40% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            90% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }
}
</style>