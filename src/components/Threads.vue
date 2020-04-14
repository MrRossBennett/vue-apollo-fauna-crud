<template>
  <div class="board">
    <div class="sticky w-full top-0 bg-gray-100 px-6 py-4 shadow">
      <input
        v-model="newColumnName"
        type="text"
        class="form-input w-full"
        placeholder="Start new thread..."
        @keyup.enter="createColumn"
      />
    </div>

    <div v-if="board.columns && board.columns.length" class="p-6">
      <div class="flex justify-between">
        <p class="text-xs font-medium uppercase tracking-widest">
          Recent Threads
        </p>
        <p class="text-xs font-medium uppercase tracking-widest">
          Filter:
        </p>
      </div>
      <Thread
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :column-index="$columnIndex"
        :board="board"
        class="mb-16"
      />
    </div>

    <div v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Thread from '@components/Thread'

export default {
  components: { Thread },

  data() {
    return {
      newColumnName: ''
    }
  },

  computed: {
    ...mapState({
      board: state => state.threads.board
    }),

    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },

  methods: {
    close() {
      this.$router.push({ name: 'board' })
    },

    createColumn() {
      this.$store.commit('threads/CREATE_COLUMN', {
        name: this.newColumnName
      })

      this.newColumnName = ''
    }
  }
}
</script>
