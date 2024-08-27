<template>
  <v-app>
    <v-main>
    <v-img src="./assets/stars.jpeg" cover>
      <v-container>
        <h1>Not sure episode what to watch? Why not queue up...</h1>
        <v-row>
          <v-col>
            <h2>{{ episode.showTitle }}</h2>
              Season {{episode.season}}, episode {{ episode.number }} : {{ episode.title }}
            <h2>Synopsis</h2>
              {{ episode.synopsis }}
            <h2>Air Date</h2>
              {{ episode.airDate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="updateEpisode" class="bg-white ma-2 pa-2">
              Engage!
            </v-btn>
            <v-btn @click="resetFilter" class="bg-white ma-2 pa-2">
              Reset filter
            </v-btn>
          </v-col>
        </v-row>
        <h2 class="pt-5">Click a show to filter it out</h2>
        <v-row class="pa-1">
          <v-col v-for="show in shows" :key=showCardKey class="pa-2">
            <ShowCard
              :imgSrc="getImage(show)"
              :showTitle="getShowTitle(show)"
              @update-filter="handleUpdateFilter"
            />
          </v-col>
        </v-row>
        <v-row class="mt-5 pt-5">
          <p><a href="https://github.com/trevorregister/random-trek">Code on GitHub</a></p>
        </v-row>
      </v-container>
    </v-img>
    </v-main>
  </v-app>
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

import _ from 'lodash'
import ShowCard from './components/ShowCard.vue'

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
const shows = ref([tng, ds9, ent, tos, voy, disc, ld, snw, tas, pic, prod])
const queryShows = ref([tng, ds9, ent, tos, voy, disc, ld, snw, tas, pic, prod])
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
  queryShows.value = [tng, ds9, ent, tos, voy, disc, ld, snw, tas, pic, prod]
  reloadShowCards()
}

const reloadShowCards = () => {
  showCardKey.value++
}

const getShowTitle = (show) => {
  switch(show) {
    case tng:
      return 'The Next Generation'
    case ds9:
      return 'Deep Space Nine'
    case ent: 
      return 'Enterprise'
    case tos:
      return 'The Original Series'
    case voy:
      return 'Voyager'
    case disc:
      return 'Discovery'
    case ld:
      return 'Lower Decks'
    case snw:
      return 'Strange New Worlds'
    case tas:
      return 'Animated Series'
    case pic:
      return 'Picard'
    case prod:
      return 'Prodigy'
  }
}
const handleUpdateFilter = (showTitle) => {
  let showToUpdate
  switch(showTitle) {
    case 'The Next Generation':
      showToUpdate = tng
      break
    case 'Deep Space Nine':
      showToUpdate = ds9
      break
    case 'Enterprise':
      showToUpdate = ent
      break
    case 'The Original Series':
      showToUpdate = tos
      break
    case 'Voyager':
      showToUpdate = voy
      break
    case 'Discovery':
      showToUpdate = disc
      break
    case 'Lower Decks':
      showToUpdate = ld
      break
    case 'Strange New Worlds':
      showToUpdate = snw
      break
    case 'Animated Series':
      showToUpdate = tas
      break
    case 'Picard':
      showToUpdate = pic
      break
    case 'Prodigy':
      showToUpdate = prod
      break
  }
  if(_.includes(queryShows.value, showToUpdate)){
        queryShows.value = _.without(queryShows.value, showToUpdate)
      } else {
        queryShows.value.push(showToUpdate)
      }
}

const getImage = (show) => {
  const showTitle = getShowTitle(show)
    switch(showTitle) {
        case 'The Next Generation':
            return tngImg
        case 'Deep Space Nine':
            return ds9Img
        case 'Enterprise':
            return entImg
        case 'The Original Series':
            return tosImg
        case 'Discovery':
            return discImg
        case 'Voyager':
            return voyImg
        case 'Lower Decks':
            return ldImg
        case 'Strange New Worlds':
            return snwImg
        case 'Animated Series':
            return tasImg
        case 'Picard':
            return picImg
        case 'Prodigy':
            return prodImg
    }
}

onBeforeMount(() => {
  updateEpisode()
})
</script>
