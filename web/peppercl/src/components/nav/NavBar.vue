<template>
    <nav class="nav-container">
        <div class="nav__logo">
            ddddd
        </div> 
        <div @click="setIsOpen" class="nav-burger__icon">
            <div class="nav-burger__bar"></div>
            <div class="nav-burger__bar"></div>
            <div class="nav-burger__bar"></div>
        </div> 
    </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isOpen = ref<Boolean>(false)
const setIsOpen = () => {isOpen.value = !isOpen.value}

</script>

<style lang="scss" scoped>
    .nav-container {
        color: white;
        width: 100%;
        background: black;
        display: flex;
        justify-content: between;
        .nav-burger__icon {

            display: flex;
            flex-direction: column;
            gap: 10px;
        .nav-burger__bar {
            height: 5px;
            width: 40px;
            background-color: white;
        }
    }
    }
</style>
