<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <NavBar />
    <div id="spacing"></div>
    <br><br>
    <router-view />
</template>

<style>
#spacing {
    padding-top: 80px;
}

#app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* color: #2c3e50; */
}
</style>
