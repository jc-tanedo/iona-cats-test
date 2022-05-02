<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue';
import { getCatsByBreed } from '../services/cat-api-service';

import CatCard from '../components/CatCard.vue';

const props = defineProps({
    breedId: {
        type: String,
        required: true,
    },
});

const cats = reactive([] as Record<string, any>[]);
const isLoading = ref(true);
const isEmpty = computed((): boolean => !cats.length);

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
    <div class="d-grid gap-4" v-else>
        <b-row>
            <b-col
                v-for="cat in cats"
                :key="cat.id"
                lg="3"
                md="4"
                sm="6"
                cols="12"
                class="mb-4"
                >
                <CatCard :cat="cat" />
            </b-col>
        </b-row>
    </div>
</template>