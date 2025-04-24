<script setup lang="ts">
function submitJson() {
    console.log("button pressed :)");
}
</script>

<template>
    <h2>JSON validator and formatter</h2><br>
    <input type="text" name="jsoninput" id="jsoninput"><br>
    <button @click="submitJson">Submit JSON</button>
</template>
