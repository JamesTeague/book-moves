<script setup lang="ts">
import { initThinBackend } from 'thin-backend';
import { ThinBackend } from 'thin-backend-vue';
import Navbar from './components/navbar/Navbar.vue';

initThinBackend({
  host: 'https://book-moves.thinbackend.app',
});
</script>

<template>
  <ThinBackend requireLogin>
    <Navbar />
    <router-view></router-view>
  </ThinBackend>
</template>

<style></style>
