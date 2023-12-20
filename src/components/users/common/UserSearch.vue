<template>
  <q-input
    type="search"
    placeholder="Search user by names"
    outlined
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
type Props = {
  modelValue: string;
}

type Emits = {
  'update:modelValue': [value: string];
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
