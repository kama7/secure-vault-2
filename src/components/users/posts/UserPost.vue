<template>
<q-card bordered flat>
  <q-card-section>
    <div class="text-subtitle2">{{ post.title }}</div>
    <div class="text-grey-7">{{ post.body }}</div>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">
import {Post} from 'components/users/types/User';

type Props = {
  post: Post;
}

defineProps<Props>();
</script>

<style scoped>

</style>
