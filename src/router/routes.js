import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import PieChartPage from 'pages/PieChartPage.vue'
import BarGraphPage from 'pages/BarGraphPage.vue'
import UserTablePage from 'pages/UserTablePage.vue'
import AddUser from 'pages/AddUser.vue'
import EditUser from 'pages/EditUser.vue'
import ErrorNotFound from 'pages/ErrorNotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: 'bar-graph', component: BarGraphPage },
      { path: 'pie-chart', component: PieChartPage },
      { path: 'user-table', component: UserTablePage },
      { path: 'add-user', component: AddUser },
      { path: 'edit-user', component: EditUser }
    ]
  },
  // Always leave this as last one, but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound
  }
]

export default routes
