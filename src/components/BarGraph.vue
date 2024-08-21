<template>
  <div>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import barGraphData from 'src/assets/barGraph.json'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Bar
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
            text: 'Number of Installs per Month'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Installs'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
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
      if (barGraphData && barGraphData.length) {
        const labels = barGraphData.map(data => data.month)
        const data = barGraphData.map(data => data.numInstalls)

        this.chartData = {
          labels,
          datasets: [
            {
              label: 'Number of Installs',
              backgroundColor: '#f87979',
              data
            }
          ]
        }
      }
    }
  }
}
</script>
<style scoped>
.bar-graph-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
  font-weight: 500;
}
</style>
