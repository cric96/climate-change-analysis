<template>
  <LineChart :chartData="countryTemperatureData" :options="lineChartOptions"/>
</template>

<script>

import { LineChart } from 'vue-chart-3'

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
            data: this.country.temperatures.slice(0, this.year - this.minYear + 1)
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
              max: this.country.maximumTemperature + 1
            },
            x:{
              grid: {
                display: true
              }
            },
          },
          /*
          plugins: {
            autocolors: false,
            annotation: {
              annotations: {
                label1: {
                  type: 'label',
                  xValue: 90,
                  yValue: this.country.minumumTemperature,
                  backgroundColor: 'rgba(245,245,245)',
                  content: ['This is my text', 'This is my text, second line'],
                  font: {
                    size: 18
                  }
                }
              }
            }
          }*/
        }
      }
  }
}
</script>