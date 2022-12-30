<template>
  <ChoroplethChart :chartData="worldTemperatureData" :options="geoChartOption" ref="chart"/>
</template>

<script>
import worldPosition from '@/assets/world_position.json'
import { temperature_index } from '@/js/GlobalTemperatureSeries'
import { ChoroplethChart } from '@/js/ChoroplethChart'
import { topojson } from "chartjs-chart-geo"
import { convertCountryName } from '@/js/CountryNameAdapter'
import * as topojsonSimplify from "topojson-simplify"
const semplified_geometry = topojsonSimplify.simplify(topojsonSimplify.presimplify(worldPosition), 0.9)
const debouncing = 500
export default {
  name: "GlobalWorldTrack",
  components: { ChoroplethChart },
  props: ["value", "temperatureSeries", "year"],
  data () {
    return {
      countries: topojson.feature(semplified_geometry, worldPosition.objects.countries).features,
      width: 0,
      height: 0,
      timeout: null
    }
  },
  mounted() {
    let vm = this
    function adjustSize() {
      if(vm.timeout) { clearTimeout(vm.timeout) }
      vm.timeout = setTimeout(() => {
        try {
          vm.width = vm.$refs.chart.$el.offsetWidth
          vm.height = vm.$refs.chart.$el.offsetHeight
        } catch(e) {
          // Bouncing resize event 
          console.warn("Debounce effect due to resize event")
        }
      }, debouncing)
    }
    window.addEventListener('resize', adjustSize);
    adjustSize()
  },
  unmounted() {
    window.removeEventListener('resize');
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
          annotation: {
            annotations: {
              label1: {
                type: 'label',
                xAdjust: this.width / 2 - 110,
                yAdjust: this.height / 2 - 90,
                color: "white",
                textAlign: "left",
                backgroundColor: 'rgba(0,0,0, 0)',
                content: ['Temperature (°C)'],  
                font: {
                  size: 24
                }
              }
            }
          }
        },
        legend: { display: false, align: "left" },
        scales: {
          xy: {
            projection: 'geoNaturalEarth1',
          },
          color: {
            min: 0,
            max: 30,
            quantize: 0,
            interpolate: "ylOrRd",
            missing: "white",
            legend: {
              position: 'bottom-right',
              align: 'top',
              length: 0.1,
              indicatorWidth: 20,
            }
          },
          legend: { display: false, align: "left" }
        },
      }
    }
  }
}

</script>
<style>
/*canvas[id^="choropleth-chart"] {
  height: 480px !important;
}*/
</style>