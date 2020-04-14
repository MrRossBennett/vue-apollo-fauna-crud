<template>
  <div class="min-h-screen xl:flex xl:flex-col xl:h-screen text-gray-700">
    <SiteHeader />
    <div
      class="flex flex-col xl:flex-1 xl:flex-row xl:overflow-y-hidden h-screen text-gray-600"
    >
      <slot />
      <!-- <SiteFooter /> -->
    </div>
  </div>
</template>

<script>
import SiteHeader from '@components/SiteHeader'
// import SiteFooter from '@components/SiteFooter'

export default {
  components: {
    SiteHeader
    // SiteFooter
  }
}
</script>
