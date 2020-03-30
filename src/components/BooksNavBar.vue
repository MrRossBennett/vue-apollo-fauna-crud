<template>
<nav>
  <div>
    <form v-on:submit.prevent>
      <div>
        <input :value="userInput" @input="valueChange" @keyup.enter="submitValue" type="search" autocomplete="off">
        <label for="search">Search</label>
      </div>
    </form>
  </div>
</nav>
</template>

<script>
export default {
  props: ['userInput'],

  data () {
    return {
      input: ''
    }
  },

  methods: {
    valueChange (event) {
      this.input = event.target.value
      this.$emit('changedValue', this.input)
    },

    submitValue (event) {
      if (this.input === '') {
        console.log('No search value entered')
      }
      this.$emit('submitValue')
    },

    clearInput (event) {
      this.input = ''
      this.$emit('inputCleared', this.input)
    }
  }
}
</script>
