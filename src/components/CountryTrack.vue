<template>
  <LineChart :chartData="countryTemperatureData" :options="lineChartOptions"/>
</template>

<script>
import * as d3 from 'd3-scale-chromatic'
import { LineChart } from 'vue-chart-3'
const max_value = 30
export default {
  name: "CountryTrack",
  components: { LineChart },
  props: ["country", "year", "maxYear", "minYear"],
  computed: {
    countryTemperatureData() {
      return {
          labels: [...Array(this.maxYear - this.minYear + 1).keys()].map(year => parseInt(year) + parseInt(this.minYear)),
          datasets: [{
            tension: 0.5,
            label: this.country.countryName,
            data: this.country.temperatures.slice(0, this.year - this.minYear + 1),
            borderColor: 'rgb(75, 192, 192)',
            segment: {
              borderColor: (ctx) => d3.interpolateOrRd(ctx.p0.parsed.y / max_value)
            },
          }]
      }
    },
    lineChartOptions() {
        return {
          elements: {
              point:{
                  radius: 0
              }
          },
          animation: {
            duration: 0
          },
          responsive: true,
          scales: {
            y: {
              grid: {
                display: true
              },
              min: this.country.minumumTemperature -1,
              max: this.country.maximumTemperature + 1,
              title: {
                display: true,
                text: "Temperature (°C)"
              }
            },
            x:{
              grid: {
                display: true
              },
              title: {
                display: true,
                text: "Year"
              }
            },
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }
  }
}
</script>