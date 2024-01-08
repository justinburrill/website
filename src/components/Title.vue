<script setup lang="ts">
let titleColour = "#42b983";

function randomColour(): string {
    let colour: string = "#"
    for (let i = 0; i < 3; i++) {
        let num: number = Math.floor(Math.random() * 255);
        let numstr: string = num.toString(16);
        if (numstr.length < 2) {
            numstr = "0" + numstr;
        }
        colour += numstr;
    }
    // console.log(colour);
    return colour;
}

</script>

<template>
    <!-- @dblclick="randomColour()" :style="dynamicStyle" -->
    <div id="title" @click="titleColour = randomColour()">
        <h1>{{ text }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Title',
    props: {
        text: String,
    },
});
</script>

<style lang="scss">
#title {
    color: v-bind("titleColour");
    border-radius: 25px;
    border: v-bind("titleColour") solid 4px;
    padding: 4px 40px;
    display: inline-block;
}
</style>