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
const totalCats = ref(-Infinity);

const pagination = reactive({
    page: 0,
    limit: 10,
    order: 'asc',
});

const fetchCats = async (breedId: string, fresh = false) => {
    isLoading.value = true;
    if (fresh) {
        cats.splice(0, cats.length);
    }

    try {
        const response = await getCatsByBreed(breedId, pagination);
        cats.push(...response.data);
        totalCats.value = response.total;
    } catch (e) {
        console.error(e);
    }

    isLoading.value = false;
};

const fetchNextPage = () => {
    pagination.page++;
    fetchCats(props.breedId);
};

watch(
    () => props.breedId,
    (breedId: string) => fetchCats(breedId, true),
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

    <div class="d-grid gap-4">
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

    <div v-if="totalCats > cats.length">
        <b-button
            variant="success"
            @click="fetchNextPage"
            >
            {{ isLoading ? 'Loading cats...' : 'Show more' }}
        </b-button>
    </div>
</template>