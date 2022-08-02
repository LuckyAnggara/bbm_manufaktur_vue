<script>
import NavBar from './NavBar.vue'
import MainContent from './MainContent.vue'
import Footer from './Footer.vue'
export default {
  setup() {},
  components: { NavBar, MainContent, Footer },
}
</script>

<template>
  <div class="md:flex flex-col justify-between">
    <NavBar />

    <MainContent />
    <Footer class="self-end" />
  </div>
</template>
