<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { getBreeds } from '../services/cat-api-service';
import CatGrid from '../components/CatGrid.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

let breeds = reactive([] as Record<string, any>[]);

const selectedBreed = ref('');

const fetchBreeds = async () => {
    try {
        breeds.push(...await getBreeds());
        if (breeds.length) {
            selectedBreed.value = route.query.breedId
                || breeds[0].id;
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
  <main class="gap-4 d-grid">
    <h2>Cat Browser</h2>

    <b-col cols="3">
        <b-form-select
            v-model="selectedBreed"
            :options="breeds"
            text-field="name"
            value-field="id"
            />
    </b-col>

    <CatGrid v-if="selectedBreed" :breed-id="selectedBreed" />
  </main>
</template>
