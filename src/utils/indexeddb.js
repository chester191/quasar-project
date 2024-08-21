import users from './users.json'

const dbName = 'UserDatabase'
const dbVersion = 1
const storeName = 'users'

let db

const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('surname', 'surname', { unique: false })
      objectStore.createIndex('designation', 'designation', { unique: false })
      objectStore.createIndex('department', 'department', { unique: false })
    }

    request.onsuccess = (event) => {
      db = event.target.result
      resolve(db)
    }

    request.onerror = (event) => {
      reject(event.target.error)
    }
  })
}

const serialize = (value) => {
  if (typeof value === 'function') {
    return value.toString()
  }
  if (typeof value === 'object') {
    const serializeObject = {}
    for (const [objectKey, objectValue] of Object.entries(value)) {
      serializeObject[objectKey] = serialize(objectValue)
    }
    return serializeObject
  }
  return value
}

const initializeDatabase = async () => {
  try {
    const db = await openDb()
    const transaction = db.transaction(storeName, 'readonly')
    const objectStore = transaction.objectStore(storeName)
    const countRequest = objectStore.count()

    countRequest.onsuccess = async () => {
      const recordCount = countRequest.result

      if (recordCount === 0) {
        // Use imported JSON data
        console.log('Imported users:', users)

        // Populate IndexedDB
        const populateTransaction = db.transaction(storeName, 'readwrite')
        const populateObjectStore = populateTransaction.objectStore(storeName)

        users.forEach(user => {
          const serializedUser = serialize(user)
          const request = populateObjectStore.add(serializedUser)
          request.onsuccess = () => console.log('User added:', user)
          request.onerror = () => console.error('Error adding user:', request.error)
        })

        console.log('Database populated with initial data.')
      }
    }

    countRequest.onerror = () => {
      console.error('Error counting records in the object store:', countRequest.error)
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

export const addUser = async (user) => {
  try {
    const usr = serialize(user)
    const db = await openDb()
    const transaction = db.transaction(storeName, 'readwrite')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.add(usr)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Error adding user:', error)
  }
}

export const getUser = async (id) => {
  try {
    const db = await openDb()
    const transaction = db.transaction(storeName, 'readonly')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.get(id)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Error getting user:', error)
  }
}

export const updateUser = async (user) => {
  try {
    const usr = serialize(user)
    const db = await openDb()
    const transaction = db.transaction(storeName, 'readwrite')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.put(usr)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

export const deleteUser = async (id) => {
  try {
    const db = await openDb()
    const transaction = db.transaction(storeName, 'readwrite')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.delete(id)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

export const getAllUsers = async () => {
  try {
    const db = await openDb()
    const transaction = db.transaction(storeName, 'readonly')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('Error getting all users:', error)
  }
}

// Initialize the database when the module is loaded
initializeDatabase()
