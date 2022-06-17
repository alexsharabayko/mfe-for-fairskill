<template>
  <h1>Vue3 App 2</h1>

  <br>

  <div v-if="flag">Private Content</div>
  <div v-else>Public Content</div>

  <br>

  <button @click="toggle">Toggle Content</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const flag = ref<boolean>(false);

  const toggle = (): void => {
    flag.value = !flag.value;
  }
</script>

<style scoped>

</style>
