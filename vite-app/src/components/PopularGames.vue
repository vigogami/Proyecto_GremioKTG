<template>
  <v-container class="container-background py-6">
    <h2 class="section-title">Popular games</h2>
    <v-row>
      <v-col
        v-for="(item, index) in images"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <a :href="item.link" target="_blank" rel="noopener">
          <v-img
            class="hover-zoom"
            :src="item.src"
            aspect-ratio="16/9"
            cover
            @mouseenter="setBackground(item.src)"
            @mouseleave="clearBackground"
          />
        </a>
        <h3 class="text-center mt-3">{{ item.title }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const images = ref([
  { src: 'https://gremioktg.com/wp-content/uploads/2024/02/HonkaiStarRail-Feature-image.jpg', title: 'Honkai StarRail', link: 'https://wp.gremioktg.com/honkai-star-rail/' },
  { src: 'https://gremioktg.com/wp-content/uploads/2024/02/ZenlessZoneZero-Feature-image.png', title: 'Zenless Zone Zero', link: 'https://wp.gremioktg.com/zenless-zone-zero/' },
  { src: 'https://gremioktg.com/wp-content/uploads/2024/02/ThroneLiberty-Feature-image.jpg', title: 'Throne and Liberty', link: 'https://wp.gremioktg.com/throne-and-liberty/' },
  { src: 'https://gremioktg.com/wp-content/uploads/2024/02/BlueProtocol-Feature-image.jpg', title: 'Blue Protocol', link: 'https://wp.gremioktg.com/blue-protocol/' }
])

const setBackground = (src: string) => {
  document.body.style.backgroundImage = `url(${src})`
  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundRepeat = 'no-repeat'
  document.body.style.backgroundPosition = 'center center'
  document.body.style.transition = 'background-image 0.5s ease-in-out'
}

const clearBackground = () => {
  document.body.style.backgroundImage = ''
}

onMounted(() => {
  clearBackground()
})

onBeforeUnmount(() => {
  clearBackground()
})
</script>
