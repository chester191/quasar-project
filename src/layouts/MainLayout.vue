<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Page Container -->
    <q-page-container>
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>
        <q-item
          v-for="link in linksList"
          :key="link.title"
          :to="link.to"
          exact
          tag="router-link"
        >
          <q-item-section>
            <q-item-label>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'pie-chart',
    caption: 'Pie Chart',
    to: '/pie-chart'
  },
  {
    title: 'bar-graph',
    caption: 'Bar Graph',
    to: '/bar-graph'
  },
  {
    title: 'user-table',
    caption: 'User Table',
    to: '/user-table'
  },
  {
    title: 'add-user',
    caption: 'Add User',
    to: '/add-user'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
