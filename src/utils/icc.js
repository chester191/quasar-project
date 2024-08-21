import { ref } from 'vue'

// Reactive reference to store the currently editing user
const editingUser = ref(null)

// Function to set the editing user
export const setEditingUser = (user) => {
  editingUser.value = user
}

// Function to get the current editing user
export const getEditingUser = () => {
  return editingUser.value
}
