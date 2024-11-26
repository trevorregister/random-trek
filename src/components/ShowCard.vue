<template>
    <v-card
    @click="toggleIsFiltered(showTitle)"
    :image="imgSrc"
    height="200px"
    width="200px"
    :class="isFiltered ? 'opacity-50' : 'opacity-100'"
    rounded="lg"
    />
</template>

<script setup>
<<<<<<< HEAD
import { 
    ref, 
    defineEmits } from 'vue'
=======
import { ref, defineEmits } from 'vue'
>>>>>>> 981b0821fb6e4f9f458ef8a0e4a1c5cf556dea47

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