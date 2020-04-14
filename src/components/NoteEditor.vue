<template>
  <ApolloMutation
    :mutation="require('../graphql/updateNote.js').default"
    :variables="{ id, author: newAuthor, body: newBody }"
    :update="updateCache"
    @done="onDone"
  >
    yarn
    <template v-slot="{ mutate, loading, error }">
      <input
        id="body"
        v-model="newBody"
        type="text"
        placeholder="Contents"
        :disabled="loading"
      />
      <input
        id="author"
        v-model="newAuthor"
        type="text"
        placeholder="Author"
        :disabled="loading"
      />
      <button :disabled="loading || !isSubmittable" @click="mutate">
        Save
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="loading">Saving...</p>
      <!-- <p class="success" v-if="showSuccess">Note saved!</p> -->
    </template>
  </ApolloMutation>
</template>

<script>
import allNotes from '../graphql/allNotes'

export default {
  props: {
    body: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      newBody: this.body,
      newAuthor: this.author
    }
  },

  computed: {
    isSubmittable() {
      return (
        !!this.newAuthor &&
        !!this.newBody &&
        !(this.newBody === this.body && this.newAuthor === this.author)
      )
    }
  },

  methods: {
    onDone() {
      this.$emit('saved')
    },

    updateCache(store, result) {
      const updatedNote = result.data.updateNote
      const data = store.readQuery({ query: allNotes })
      const indexOfNote = data.allNotes.data.findIndex(
        n => n._id === updatedNote._id
      )
      data.allNotes.data[indexOfNote] = updatedNote
      store.writeQuery({ query: allNotes, data })
    }
  }
}
</script>
