import Chart from 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation'
// register controller in chart.js and ensure the defaults are set
Chart.register(annotationPlugin)
Chart.defaults.font.size = 20;
Chart.defaults.font.family = 'Roboto';
Chart.defaults.color = '#FFF';