<template>
  <q-page>
    <div>
      <h2>User Table</h2>
      <q-select v-model="selectedDesignation" :options="designations" label="Select Designation" />
      <vue-good-table
        :columns="columns"
        :rows="filteredUsers"
        :pagination="pagination"
        :search-options="{ enabled: true }"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import VueGoodTable from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import usersData from 'src/assets/users.json'

export default defineComponent({
  components: {
    'vue-good-table': VueGoodTable
  },
  setup () {
    const users = ref(usersData)
    const designations = ref([...new Set(usersData.map(user => user.designation))])
    const selectedDesignation = ref('')

    const filteredUsers = computed(() => {
      if (selectedDesignation.value) {
        return users.value.filter(user => user.designation === selectedDesignation.value)
      }
      return users.value
    })

    const columns = [
      { label: 'Name', field: 'name' },
      { label: 'Surname', field: 'surname' },
      { label: 'Designation', field: 'designation' },
      { label: 'Department', field: 'department' }
    ]

    const pagination = {
      perPage: 10
    }

    return {
      columns,
      filteredUsers,
      designations,
      selectedDesignation,
      pagination
    }
  }
})
</script>
