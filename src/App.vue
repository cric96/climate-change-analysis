<template>
  <v-app style="background-color: gray">
    <v-main>
      <transition name="slide-fade" mode="out-in">
        <KeepAlive>
            <component :is="currentSection" :value="currentSection" @input="handleInput"></component>
        </KeepAlive>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import TitleSection from './components/TitleSection';
import ChartsSection from './components/ChartsSection.vue';

export default {
  name: 'App',
  components: {
    TitleSection, ChartsSection
  },
  data: () => ({
    currentSection: "TitleSection"
  }),
  methods: {
    handleInput() {
      this.currentSection = "ChartsSection"
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(60px);
  opacity: 0;
}
</style>