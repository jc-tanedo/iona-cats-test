<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getImageById } from '@/services/cat-api-service';

import config from '../config';
import Toast from '../common/toast';
const { showError } = Toast();

const image = ref({} as Record<string, any>);

const fetchImage = async (id: string) => {
    try {
        image.value = await getImageById(id);
    } catch (e) {
        showError(config.MESSAGES.ERROR_FETCHING_CATS);
        console.error(e);
    }
};

const route = useRoute();
const router = useRouter();

const goBack = () => {
    router.push({
        name: 'cat-list',
        query: {
            breedId: image.value.breeds[0].id,
        },
    });
};

watch(
    () => route.params.catId as string,
    (catId: string) => catId && fetchImage(catId),
    { immediate: true },
);
</script>

<template>
  <main>
    <b-card no-body>
        <b-card-title class="ma-2">
          <b-button
            class="mx-3 mt-3 mb-2"
            variant="primary"
            @click="goBack"
            >
            Back
          </b-button>
        </b-card-title>
        <b-card-img :src="image.url" />

        <b-card-text
          v-if="image?.breeds?.length"
          class="px-4 pt-4 pb-2"
          >
          <h4>
            {{ image.breeds[0].name }}
          </h4>
          <h5>
            Origin: {{ image.breeds[0].origin }}
          </h5>
          <h6>
            {{ image.breeds[0].temperament }}
          </h6>
          <p>
            {{ image.breeds[0].description }}
          </p>
        </b-card-text>
    </b-card>
  </main>
</template>
