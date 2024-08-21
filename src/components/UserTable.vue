<template>
  <div>
    <input v-model="searchQuery" placeholder="Search users..." />

    <select v-model="selectedDesignation">
      <option value="">All Designations</option>
      <option v-for="designation in uniqueDesignations" :key="designation" :value="designation">
        {{ designation }}
      </option>
    </select>

    <button @click="navigateToAddUser">Add User</button>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.name + user.surname">
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.designation }}</td>
          <td>{{ user.department }}</td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="onDeleteUser(user)">Delete</button>

          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllUsers, deleteUser } from 'src/utils/indexeddb'
import { setEditingUser } from 'src/utils/icc'

const searchQuery = ref('')
const selectedDesignation = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const users = ref([])
const router = useRouter()

onMounted(async () => {
  users.value = await getAllUsers()
})

const filteredUsers = computed(() => {
  let filtered = users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  if (selectedDesignation.value) {
    filtered = filtered.filter(user => user.designation === selectedDesignation.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

const uniqueDesignations = computed(() => {
  const designations = users.value.map(user => user.designation)
  return [...new Set(designations)]
})

const navigateToAddUser = () => {
  router.push('/add-user')
}

const editUser = (user) => {
  setEditingUser(user)
  router.push({ path: '/edit-user' })
}

const onDeleteUser = async (user) => {
  await deleteUser(user.id)
  users.value = await getAllUsers()
}
</script>

<style scoped>
input, select {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

button {
  margin: 5px;
  padding: 8px 12px;
  border: none;
  background-color: #6a1b9a; /* Purple background */
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:disabled {
  background-color: #9c27b0; /* Lighter purple for disabled state */
}

button:hover:not(:disabled) {
  background-color: #4a148c; /* Darker purple on hover */
}
</style>
