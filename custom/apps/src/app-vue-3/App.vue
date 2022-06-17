<template>
  <h1>Vue3 App 3</h1>

  <br>

  <h2 @click="makeTomato" :style="{ color }">
    <template v-if="color === 'black'">Click me an make me tomato</template>
    <template v-else>Oh yessss. I am tomato now</template>
  </h2>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const color = ref<string>('black');

  const makeTomato = (): void => {
    color.value = 'tomato';
  }
</script>

<style scoped>

</style>
