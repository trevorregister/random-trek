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
import { 
    ref, 
    onBeforeMount, 
    defineEmits } from 'vue'

const props = defineProps({
  showTitle: String,
})

const emits = defineEmits(['updateFilter'])

const imgSrc = ref('')
const isFiltered = ref(false)

const getImage = (showTitle) => {
    switch(showTitle) {
        case 'The Next Generation':
            imgSrc.value = 'src/assets/tng.jpg'
            break
        case 'Deep Space Nine':
            imgSrc.value = 'src/assets/ds9.jpeg'
            break
        case 'Enterprise':
            imgSrc.value = 'src/assets/ent.jpg'
            break
        case 'The Original Series':
            imgSrc.value = 'src/assets/tos.jpg'
            break
        case 'Discovery':
            imgSrc.value = 'src/assets/disc.png'
            break
        case 'Voyager':
            imgSrc.value = 'src/assets/voy.jpg'
            break
        case 'Lower Decks':
            imgSrc.value = 'src/assets/ld.jpg'
            break
        case 'Strange New Worlds':
            imgSrc.value = 'src/assets/snw.jpg'
            break
        case 'Animated Series':
            imgSrc.value = 'src/assets/tas.jpg'
            break
        case 'Picard':
            imgSrc.value = 'src/assets/pic.jpg'
            break
        case 'Prodigy':
            imgSrc.value = 'src/assets/prod.png'
            break
    }
}

const toggleIsFiltered = (showTitle) => {
    isFiltered.value = !isFiltered.value
    emits('updateFilter', showTitle)
}

onBeforeMount(() => {
    getImage(props.showTitle)
})


</script>