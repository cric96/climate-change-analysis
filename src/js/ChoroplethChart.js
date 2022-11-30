import { defineChartComponent } from 'vue-chart-3'
import { Chart } from 'chart.js'
import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo'

Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale)

export const ChoroplethChart = defineChartComponent('choropleth-chart', 'choropleth')