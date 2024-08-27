<template>
    <v-card
    @click="toggleIsFiltered(showTitle)"
    :image="imgSrc"
    height="200px"
    width="200px"
    :class="isFiltered ? 'opacity-50' : 'opacity-100'"
    />
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
  showTitle: String,
  imgSrc: String
})

const emits = defineEmits(['updateFilter'])
const isFiltered = ref(false)

const toggleIsFiltered = (showTitle) => {
    isFiltered.value = !isFiltered.value
    emits('updateFilter', showTitle)
}


</script>