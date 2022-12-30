<template>
  <v-container fill-height fluid justify-space-between>
    <div class="video-background"></div>
    
    <v-row class="text-left">
      <v-col cols="12" dark>
        <h1 class="typed-out white--text text-center" style="font-size:10vw"> Out of time </h1>
        <h2 class="typed-out-2 white--text text-center" style="font-size:4vw"> How we have changed the world? </h2>
      </v-col>
    </v-row>
    <v-row class="text-center mt-16">
      <v-col>
        <v-btn class="mx-2 fade-in" fab @click="changeToCharts">
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
  opacity: 0;
  animation:
    fadeIn 1s 1s forwards;
}

.typed-out-2 {
  overflow: hidden;
  white-space: nowrap;

  opacity: 0;
  animation: fadeIn 1s 2s forwards;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s 3s forwards;
} 

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
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
  filter: blur(14px); 
}

.col {
  z-index: 100;
}

</style>
