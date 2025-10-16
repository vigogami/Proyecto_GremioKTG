<template>
  <section class="py-4">
    <div class="slider-header">
      <h2 class="section-title mb-0">{{ title }}</h2>
      <v-text-field
        v-model="search"
        :placeholder="searchPlaceholder"
        prepend-inner-icon="mdi-magnify"
        density="comfortable"
        hide-details
        variant="solo"
        class="search-field"
      />
    </div>

    <v-slide-group v-model="selected" show-arrows>
      <v-slide-group-item
        v-for="(item, index) in filteredGames"
        :key="item.id || index"
        :value="index"
      >
        <v-card
          class="rounded-card ma-2"
          height="260"
          width="260"
          @click="goToArticle(item.link)"
        >
          <v-img
            :src="item.img"
            height="150"
            cover
            class="rounded-image"
          />
          <v-card-title class="text-wrap text-subtitle-1">
            {{ item.title }}
          </v-card-title>
          <v-card-subtitle class="text-body-2">
            {{ truncateText(item.subtitle, 90) }}
          </v-card-subtitle>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <v-alert v-if="!loading && !filteredGames.length" type="info" variant="tonal" class="mt-4">
      No encontramos artículos que coincidan con tu búsqueda.
    </v-alert>

    <v-skeleton-loader
      v-if="loading"
      type="image, image, image, image"
      class="mt-4"
    />

    <v-alert v-if="error" type="error" variant="tonal" class="mt-4">
      {{ error }}
    </v-alert>
  </section>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'

interface GameSliderProps {
  title: string
  searchPlaceholder: string
  query: Record<string, unknown>
}

interface GameItem {
  id: number
  img: string
  title: string
  subtitle: string
  link: string
}

const props = defineProps<GameSliderProps>()

const apiBase = 'https://wp.gremioktg.com/wp-json/wp/v2/posts'

const search = ref('')
const selected = ref(0)
const games = ref<GameItem[]>([])
const loading = ref(false)
const error = ref('')

const fetchGames = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await axios.get(apiBase, {
      params: props.query
    })

    games.value = data.map((post: any) => ({
      id: post.id,
      img:
        post._embedded && post._embedded['wp:featuredmedia']
          ? post._embedded['wp:featuredmedia'][0].source_url
          : 'https://cdn.vuetifyjs.com/docs/images/graphics/games/default.jpg',
      title: post.title.rendered,
      subtitle: cleanText(post.excerpt.rendered),
      link: post.link
    }))
  } catch (err) {
    console.error(err)
    error.value = 'No pudimos cargar las guías en este momento.'
  } finally {
    loading.value = false
  }
}

const cleanText = (text: string) => (text ? text.replace(/<[^>]+>/g, '') : '')

const truncateText = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`
  }
  return text
}

const goToArticle = (link: string) => {
  window.open(link, '_blank')
}

const filteredGames = computed(() =>
  games.value.filter((game) =>
    game.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

onMounted(() => {
  fetchGames()
})

watch(() => props.query, fetchGames, { deep: true })
</script>
