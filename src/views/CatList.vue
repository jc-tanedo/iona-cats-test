<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { getBreeds } from '../services/cat-api-service';

import CatGrid from '../components/CatGrid.vue';

let breeds = reactive([] as Record<string, any>[]);

const selectedBreed = ref('');

const fetchBreeds = async () => {
    try {
        breeds.push(...await getBreeds());
        if (breeds.length) {
            selectedBreed.value = breeds[0].id;
        }
    } catch (e) {
        console.error(e);
    }
};

onMounted(() => {
    fetchBreeds();
});
</script>

<template>
  <main>
    <h2>Cat Browser</h2>

    <b-form-select
        v-model="selectedBreed"
        :options="breeds"
        text-field="name"
        value-field="id"
        />

    <CatGrid v-if="selectedBreed" :breed-id="selectedBreed" />

    <b-button variant="primary">Load More</b-button>
  </main>
</template>
