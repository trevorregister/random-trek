<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-gray-900 border border-white/15 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h2 class="text-lg font-semibold text-amber-300">Excluded Episodes</h2>
        <button
          class="text-white/50 hover:text-white transition-colors text-xl leading-none"
          @click="$emit('close')"
        >✕</button>
      </div>

      <div class="overflow-y-auto flex-1 px-6 py-4">
        <p v-if="sortedExclusions.length === 0" class="text-white/50 text-sm">
          No episodes excluded.
        </p>
        <div v-else>
          <div
            v-for="group in sortedExclusions"
            :key="group.showTitle"
            class="mb-6 last:mb-0"
          >
            <h3 class="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">
              {{ group.showTitle }}
            </h3>
            <ul class="space-y-1">
              <li
                v-for="ep in group.episodes"
                :key="ep.id"
                class="flex items-center justify-between text-white/80 text-sm py-1"
              >
                <span>{{ formatEpisode(ep) }}</span>
                <button
                  class="ml-4 text-red-400 hover:text-red-300 transition-colors font-bold text-base leading-none shrink-0"
                  @click="$emit('remove', ep.id)"
                >✕</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-white/10 flex justify-end">
        <button
          v-if="sortedExclusions.length > 0"
          class="text-sm text-red-400 hover:text-red-300 transition-colors"
          @click="confirmClearAll"
        >Clear all exclusions</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exclusions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'remove', 'clear-all'])

const SHOW_ORDER = [
  'The Original Series',
  'Animated Series',
  'The Next Generation',
  'Deep Space Nine',
  'Voyager',
  'Enterprise',
  'Discovery',
  'Picard',
  'Strange New Worlds',
  'Lower Decks',
  'Prodigy',
  'Short',
]

const sortedExclusions = computed(() => {
  const grouped = {}
  for (const ep of props.exclusions) {
    if (!grouped[ep.showTitle]) grouped[ep.showTitle] = []
    grouped[ep.showTitle].push(ep)
  }
  return SHOW_ORDER
    .filter(title => grouped[title])
    .map(title => ({
      showTitle: title,
      episodes: [...grouped[title]].sort((a, b) => {
        if (a.season !== b.season) return a.season - b.season
        return (a.number ?? a.episode ?? 0) - (b.number ?? b.episode ?? 0)
      })
    }))
})

const formatEpisode = (ep) => {
  const s = String(ep.season).padStart(2, '0')
  const n = String(ep.number ?? ep.episode ?? 0).padStart(2, '0')
  return `S${s}E${n} ${ep.title}`
}

const confirmClearAll = () => {
  if (confirm('Remove all excluded episodes?')) {
    emit('clear-all')
  }
}
</script>
