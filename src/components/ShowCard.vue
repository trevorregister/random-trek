<template>
  <div
    @click="toggleIsFiltered(showTitle)"
    class="relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-amber-400/80"
    :class="isFiltered ? 'opacity-40 grayscale' : 'opacity-100'"
  >
    <img :src="imgSrc" :alt="showTitle" class="w-full h-32 object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <p class="absolute bottom-1.5 left-2 right-2 text-white text-xs font-medium truncate">
      {{ showTitle }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  showTitle: String,
  imgSrc: String,
  initialIsFiltered: { type: Boolean, default: false }
})

const emits = defineEmits(['updateFilter'])
const isFiltered = ref(props.initialIsFiltered)

const toggleIsFiltered = (showTitle) => {
  isFiltered.value = !isFiltered.value
  emits('updateFilter', showTitle)
}
</script>
