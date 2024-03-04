<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <SessionsDisplay />
  </div>
</template>

<script>
import SessionsDisplay from './SessionsDisplay.vue'

export default {
  name: 'HomeView',
  components: {
    SessionsDisplay
  }
}
</script>
