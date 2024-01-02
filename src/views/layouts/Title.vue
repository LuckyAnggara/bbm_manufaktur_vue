<template>
  <div class="my-2 pl-10">
    <p class="text-4xl">{{ title }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title
    },
  },
}
</script>
