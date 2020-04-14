<template>
  <Layout>
    <div class="w-2/6 xl:flex-1 justify-center xl:overflow-x-hidden relative">
      <Search />
    </div>
    <div class="w-3/6 border-l border-gray-400 xl:overflow-x-hidden relative">
      <Threads />
    </div>
    <div class="w-1/6 border-l border-gray-400 px-6">
      Activity
    </div>
    <!-- <hr />
    <h1>Notes</h1>
    <NoteCreate />
    <NotesList /> -->
  </Layout>
</template>

<script>
import Layout from '@src/layouts/main'
// import NotesList from '@components/NotesList'
// import NoteCreate from '@components/NoteCreate'
import Search from '@components/Search'
import Threads from '@components/Threads'
import { mapState } from 'vuex'

export default {
  components: {
    Layout,
    // NotesList,
    // NoteCreate,
    Search,
    Threads
  },

  data() {
    return {
      column: {}
    }
  },

  computed: {
    ...mapState({
      board: state => state.threads.board
    })
  }
}
</script>
