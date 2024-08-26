<template>
    <v-card
    @click="toggleIsFiltered(showTitle)"
    :image="`./assets/${imgSrc}`"
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

//Forces Vite to recognize the images as assets and bundle them in the build
import disc from '../assets/disc.png'
import ds9 from '../assets/ds9.jpeg'
import ent from '../assets/ent.jpg'
import ld from '../assets/ld.jpg'
import pic from '../assets/pic.jpg'
import prod from '../assets/prod.png'
import snw from '../assets/snw.jpg'
import tas from '../assets/tas.jpg'
import tng from '../assets/tng.jpg'
import tos from '../assets/tos.jpg'
import voy from '../assets/voy.jpg'

const props = defineProps({
  showTitle: String,
})

const emits = defineEmits(['updateFilter'])

const imgSrc = ref('')
const isFiltered = ref(false)

const getImage = (showTitle) => {
    switch(showTitle) {
        case 'The Next Generation':
            imgSrc.value = 'tng.jpg'
            break
        case 'Deep Space Nine':
            imgSrc.value = 'ds9.jpeg'
            break
        case 'Enterprise':
            imgSrc.value = 'ent.jpg'
            break
        case 'The Original Series':
            imgSrc.value = 'tos.jpg'
            break
        case 'Discovery':
            imgSrc.value = 'disc.png'
            break
        case 'Voyager':
            imgSrc.value = 'voy.jpg'
            break
        case 'Lower Decks':
            imgSrc.value = 'ld.jpg'
            break
        case 'Strange New Worlds':
            imgSrc.value = 'snw.jpg'
            break
        case 'Animated Series':
            imgSrc.value = 'tas.jpg'
            break
        case 'Picard':
            imgSrc.value = 'pic.jpg'
            break
        case 'Prodigy':
            imgSrc.value = 'prod.png'
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