<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue';
import { getCatsByBreed } from '../services/cat-api-service';

const props = defineProps({
    breedId: {
        type: String,
        required: true,
    },
});

const cats = reactive([] as Record<string, any>[]);
const isLoading = ref(true);
const isEmpty = computed((cats: Record<string, any>[]): boolean => !cats.length);

const fetchCats = async (breedId: string) => {
    isLoading.value = true;
    cats.splice(0, cats.length);
    try {
        cats.push(...await getCatsByBreed(breedId));
    } catch (e) {
        console.error(e);
    }

    isLoading.value = false;
};

watch(
    () => props.breedId,
    (breedId: string) => fetchCats(breedId),
    { immediate: true },
);
</script>

<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else-if="isEmpty">
        No results
    </div>
    <div v-else>
        {{ props.breedId }}
        <pre>{{ cats }}</pre>
    </div>
</template>