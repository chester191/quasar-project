<template>
  <div class="add-user">
    <h2>Add New User</h2>
    <form @submit.prevent="addUser">
      <div>
        <label for="name">Name:</label>
        <input v-model="newUser.name" id="name" required />
      </div>
      <div>
        <label for="surname">Surname:</label>
        <input v-model="newUser.surname" id="surname" required />
      </div>
      <div>
        <label for="designation">Designation:</label>
        <input v-model="newUser.designation" id="designation" required />
      </div>
      <div>
        <label for="department">Department:</label>
        <input v-model="newUser.department" id="department" required />
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addUser as addUserToDb } from 'src/utils/indexeddb'
import { useRouter } from 'vue-router'

const router = useRouter()

// Define the new user object with reactive properties
const newUser = ref({
  name: '',
  surname: '',
  designation: '',
  department: ''
})

// Function to add the new user to IndexedDB
const addUser = async () => {
  try {
    await addUserToDb(newUser.value)
    alert('User added successfully!')
    // resetForm()
    router.push('/user-table') // Adjust the path as needed to redirect after adding
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to add user. Please try again.')
  }
}

// Function to reset the form fields
// const resetForm = () => {
//   newUser.value = {
//     name: '',
//     surname: '',
//     designation: '',
//     department: ''
//   }
// }
// </script>

<style scoped>
.add-user {
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
