<template>
  <div class="post">
    <template v-if="!editing">
      <div class="menu-buttons">
        <NoteDelete
          :id="id"
        />
        <button
class="menu-button"
@click="() => editing = true">Edit</button>
      </div>
      <p class="body">{{body}}</p>
      <p class="author">~ {{author}}</p>
    </template>

    <template v-else>
      <div class="menu-buttons">
        <button
class="menu-button"
@click="() => editing = false">Cancel</button>
      </div>
      <NoteEditor
        :id="id"
        :body="body"
        :author="author"
        @saved="() => editing = false"
      />
    </template>
  </div>
</template>

<script>
import NoteDelete from '@components/NoteDelete.vue'
import NoteEditor from '@components/NoteEditor.vue'

export default {
  components: {
    NoteDelete,
    NoteEditor
  },

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

  data () {
    return {
      editing: false
    }
  }
}
</script>
