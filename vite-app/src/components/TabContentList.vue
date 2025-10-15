<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      class="my-2"
      type="list-item-two-line, list-item-two-line, list-item-two-line, list-item-two-line"
    />
    <v-alert v-else-if="error" type="error" variant="tonal">
      {{ error }}
    </v-alert>
    <v-alert v-else-if="!items.length" type="info" variant="tonal">
      No hay contenido disponible.
    </v-alert>
    <v-row v-else>
      <v-col v-for="item in items" :key="item.id" cols="12" class="py-1">
        <v-card class="v-card-styles" elevation="3">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="content-container">
              <v-card-title class="card-title wrap">
                {{ item.title }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="ms-1" size="small" variant="outlined" @click="leerMas(item.link)">
                  Leer Más
                </v-btn>
                <div class="ml-3 d-flex align-center text-caption">
                  <v-icon class="mr-1" size="small">mdi-clock-outline</v-icon>
                  {{ formatDate(item.date) }}
                </div>
              </v-card-actions>
            </div>
            <v-avatar rounded="0" size="100">
              <template v-if="item.featured_image">
                <v-img :src="item.featured_image" cover />
              </template>
              <template v-else>
                <v-icon size="64">mdi-image-off</v-icon>
              </template>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

interface ContentItem {
  id: number
  title: string
  date: string
  link: string
  featured_image: string | null
}

interface Props {
  items: ContentItem[]
  loading: boolean
  error: string
}

const props = defineProps<Props>()

const leerMas = (link: string) => {
  window.open(link, '_blank')
}

const formatDate = (dateString: string) => format(new Date(dateString), 'dd/MM/yy')
</script>
