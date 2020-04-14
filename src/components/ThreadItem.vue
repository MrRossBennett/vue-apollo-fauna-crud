<template>
  <div>
    <Drop class="bg-white shadow-md rounded-lg" @drop="moveTask">
      <Drag
        :transfer-data="{
          type: 'task',
          fromColumnIndex: columnIndex,
          fromTaskIndex: taskIndex
        }"
        class="flex"
      >
        <img :src="task.thumbnail" class="w-24 rounded-tl-lg rounded-bl-lg" />

        <article class="w-full p-4">
          <h2 class="w-full font-bold">
            {{ task.title }}
          </h2>
          <p v-if="task.release_date" class="mt-1 text-xs">
            {{ task.release_date }}
          </p>
          <textarea
            class="form-textarea w-full bg-transparent h-16 mt-2 leading-normal resize-none text-sm"
            maxlength="140"
            :value="task.note"
            placeholder="Add a note..."
            @change="updateTaskProperty($event, 'note')"
          />
        </article>
      </Drag>
    </Drop>
    <div class="w-full my-2 relative h-4">
      <span
        class="absolute top-0 w-16 border-l-4 border-dotted h-4"
        style="left: 50%;"
      ></span>
    </div>
  </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@mixins/movingTasksAndColumnsMixin'
import Drag from '@components/Drag'
import Drop from '@components/Drop'

export default {
  components: { Drag, Drop },

  mixins: [movingTasksAndColumnsMixin],

  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },

  methods: {
    updateTaskProperty(e, key) {
      console.log(e.target.value)
      this.$store.commit('threads/UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  }
}
</script>
