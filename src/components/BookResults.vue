<template>
  <div class="book-results">
    <div v-if="books.length === 0" class="had-container">
      No results
    </div>

    <div v-else class="had-container">
      {{ books }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'BookResults',
  props: ['input', 'books']
}
</script>
