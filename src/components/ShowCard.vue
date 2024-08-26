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
            imgSrc.value = '/assets/tng.jpg'
            break
        case 'Deep Space Nine':
            imgSrc.value = '/assets/ds9.jpeg'
            break
        case 'Enterprise':
            imgSrc.value = '/assets/ent.jpg'
            break
        case 'The Original Series':
            imgSrc.value = '/assets/tos.jpg'
            break
        case 'Discovery':
            imgSrc.value = '/assets/disc.png'
            break
        case 'Voyager':
            imgSrc.value = '/assets/voy.jpg'
            break
        case 'Lower Decks':
            imgSrc.value = './assets/ld.jpg'
            break
        case 'Strange New Worlds':
            imgSrc.value = './assets/snw.jpg'
            break
        case 'Animated Series':
            imgSrc.value = './assets/tas.jpg'
            break
        case 'Picard':
            imgSrc.value = './assets/pic.jpg'
            break
        case 'Prodigy':
            imgSrc.value = './assets/prod.png'
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