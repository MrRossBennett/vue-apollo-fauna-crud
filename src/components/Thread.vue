<template>
  <div>
    <div
      class="flex items-center my-4 font-bold text-2xl font-serif tracking-wide text-gray-700"
    >
      {{ column.name }}
    </div>

    <Drop @drop="moveTask">
      <Drag
        class="column"
        :transfer-data="{
          type: 'column',
          fromColumnIndex: columnIndex
        }"
      >
        <ThreadItem
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :task-index="$taskIndex"
          :column="column"
          :column-index="columnIndex"
          :board="board"
          class="my-1"
        />
      </Drag>
    </Drop>

    <Drop
      class="bg-white border border-dashed border-teal-400 px-6 h-40 rounded-lg flex flex-col justify-center items-center"
      @drop="createTask($event, column.tasks)"
    >
      <p class="tracking-wide uppercase text-xs uppercase">Drop choice here</p>
      <!-- <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Add new item"
        @keyup.enter="createTask($event, column.tasks)"
      /> -->
    </Drop>
  </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@mixins/movingTasksAndColumnsMixin'
import Drag from '@components/Drag'
import Drop from '@components/Drop'
import ThreadItem from '@components/ThreadItem'

export default {
  components: {
    ThreadItem,
    Drag,
    Drop
  },

  mixins: [movingTasksAndColumnsMixin],

  methods: {
    createTask(transferData, tasks) {
      this.$store.commit('threads/CREATE_TASK', {
        tasks,
        item: transferData
      })
      // e.target.value = ''
    }
  }
}
</script>
