<template>
  <h1>Vue3 App 1</h1>

  <br>

  <div>{{ counter * 2 }}</div>

  <br>

  <button @click="inc">Increase Me</button>
</template>

<script setup lang="ts">
  import {ref} from 'vue';

  const counter = ref<number>(0);

  const inc = (): void => {
    counter.value += 2;
  }
</script>

<style scoped>

</style>
