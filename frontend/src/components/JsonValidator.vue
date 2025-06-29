<script setup lang="ts">
function submitJson() {

}
</script>

<template>
    <h2>JSON validator and formatter</h2><br>
    <!-- <input type="text" name="jsoninput" id="jsoninput">-->
    <textarea name="jsoninput" id="jsoninput" rows="30" cols="80"></textarea>
    <br>
    <button @click="submitJson">Submit JSON</button>
</template>
