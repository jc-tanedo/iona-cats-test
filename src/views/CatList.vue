<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { getBreeds } from '../services/cat-api-service';

let breeds = reactive([] as Record<string, any>[]);

const selectedBreed = ref('walao');

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

    <b-button variant="primary">Load More</b-button>
  </main>
</template>
