<script setup lang="ts">
import JsonValidator from '../components/JsonValidator.vue';
import BalatroCalculator from '../components/BalatroCalculator.vue';

</script>
<template>
    <div class="center">
        <p>This is a collection of programming projects that you can interact with on my website.</p>
        <!-- <p>(There's nothing here yet...)</p> -->
        <div id="demosdiv">
            <div class="demodiv">
                <JsonValidator />
            </div>
            <div class="demodiv">
                <BalatroCalculator />
            </div>
        </div>
    </div>
</template>

<style src="../styles/InteractiveDemos.sass" lang="sass" />