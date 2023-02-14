<script lang="ts" setup>

</script>

<template>
    <div class="ProjectCard">
        temp
    </div>
</template>

<style lang="scss" scoped>
.ProjectCard {
    position: relative;
    width: 320px;
    height: 240px;
    border: solid 1px #c8c8c8;
    border-radius: 4px;
    cursor: pointer;
    transition: box-shadow .3s;
    display: inline-block;

    &:hover {
        box-shadow: 0 10px 15px 5px rgba(255, 255, 255, .2),
        0 4px 6px -5px rgba(255, 255, 255, .2);
    }
}
</style>