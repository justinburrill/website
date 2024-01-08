<template>
    <Title text="hello my website" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from '@/components/Title.vue';

export default defineComponent({
    name: 'TestView',
    components: {
        Title,
    },
});
</script>



