<template>
    <div class="center">
        <p>This website hosted on a ThinkPad running Ubuntu server {{ OSversion }}</p>
        <p>Current CPU temp: {{ CPUtemp }}</p>
        <p>Server uptime: {{ serverUptime }}</p>
        <p>I used these technologies:</p>
        <div id="logo-div" class="flex-container">
            <div class="logo-box" id="vue-box">
                <img class="logo" src="../assets/vue-logo.png">
                <p class="logo-label">Vue.js</p>
            </div>
            <div class="logo-box" id="deno-box">
                <img class="logo" src="../assets/deno-logo.png">
                <!-- <p class="logo-label">Apache2</p> -->
            </div>
            <div class="logo-box" id="sass-box">
                <img class="logo" src="../assets/sass-logo.png">
                <!-- <p class="logo-label">Sass</p> -->
            </div>
            <div class="logo-box" id="pnpm-box">
                <img class="logo" src="../assets/pnpm-logo.png">

            </div>
        </div>

    </div>
</template>

<style src="../styles/AboutWebsite.sass" lang="sass" />
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchData } from '../utils.ts';

const temp = "loading..."
let OSversion = ref(temp);
let CPUtemp = ref(temp);
let websiteUptime = ref(temp);
let serverUptime = ref(temp);

async function setup() {
    OSversion.value = await fetchData("OSversion");
    CPUtemp.value = await fetchData("CPUtemp");
    websiteUptime.value = await fetchData("websiteUptime");
    serverUptime.value = await fetchData("serverUptime");
}


onMounted(setup);
</script>