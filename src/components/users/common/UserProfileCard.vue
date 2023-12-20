<template>
  <q-card class="user-profile-card">
    <q-item class="q-pa-md">
      <q-item-section avatar v-if="user.name.length">
        <q-avatar color="primary" text-color="white">
          {{user.name[0]}}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{user.name}}</q-item-label>

        <q-item-label caption>
          {{ user.username }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <slot name="posts"/>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { User } from 'components/users/types/User';

type Props = {
  user: User;
}

defineProps<Props>();
</script>
