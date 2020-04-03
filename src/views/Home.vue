<template>
<div class="relative min-h-screen overflow-hidden bg-gray-900">
      <div class="hidden lg:block absolute scroll-bg bg-no-repeat transition-background-image duration-700 ease-out" :style="{...bg, backgroundImage: `url(${this.currentImg})`}"></div>
      <div class="relative min-h-screen lg:min-w-3xl xl:min-w-4xl lg:flex lg:items-center lg:justify-center lg:w-2/5 lg:py-20 lg:pl-8 lg:pr-8 bg-gray-900">

      <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-900 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,0 100,0 50,100 0,100"></polygon>
      </svg>

<div
    class="bm-reviews"
    data-isbn="9781594204876"
    data-width="auto"
    data-link="true">
</div>

        <div>
          <div class="p-6 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none">
            <p class="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Music • Movies • Books
            </p>
            <h1 class="mt-3 text-3xl leading-9 font-semibold font-display text-white sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
              <span class="block text-3xl font-serif">The</span>
              Enthusiast
              <br class="hidden sm:inline">
              <span class="text-teal-400">
                Network
              </span>
            </h1>
            <p class="mt-2 text-lg leading-7 text-gray-300 sm:mt-3 sm:text-xl sm:max-w-xl xl:mt-4 xl:text-2xl xl:max-w-2xl">
              The music, movies and books that made you.
            </p>
            <div class="mt-6 sm:flex sm:mt-8 xl:mt-12">
              <a href="/search" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-semibold rounded-md text-gray-900 bg-white shadow-sm hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150 xl:text-lg">
                Explore
              </a>
              <a href="/login" class="mt-4 sm:ml-4 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 xl:text-lg">
                Login →
              </a>
            </div>
          </div>
          <div class="relative h-128 overflow-hidden bg-gray-300 lg:hidden">
            <div class="absolute scroll-bg" :style="{...bg, backgroundImage: `url(${this.imageUrl})`, right: '0'}"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      open: false,

      timer: null,
      currentIndex: 0,

      bg: {
        height: '100%',
        width: '100%',
        top: '0',
        right: '-400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }
    }
  },

  mounted () {
    this.startSlide()
  },

  computed: {
    imageUrl () {
      return require('../assets/img/cover1.jpg')
    },
    imageUrl2 () {
      return require('../assets/img/cover2.jpg')
    },
    images () {
      return [
        this.imageUrl,
        this.imageUrl2
      ]
    },
    currentImg () {
      return this.images[Math.abs(this.currentIndex) % this.images.length]
    }
  },

  methods: {
    startSlide () {
      this.timer = setInterval(this.next, 4000)
    },

    next () {
      this.currentIndex += 1
    }
  }
}
</script>
