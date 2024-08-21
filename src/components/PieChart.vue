<template>
  <div>
    <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import pieChartData from 'src/assets/pieChart.json'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  components: {
    Pie
  },
  data () {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Number of Installs per Year'
          }
        }
      }
    }
  },
  created () {
    this.initializeChartData()
  },
  methods: {
    initializeChartData () {
      if (pieChartData && pieChartData.length) {
        const labels = pieChartData.map(data => data.year)
        const data = pieChartData.map(data => data.numInstalls)

        this.chartData = {
          labels,
          datasets: [
            {
              label: 'Number of Installs',
              backgroundColor: ['#f87979', '#a29bfe', '#ffeaa7', '#00cec9'],
              data
            }
          ]
        }
      }
    }
  }
}
</script>
