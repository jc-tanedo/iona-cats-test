<script setup lang="ts">
import { useRouter } from 'vue-router';
const props = defineProps({
    cat: {
        type: Object,
        required: true,
    },
});

const router = useRouter();

const openCatDetails = (cat: any) => {
    router.push({
        name: 'cat-details',
        params: {
            catId: cat.id,
        },
    });
};
</script>

<template>
    <b-card :img-src="props.cat.url">
        <div class="d-grid">
            <b-button
                block
                variant="primary"
                @click="openCatDetails(props.cat)"
                >
                View Details
            </b-button>
        </div>
    </b-card>
</template>