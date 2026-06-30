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
            Season {{ episode.season }}, Episode {{ episode.number ?? episode.episode }}: {{ episode.title }}
          </p>
          <h3 class="text-sm font-semibold uppercase tracking-widest text-amber-400/70 mt-5">Synopsis</h3>
          <p class="mt-1 text-white/75 leading-relaxed">{{ episode.synopsis }}</p>
          <h3 class="text-sm font-semibold uppercase tracking-widest text-amber-400/70 mt-5">Air Date</h3>
          <p class="mt-1 text-white/75">{{ episode.airDate }}</p>
          <div class="mt-5">
            <button
              v-if="episode.id && !excludedIds.has(episode.id)"
              class="text-sm text-white/40 hover:text-red-400 transition-colors"
              @click="excludeEpisode(episode)"
            >Exclude this episode</button>
            <span v-else-if="episode.id && excludedIds.has(episode.id)" class="text-sm text-white/30 italic">
              Excluded
            </span>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 mb-10 flex-wrap">
          <Button @click="updateEpisode">Engage!</Button>
          <Button @click="resetFilter" variant="outline">Reset filter</Button>
          <Button @click="saveFilter" variant="outline">Save filter</Button>
          <Button @click="showExclusionsModal = true" variant="outline">
            Exclusions{{ excludedIds.size > 0 ? ` (${excludedIds.size})` : '' }}
          </Button>
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
            :initialIsFiltered="!queryShows.includes(show)"
            @update-filter="handleUpdateFilter"
          />
        </div>

        <!-- Exclusions modal -->
        <ExclusionsModal
          v-if="showExclusionsModal"
          :exclusions="excludedEpisodes"
          @close="showExclusionsModal = false"
          @remove="removeExclusion"
          @clear-all="clearAllExclusions"
        />

        <!-- Footer -->
        <div class="mt-12 text-center">
          <a
            href="https://buymeacoffee.com/trevorregister"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            ☕ Buy me a coffee
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
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
import ExclusionsModal from './components/ExclusionsModal.vue'

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
const FILTER_KEY = 'random-trek-filter'
const EXCLUSIONS_KEY = 'random-trek-exclusions'
const showExclusionsModal = ref(false)
const excludedEpisodes = ref([])
const excludedIds = computed(() => new Set(excludedEpisodes.value.map(ep => ep.id)))

const getRandomEpisode = () => {
  const ids = excludedIds.value
  const eligible = queryShows.value.flatMap(show => {
    const title = getShowTitle(show)
    return show.value.filter(ep => !ids.has(ep.id)).map(ep => ({ ...ep, showTitle: title }))
  })
  if (eligible.length === 0) return null
  return _.shuffle(eligible)[0]
}

const updateEpisode = () => {
  if(queryShows.value.length === 0){
    alert('Please select at least one show')
  } else {
    const result = getRandomEpisode()
    if (result === null) {
      alert('All episodes in the selected shows are excluded.')
    } else {
      episode.value = result
    }
  }
}

const excludeEpisode = (ep) => {
  if (!excludedIds.value.has(ep.id)) {
    excludedEpisodes.value = [...excludedEpisodes.value, { ...ep }]
    saveExclusions()
  }
}

const removeExclusion = (id) => {
  excludedEpisodes.value = excludedEpisodes.value.filter(ep => ep.id !== id)
  saveExclusions()
}

const clearAllExclusions = () => {
  excludedEpisodes.value = []
  saveExclusions()
}

const saveExclusions = () => {
  localStorage.setItem(EXCLUSIONS_KEY, JSON.stringify(excludedEpisodes.value))
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

const saveFilter = () => {
  const titles = queryShows.value.map(show => getShowTitle(show))
  localStorage.setItem(FILTER_KEY, JSON.stringify(titles))
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
  const savedTitles = JSON.parse(localStorage.getItem(FILTER_KEY) ?? 'null')
  if (savedTitles) {
    queryShows.value = savedTitles.map(getShowFromTitle).filter(Boolean)
    reloadShowCards()
  }
  const savedExclusions = JSON.parse(localStorage.getItem(EXCLUSIONS_KEY) ?? 'null')
  if (savedExclusions) {
    excludedEpisodes.value = savedExclusions
  }
  updateEpisode()
})
</script>
