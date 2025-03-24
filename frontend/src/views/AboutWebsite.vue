<template>
    <div class="center">
        <p>This website hosted on a ThinkPad running Ubuntu sever 22.04</p>
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


// let fetchUrl: string = `${window.location.origin}/data`;
// let reqObj = {
//     method: "POST",
//     body: JSON.stringify({
//         target: "CPUtemp"
//     })
// };
// fetch(fetchUrl, reqObj).then(
//     (response) => response.json())
//     .then((data) => {
//         console.log(`fetched data: ${data}`)
//     }).catch((err) => {
//         console.error(`Couldn't fetch due to ${err}`)
//     })


</script>