<template>
  <v-app>
    <v-main>
      <v-container>
<!--         <v-img src="./assets/mft-lcars.png"> -->
          <v-sheet class="ma-2 pa-2">
            <v-row>
              <v-col>
                <h1>{{ episode.showTitle }}</h1>
                  Season {{episode.season}}, episode {{ episode.number }} : {{ episode.title }}
                <h1>Synopsis</h1>
                  {{ episode.synopsis }}
                <h1>Air Date</h1>
                  {{ episode.airDate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="updateEpisode">
                  Engage!
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
<!--         </v-img> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import tngEpisodes from './data/tng.json'
import ds9Episodes from './data/ds9.json'
import entEpisodes from './data/ent.json'
import _ from 'lodash'

const tng = ref(tngEpisodes)
const ds9 = ref(ds9Episodes)
const ent = ref(entEpisodes)
const shows = ref([tng, ds9, ent])
const episode = ref({})

const getRandomEpisode = () => {
  const show = _.shuffle(shows.value)[0]
  const episode = _.shuffle(show.value)[0]
  const showTitle = getShowTitle(show)
  episode.showTitle = showTitle
  return episode
}

const updateEpisode = () => {
  episode.value = getRandomEpisode()
}

const getShowTitle = (show) => {
  switch(show) {
    case tng:
      return 'The Next Generation'
    case ds9:
      return 'Deep Space Nine'
    case ent: 
      return 'Enterprise'
  }
}

onBeforeMount(() => {
  updateEpisode()
})
</script>
