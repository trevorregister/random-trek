<template>
  <div
    class="min-h-screen bg-cover bg-center bg-fixed"
    :style="{ backgroundImage: `url(${starsImg})` }"
  >
    <div class="min-h-screen bg-black/65">
      <div class="max-w-6xl mx-auto px-6 py-10">

        <h1 class="text-2xl font-bold text-amber-400 tracking-wide mb-8">
          Not sure what episode to watch? Why not queue up...
        </h1>

        <!-- Episode display -->
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6 text-white">
          <h2 class="text-3xl font-bold text-amber-300">{{ episode.showTitle }}</h2>
          <p class="text-lg mt-2 text-white/80">
            Season {{ episode.season }}, Episode {{ episode.number }}: {{ episode.title }}
          </p>
          <h3 class="text-sm font-semibold uppercase tracking-widest text-amber-400/70 mt-5">Synopsis</h3>
          <p class="mt-1 text-white/75 leading-relaxed">{{ episode.synopsis }}</p>
          <h3 class="text-sm font-semibold uppercase tracking-widest text-amber-400/70 mt-5">Air Date</h3>
          <p class="mt-1 text-white/75">{{ episode.airDate }}</p>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 mb-10">
          <Button @click="updateEpisode">Engage!</Button>
          <Button @click="resetFilter" variant="outline">Reset filter</Button>
        </div>

        <!-- Show grid -->
        <h2 class="text-sm font-semibold uppercase tracking-widest text-white/50 mb-4">
          Click a show to filter it out
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <ShowCard
            v-for="show in shows"
            :key="showCardKey"
            :imgSrc="getImage(show)"
            :showTitle="getShowTitle(show)"
            @update-filter="handleUpdateFilter"
          />
        </div>

        <!-- Footer -->
        <div class="mt-12 text-center">
          <a
            href="https://github.com/trevorregister/random-trek"
            class="text-white/30 hover:text-amber-400 text-sm transition-colors"
          >
            Code on GitHub
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import tngEpisodes from './data/tng.json'
import ds9Episodes from './data/ds9.json'
import entEpisodes from './data/ent.json'
import tosEpisodes from './data/tos.json'
import voyEpisodes from './data/voy.json'
import discEpisodes from './data/disc.json'
import ldEpisodes from './data/ld.json'
import snwEpisodes from './data/snw.json'
import tasEpisodes from './data/tas.json'
import picEpisodes from './data/pic.json'
import prodEpisodes from './data/prod.json'
import shortEpisodes from './data/short.json'
import discImg from './assets/disc.png'
import ds9Img from './assets/ds9.jpeg'
import entImg from './assets/ent.jpg'
import ldImg from './assets/ld.jpg'
import picImg from './assets/pic.jpg'
import prodImg from './assets/prod.png'
import snwImg from './assets/snw.jpg'
import tasImg from './assets/tas.jpg'
import tngImg from './assets/tng.jpg'
import tosImg from './assets/tos.jpg'
import voyImg from './assets/voy.jpg'
import shortImg from './assets/short.jpg'
import starsImg from './assets/stars.jpeg'
import _ from 'lodash'
import ShowCard from './components/ShowCard.vue'
import Button from './components/ui/Button.vue'

const tng = ref(tngEpisodes)
const ds9 = ref(ds9Episodes)
const ent = ref(entEpisodes)
const tos = ref(tosEpisodes)
const voy = ref(voyEpisodes)
const disc = ref(discEpisodes)
const ld = ref(ldEpisodes)
const snw = ref(snwEpisodes)
const tas = ref(tasEpisodes)
const pic = ref(picEpisodes)
const prod = ref(prodEpisodes)
const short = ref(shortEpisodes)
const shows = ref([tng, ds9, ent, tos, voy, disc, ld, snw, tas, pic, prod, short])
const queryShows = ref([tng, ds9, ent, tos, voy, disc, ld, snw, tas, pic, prod, short])
const episode = ref({})
const showCardKey = ref(0)

const getRandomEpisode = () => {
  const show = _.shuffle(queryShows.value)[0]
  const episode = _.shuffle(show.value)[0]
  const showTitle = getShowTitle(show)
  episode.showTitle = showTitle
  return episode
}

const updateEpisode = () => {
  if(queryShows.value.length === 0){
    alert('Please select at least one show')
  } else {
    episode.value = getRandomEpisode()
  }
}

const resetFilter = () => {
  queryShows.value = [tng, ds9, ent, tos, voy, disc, ld, snw, tas, pic, prod, short]
  reloadShowCards()
}

const reloadShowCards = () => {
  showCardKey.value++
}

const getShowTitle = (show) => {
  switch(show) {
    case tng: return 'The Next Generation'
    case ds9: return 'Deep Space Nine'
    case ent: return 'Enterprise'
    case tos: return 'The Original Series'
    case voy: return 'Voyager'
    case disc: return 'Discovery'
    case ld: return 'Lower Decks'
    case snw: return 'Strange New Worlds'
    case tas: return 'Animated Series'
    case pic: return 'Picard'
    case prod: return 'Prodigy'
    case short: return 'Short'
  }
}

const getShowFromTitle = (showTitle) => {
  switch(showTitle) {
    case 'The Next Generation': return tng
    case 'Deep Space Nine': return ds9
    case 'Enterprise': return ent
    case 'The Original Series': return tos
    case 'Voyager': return voy
    case 'Discovery': return disc
    case 'Lower Decks': return ld
    case 'Strange New Worlds': return snw
    case 'Animated Series': return tas
    case 'Picard': return pic
    case 'Prodigy': return prod
    case 'Short': return short
  }
}

const handleUpdateFilter = (showTitle) => {
  const showToUpdate = getShowFromTitle(showTitle)
  if(_.includes(queryShows.value, showToUpdate)){
    queryShows.value = _.without(queryShows.value, showToUpdate)
  } else {
    queryShows.value.push(showToUpdate)
  }
}

const getImage = (show) => {
  const showTitle = getShowTitle(show)
  switch(showTitle) {
    case 'The Next Generation': return tngImg
    case 'Deep Space Nine': return ds9Img
    case 'Enterprise': return entImg
    case 'The Original Series': return tosImg
    case 'Discovery': return discImg
    case 'Voyager': return voyImg
    case 'Lower Decks': return ldImg
    case 'Strange New Worlds': return snwImg
    case 'Animated Series': return tasImg
    case 'Picard': return picImg
    case 'Prodigy': return prodImg
    case 'Short': return shortImg
  }
}

onBeforeMount(() => {
  updateEpisode()
})
</script>
