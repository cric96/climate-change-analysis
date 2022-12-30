<template>
  <BarChart :chartData="barChartData" :options="barChartOptions"/>
</template>

<script>
import { BarChart } from 'vue-chart-3'
import rank from '@/assets/rank.json'
import * as d3 from 'd3-scale-chromatic'

document.foo = rank
const max_value = 5
const elements = 10
const max_string_length = 15
export default {
  components: { BarChart },
  props: [ "year" ],
  computed: {
    labels() { return rank[this.year].slice(0, elements).map(country => country[1]) },
    barChartData() {
      return  { 
        labels: this.labels,
        datasets: [ { 
          data: rank[this.year].slice(0, elements).map(country => country[0]),
          backgroundColor: rank[this.year].slice(0, elements).map(country => d3.interpolateYlOrRd(country[0] / max_value)),
        }]
       }
    },
    barChartOptions() {
      return {
        maintainAspectRatio: true,
        responsive: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            min: 0,
            max: max_value,
            title: {
              display: true,
              text: 'Delta Temperature (°C)'
            },
            ticks: {
              callback: (label) => {
                return "+" + label
              }
            }
          },
          y: {
            ticks: {
              callback: (label) => {
                return this.labels[label].length > max_string_length ? this.labels[label].substr(0, max_string_length) + '...' : this.labels[label];
              }
            },
            title: {
              display: true,
              text: 'Country'
            }
            
          }
        }
      }
    }    
  }
}
</script>