<template>
  <form @submit.prevent>
    <div>
      <input
        :value="userInput"
        class="form-input w-full text-gray-700"
        type="search"
        autocomplete="off"
        placeholder="Search"
        @input="valueChange"
        @keyup.enter="submitValue"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    userInput: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      input: ''
    }
  },

  methods: {
    valueChange(event) {
      this.input = event.target.value
      this.$emit('changedValue', this.input)
    },

    submitValue(event) {
      if (this.input === '') {
        console.log('No search value entered')
      }
      this.$emit('submitValue')
    },

    clearInput(event) {
      this.input = ''
      this.$emit('inputCleared', this.input)
    }
  }
}
</script>
