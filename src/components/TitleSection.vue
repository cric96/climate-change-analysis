<template>
  <v-container>
    <v-row class="text-left">
      <v-col cols="12">
        <h1 class="typed-out" style="font-size:10vw"> Out of time </h1>
        <h2 class="typed-out-2" style="font-size:5vw"> How we have changed the world </h2>
      </v-col>
    </v-row>
    
    <v-row class="text-center">
      <v-col>
        <v-btn class="mx-2" fab dark color="cyan" @click="changeToCharts">
          <v-icon x-large dark>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'TitleSection',
    props: ["value"],
    methods: {
      changeToCharts() {
        this.$emit('input', true)
      }
    }
  }
</script>

<style scoped>
.typed-out {
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  animation:
    typing 2s steps(20, end) forwards
}
.typed-out-2 {
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  animation:
    typing 2s steps(20, end) 2s forwards
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  from { border-color: transparent }
  to { border-color: orange; }
}
</style>
