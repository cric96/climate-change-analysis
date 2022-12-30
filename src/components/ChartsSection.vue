<template>
  <v-container fluid class="pt-8 px-8">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="col-12" dark height="78px">
          <h2 class="text-center text-md-h3 text-h3 w-100 font-weight-black">Year: <span :class=level>{{year}}</span></h2>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="col-12 py-5" dark height="78px">
          <v-slider
              hide-details
              dark
              v-model="year"
              :min="this.temperatureSeries.minYear"
              :max="this.temperatureSeries.maxYear"
              :prepend-icon="this.icon"
              @click:prepend="simulate"
          ></v-slider>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="halfpage">
      <v-col col-6>
        <v-card class="col-12" height="" dark>
          <v-card-title color="primary" class="mb-4">
            <h1 class="text-center text-xl-h3 text-h4 w-100 text-uppercase">Average temperature map</h1> 
            <h2 class="text-center text-xl-h4 text-headline text-h4 w-100 font-weight-black" style="color: #1e1e1e">.</h2>
          </v-card-title>
          <GlobalWorldTrack :temperatureSeries="temperatureSeries" v-model="selectedCountryName" :year="year"/>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card class="col-12" height="" dark>
          <v-card-title class="mb-4">
            <h1 class="text-center text-xl-h3 text-h4  w-100 text-uppercase">Temperature Increase Rank </h1>
            <h2 class="text-center text-xl-h4 text-headline text-h4 w-100 font-weight-black">The Hottest Countries</h2>
          </v-card-title>
          <RankTrack :year="year"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" lg="12">
        <v-card class="col-12" dark>
          <v-card-title class="text-center mb-4">
            <h1 class="text-center text-xl-h3 text-h4  w-100 text-uppercase">Average temperature</h1>
            <h2 class="text-center text-xl-h4 text-headline text-h4 w-100 font-weight-black">Country: <span class="font-weight-bold">{{selectedCountryName}}</span></h2>
          </v-card-title>
          <CountryTrack :country="selectedCountry" :year="year" :maxYear="temperatureSeries.maxYear" :minYear="temperatureSeries.minYear"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import temperature from '@/assets/global_temperature.json'
  import minMaxTemperature from '@/assets/min_max_for_each_country.json'
  import Country from '@/js/Country'
  import { GlobalTemperatureSeries, temperature_index } from '@/js/GlobalTemperatureSeries'
  import CountryTrack from './CountryTrack'
  import GlobalWorldTrack from './GlobalWorldTrack'
  import RankTrack from './RankTrack.vue'
  import { convertCountryName } from '@/js/CountryNameAdapter'
  export default {
    name: 'ChartsSection',
    components: { GlobalWorldTrack, CountryTrack, RankTrack },
    data: () => ({
      interval: 250,
      timer: null,
      icon: "mdi-play",
      year: 1901,
      chart: null,
      selectedCountryName: "Italy",
      temperatureSeries: new GlobalTemperatureSeries(temperature),
    }),
    computed: {
      level() {
        let value = Math.floor((2013 - this.year) / 20)
        return "font-weight-black red--text text--lighten-" + value
      },
      selectedDataYear() { return this.temperatureSeries.temperature[this.year] },
      selectedCountry() {
        let countryName = convertCountryName(this.selectedCountryName)
        let years = [...Array(this.temperatureSeries.maxYear - this.temperatureSeries.minYear + 1).keys()].map(year => year + this.temperatureSeries.minYear)
        let dataset = years
          .map(year => this.temperatureSeries.temperature[year][countryName])
          .map(temperature => temperature == undefined ? temperature : temperature[temperature_index])
        return new Country(countryName, dataset, Math.floor(minMaxTemperature[countryName].min), Math.ceil(minMaxTemperature[countryName].max))
      },
    },
    methods: {
      simulate() {
        if(this.timer == null) {
          this.icon = "mdi-pause";
          this.timer = setInterval(() => {
            if(this.year < this.temperatureSeries.maxYear) {
              this.year += 1;
            } else {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, this.interval);
        } else {
          this.icon = "mdi-play";
          clearInterval(this.timer);
          this.timer = null;
        }
      },
    },
  }
</script>

<style>
.halfpage {
  height: 50%;
}
.w-100 {
  width: 100%;
}
</style>