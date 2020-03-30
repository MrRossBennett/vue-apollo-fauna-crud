<template>
  <ApolloMutation
    class="creator"
    :mutation="require('../graphql/createNote.js').default"
    :variables="{ author, body }"
    :update="updateCache"
    @done="onDone"
  >
    <template v-slot="{ mutate, loading, error }">
      <h4>Add Note:</h4>
      <input
        id="body"
        type="text"
        placeholder="Contents"
        :disabled="loading"
        v-model="body"
      />
      <input
        id="author"
        type="text"
        placeholder="Author"
        :disabled="loading"
        v-model="author"
      />
      <button :disabled="loading || !isSubmittable" @click="mutate">Save</button>
      <p class="error" v-if="error">{{error}}</p>
      <p v-if="loading">Saving...<p>
      <p class="success" v-if="showSuccess">Note saved!</p>
    </template>
  </ApolloMutation>
</template>

<script>
import createNote from '../graphql/createNote'
import allNotes from '../graphql/allNotes'

export default {

  data () {
    return {
      query: createNote,
      author: '',
      body: '',
      showSuccess: false
    }
  },

  computed: {
    isSubmittable () {
      return !!this.author && !!this.body
    }
  },

  methods: {
    onDone () {
      this.showSuccess = true
      this.author = ''
      this.body = ''
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    },

    updateCache (store, result) {
      const newNote = result.data.createNote
      const data = store.readQuery({ query: allNotes })
      data.allNotes.data = [...data.allNotes.data, newNote]
      store.writeQuery({ query: allNotes, data })
    }
  }
}
</script>
