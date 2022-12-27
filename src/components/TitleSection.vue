<template>
  <v-container fluid class="pa-12">
    <div class="video-background"></div>
    
    <v-row class="text-left">
      <v-col cols="12 ml-12 pl-12" dark>
        <h1 class="typed-out white--text" style="font-size:10vw"> Out of time </h1>
        <h2 class="typed-out-2 white--text" style="font-size:4vw"> How we have changed the world? </h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn class="mx-2" fab @click="changeToCharts">
          <v-icon x-large dark color="secondary">
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


.video-background {
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index: 0;
  background: url("../assets/background.gif");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  height: 100vh;
  filter: blur(0px);
}

.col {
  z-index: 100;
}

</style>
