<template>
  <ApolloQuery :query="require('../graphql/allNotes.js').default">
    <template v-slot="{ result: { error, data }, isLoading }">
      <!-- Loading -->
      <div v-if="isLoading">Loading...</div>

      <!-- Error -->
      <div v-else-if="error">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data">
        <Note v-for="post in data.allNotes.data" :key="post._id" :body="post.body" :id="post._id" :author="post.author"/>
          <p>
            {{ data.allNotes.data.length }} notes
          </p>
      </div>

      <!-- No result -->
      <div v-else class="no-result">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
import Note from '@/components/Note'

export default {
  components: {
    Note
  }
}
</script>
