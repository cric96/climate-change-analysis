<template>
  <ChoroplethChart :chartData="worldTemperatureData" :options="geoChartOption"/>
</template>

<script>
import worldPosition from '@/assets/world_position.json'
import { temperature_index } from '@/js/GlobalTemperatureSeries'
import { ChoroplethChart } from '@/js/ChoroplethChart'
import { topojson } from "chartjs-chart-geo"
import { convertCountryName } from '@/js/CountryNameAdapter'
import * as topojsonSimplify from "topojson-simplify"
const semplified_geometry = topojsonSimplify.simplify(topojsonSimplify.presimplify(worldPosition), 0.9)

export default {
  name: "GlobalWorldTrack",
  components: { ChoroplethChart },
  props: ["value", "temperatureSeries", "year"],
  data () {
    return {
      countries: topojson.feature(semplified_geometry, worldPosition.objects.countries).features,
    }
  },
  computed: {
    selectedDataYear() { return this.temperatureSeries.temperature[this.year] },
    worldTemperatureLabels() { return this.countries.map((d) => d.properties.name) },
    worldTemperatureData() {
      return {
        labels: this.worldTemperatureLabels,
        selectedDataYear() { return this.temperatureSeries.temperature[this.year] },
        datasets: [{
          label: 'Countries',
          data: this.countries.map((d) => {
            let suggestedValue = this.selectedDataYear[convertCountryName(d.properties.name)]
            if(suggestedValue == undefined) { suggestedValue = undefined } else { suggestedValue = suggestedValue[temperature_index] }
            return ({feature: d, value: parseFloat(suggestedValue)})
          }),
        }]
      }
    },
    geoChartOption() {
      let vm = this
      return {
        maintainAspectRatio: false,
        onClick: function(event, chartElements){
          vm.$emit('input', chartElements[0].element.feature.properties.name)
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
  }
}

</script>
<style>
canvas[id^="choropleth-chart"] {
  height: 40vh !important;
}
</style>