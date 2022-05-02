<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <main class="main">
    <RouterView />
    <b-container
      :toast="{root: true}"
      fluid="sm"
      position="position-fixed"
      />
  </main>
</template>

<style>
.main {
  padding: 4rem;
}
</style>
