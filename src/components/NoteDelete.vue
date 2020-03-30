<template>
  <ApolloMutation
    :mutation="require('../graphql/deleteNote.js').default"
    :variables="{id}"
    :update="updateCache"
  >
    <template v-slot="{ mutate, loading }">
      <button class="button" @click="loading? () => {} : mutate()">
        {{loading? "deleting..." : "X"}}
      </button>
    </template>
  </ApolloMutation>
</template>

<script>
import allNotes from '../graphql/allNotes'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },

  methods: {
    updateCache (store, result) {
      const oldNote = result.data.deleteNote
      const data = store.readQuery({ query: allNotes })
      data.allNotes.data = data.allNotes.data.filter(n => n._id !== oldNote._id)
      store.writeQuery({ query: allNotes, data })
    }
  }
}
</script>
