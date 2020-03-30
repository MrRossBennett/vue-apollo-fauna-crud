<template>
  <div class="home">
     <div class="header">
      <BookSearch />
      <hr />
      <h1>Notes</h1>
      <NoteCreate/>
    </div>
    <NotesList />
  </div>
</template>

<script>
// @ is an alias to /src
import NotesList from '@/components/NotesList.vue'
import NoteCreate from '@/components/NoteCreate.vue'
import BookSearch from '@/components/BookSearch.vue'

export default {
  name: 'Home',

  components: {
    NotesList,
    NoteCreate,
    BookSearch
  }
}
</script>
