<template>
  <v-container>
    <v-row class="fill-height">
      <v-col cols="7">
      <ChoroplethChart :chartData="worldTemperatureData" :options="geoChartOption"/>
      </v-col>
    </v-row>
    <v-row class="text-center">
      
      <v-col cols="5">
        {{selectedCountryName}}
        <CountryTrack :country="selectedCountry" :year="year" :maxYear="maxYear" :minYear="minYear"/>
      </v-col>
    </v-row>
    {{year}}
    <v-row>
      <v-slider
          v-model="year"
          :min="this.minYear"
          :max="this.maxYear"
          :prepend-icon="this.icon"
          @click:prepend="simulate"
      ></v-slider>
    </v-row>
  </v-container>
</template>

<script>
  import worldPosition from '../assets/world_position.json'
  import temperature from '../assets/global_temperature.json'
  import minMaxTemperature from '../assets/min_max_for_each_country.json'
  import Country from '../js/Country'
  import CountryTrack from './CountryTrack'
  import { topojson } from "chartjs-chart-geo"
  import * as topojsonSimplify from "topojson-simplify";
  import { ChoroplethChart } from '../js/ChoroplethChart'

  const temperature_index = 0
  const semplified_geometry = topojsonSimplify.simplify(topojsonSimplify.presimplify(worldPosition), 0.9)
  export default {
    name: 'ChartsSection',
    components: { ChoroplethChart, CountryTrack },

    data: () => ({
      interval: 250,
      timer: null,
      icon: "mdi-play",
      year: 1900,
      chart: null,
      selectedCountryName: "Italy",
      temperature: temperature,
      countries: topojson.feature(semplified_geometry, worldPosition.objects.countries).features
    }),
    computed: {
      selectedDataYear() { return temperature[this.year] },
      minYear() { return Math.min(...Object.keys(this.temperature))},
      maxYear() { return Math.max(...Object.keys(this.temperature))},
      selectedCountry() {
        let countryName = this.convertCountryName(this.selectedCountryName)
        let years = [...Array(this.maxYear - this.minYear + 1).keys()].map(year => year + this.minYear)
        let dataset = years
          .map(year => this.temperature[year][countryName])
          .map(temperature => temperature == undefined ? temperature : temperature[temperature_index])
        return new Country(countryName, dataset, Math.floor(minMaxTemperature[countryName].min), Math.ceil(minMaxTemperature[countryName].max))
      },
      worldTemperatureLabels() {
        return this.countries.map((d) => d.properties.name) 
      },
      worldTemperatureData() {
        return {
          labels: this.worldTemperatureLabels,
          datasets: [{
            label: 'Countries',
            data: this.countries.map((d) => {
              let suggestedValue = this.selectedDataYear[this.convertCountryName(d.properties.name)]
              if(suggestedValue == undefined) { suggestedValue = undefined } else { suggestedValue = suggestedValue[temperature_index] }
              return ({feature: d, value: parseFloat(suggestedValue)})
            }),
          }]
        }
      },

      geoChartOption() {
        let vm = this
        return {
          onClick: function(event, chartElements){
            vm.selectedCountryName = chartElements[0].element.feature.properties.name;
          },
          showOutline: false,
          showGraticule: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xy: {
              projection: 'geoNaturalEarth1',
            },
            color: {
              min: 0,
              max: 30,
              interpolate: "ylOrRd",
              missing: "white"
            },
            legend: { display: false, }
          },
        }
      }
    },
    methods: {
      simulate() {
        if(this.timer == null) {
          this.icon = "mdi-pause";
          this.timer = setInterval(() => {
            if(this.year < this.maxYear) {
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
      convertCountryName(name) {
        switch(name){
          case "Dem. Rep. Congo":
            return "Congo"
          case "United States of America":
            return "United States"
          case "Central African Rep.":
            return "Central African Republic"
          case "S. Sudan":
            return "Central African Republic"
          case "Antarctica":
            return "French Southern And Antarctic Lands"
          case "Czechia":
            return "Czech Republic"
          default:
            return name
        }
      }   
    },
  }
</script>