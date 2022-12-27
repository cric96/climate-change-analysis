<template>
  <v-container fluid class="pt-8 px-8">
    <v-row class="halfpage">
      <v-col style="height: 100%;" col-12>
        <v-card style="height: 100%;" class="col-12" color="secondary" dark>
          <v-card-title color="primary" class="mb-4"><h1>{{ year }}</h1></v-card-title>
          <GlobalWorldTrack :temperatureSeries="temperatureSeries" v-model="selectedCountryName" :year="year"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col col-12>
        <v-card class="col-12" color="secondary" dark>
          <v-card-title class="mb-4"><h1>{{selectedCountryName}}</h1></v-card-title>
          <CountryTrack :country="selectedCountry" :year="year" :maxYear="temperatureSeries.maxYear" :minYear="temperatureSeries.minYear"/>
        </v-card>
      </v-col>
      <v-col col-12>
        <v-card class="col-12" color="secondary" dark>
          <v-card-title class="mb-4"><h1>Worst increase</h1></v-card-title>
          <RankTrack :year="year"/>
        </v-card>
      </v-col>
      
    </v-row>
    <v-row>
      <v-col col-12>
        <v-card class="col-12" color="secondary">
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
      year: 1900,
      chart: null,
      selectedCountryName: "Italy",
      temperatureSeries: new GlobalTemperatureSeries(temperature),
    }),
    computed: {
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
</style>