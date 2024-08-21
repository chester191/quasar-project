<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="editUser">
      <label>Name:</label>
      <input v-model="editingUser.name" required />
      <label>Surname:</label>
      <input v-model="editingUser.surname" required />
      <label>Designation:</label>
      <input v-model="editingUser.designation" required />
      <label>Department:</label>
      <input v-model="editingUser.department" required />
      <button @click="saveUser()" >Save</button>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getEditingUser } from 'src/utils/icc'
import { updateUser } from 'src/utils/indexeddb'

// Initialize router
const router = useRouter()

const editingUser = computed(() => getEditingUser())

const saveUser = async () => {
  if (editingUser.value) {
    await updateUser(editingUser.value)
    // Navigate back to the user table or show a success message
    router.push('/user-table') // Adjust the path as needed
  }
}

</script>

<style scoped>
/* Add your existing purple styling here */
form {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  width: 100%;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #6200ea;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #3700b3;
}
</style>
