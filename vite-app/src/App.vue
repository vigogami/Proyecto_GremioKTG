<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="py-6" fluid>
        <TabMenu :api-base="apiBase" />
        <v-divider class="my-6" />
        <GameSlider
          title="Blue Protocol Guías"
          search-placeholder="Buscar guías de Blue Protocol"
          :query="blueProtocolQuery"
        />
        <v-divider class="my-6" />
        <GameSlider
          title="Throne and Liberty Guías"
          search-placeholder="Buscar guías de Throne and Liberty"
          :query="throneLibertyQuery"
        />
        <v-divider class="my-6" />
        <PopularGames />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import GameSlider from './components/GameSlider.vue'
import NavBar from './components/NavBar.vue'
import PopularGames from './components/PopularGames.vue'
import TabMenu from './components/TabMenu.vue'

const apiBase = 'https://wp.gremioktg.com/wp-json/wp/v2/posts'

const blueProtocolQuery = {
  per_page: 10,
  categories: 21,
  tags: 34,
  _embed: true
}

const throneLibertyQuery = {
  per_page: 10,
  categories: 21,
  tags: 25,
  _embed: true
}
</script>
