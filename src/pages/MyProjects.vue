<script lang="ts" setup>
const nonsense = "Listen to me, take your time. I know you're in a hurry, but don't be in a hurry."
</script>

<template>
    <div class="my-projects">
        {{ nonsense }}
    </div>
</template>

<style lang="scss" scoped>
.my-projects {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 32px;
    font-family: cursive;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>