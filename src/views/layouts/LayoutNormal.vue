<script>
import NavBar from './NavBar.vue'
import MainContent from './MainContent.vue'
import Footer from './Footer.vue'
import Title from './Title.vue'
export default {
  setup() {},
  components: { NavBar, MainContent, Footer, Title },
}
</script>

<template>
  <div class="md:flex flex-col justify-between">
    <NavBar />
    <Title />
    <MainContent />
    <Footer class="self-end"></Footer>
  </div>
</template>
