<template>
  <v-row class="hero-container pa-4" align="stretch" justify="center">
    <v-col cols="12" md="7">
      <v-card elevation="6">
        <v-responsive aspect-ratio="16/9" class="video-container">
          <iframe
            width="100%"
            style="min-height: 100%;"
            src="https://www.youtube.com/embed/oAMG-mcXl_E?si=avXUDdHRJLMSmY21"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </v-responsive>
      </v-card>
    </v-col>

    <v-col cols="12" md="5">
      <v-card elevation="6">
        <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
          <v-tab value="news">Noticias</v-tab>
          <v-tab value="analysis">Análisis</v-tab>
          <v-tab value="recent">Top</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="news">
              <TabContentList :items="newsPosts" :loading="loading.news" :error="errors.news" />
            </v-window-item>
            <v-window-item value="analysis">
              <TabContentList :items="analysisPosts" :loading="loading.analysis" :error="errors.analysis" />
            </v-window-item>
            <v-window-item value="recent">
              <TabContentList :items="recentPosts" :loading="loading.recent" :error="errors.recent" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import TabContentList from './TabContentList.vue'

interface TabMenuProps {
  apiBase: string
}

interface ContentItem {
  id: number
  title: string
  date: string
  link: string
  featured_image: string | null
}

const props = defineProps<TabMenuProps>()

const tab = ref<'news' | 'analysis' | 'recent'>('news')

const loading = reactive({
  news: false,
  analysis: false,
  recent: false
})

const errors = reactive({
  news: '',
  analysis: '',
  recent: ''
})

const newsPosts = ref<ContentItem[]>([])
const analysisPosts = ref<ContentItem[]>([])
const recentPosts = ref<ContentItem[]>([])

const fetchPosts = async (
  target: typeof newsPosts,
  key: 'news' | 'analysis' | 'recent',
  params: Record<string, unknown>
) => {
  loading[key] = true
  errors[key] = ''
  try {
    const { data } = await axios.get(props.apiBase, {
      params
    })

    const mapped = await Promise.all(
      data.map(async (post: any) => {
        let featured_image: string | null = null

        if (post.featured_media) {
          try {
            const media = await axios.get(`https://wp.gremioktg.com/wp-json/wp/v2/media/${post.featured_media}`)
            featured_image = media.data.source_url
          } catch (error) {
            console.error('Error fetching media', error)
          }
        }

        return {
          id: post.id,
          title: post.title.rendered,
          date: post.date,
          link: post.link,
          featured_image
        }
      })
    )

    target.value = mapped
  } catch (error) {
    errors[key] = 'No pudimos cargar los posts. Intenta nuevamente más tarde.'
    console.error(error)
  } finally {
    loading[key] = false
  }
}

const fetchAll = () => {
  fetchPosts(newsPosts, 'news', { per_page: 4, tags: 14 })
  fetchPosts(analysisPosts, 'analysis', { per_page: 4, tags: 18 })
  fetchPosts(recentPosts, 'recent', { per_page: 4, orderby: 'date', order: 'desc' })
}

onMounted(() => {
  fetchAll()
})
</script>
