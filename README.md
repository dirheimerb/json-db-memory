# JsonDataStore 

A simple key-value store using JSON files for storage and a binary search tree for in-memory data management. The JsonDataStore provides a convenient way to persist data across application runs, while maintaining fast in-memory data access.  This package provides a basic key-value store that persists data to JSON files, making it easy to store and retrieve data in a lightweight, human-readable format.

## Features

- Simple key-value store with basic CRUD operations (set, get, delete)
- In-memory data storage using a binary search tree for efficient data access
- Data persistence using JSON files

## Installation

Install the package using npm:

```bash
npm install json-db-memory
```

## Usage

Here's a basic example of how to use the JsonDataStore:

```typescript
import JsonDataStore from 'json-db-memory';

const store = new JsonDataStore('example');

// Set key-value pairs
store.set('A', 'Alice');
store.set('B', 'Bob');
store.set('C', 'Charlie');
store.set('D', 'David');

// Get values
console.log(store.get('A')); // Output: 'Alice'
console.log(store.get('B')); // Output: 'Bob'
console.log(store.get('C')); // Output: 'Charlie'
console.log(store.get('D')); // Output: 'David'

// Update a value
store.set('A', 'Alicia');
console.log(store.get('A')); // Output: 'Alicia'

// Delete a key-value pair
store.delete('B');
console.log(store.get('B')); // Output: null
```

## API

`new JsonDataStore(fileName: string)`
Creates a new data store instance. The data will be persisted in a JSON file with the provided file name in the data directory.

- fileName: The name of the JSON file to store the data.

`store.set(key: string, value: any)`
Sets a key-value pair in the data store. If the key already exists, the value will be updated.

- key: The key to store the value.
- value: The value to store.

`store.get(key: string): any`
Retrieves the value associated with the provided key. Returns null if the key does not exist.

- key: The key to retrieve the value.
- store.delete(key: string)

`Deletes a key-value pair from the data store.`

- key: The key to delete.

### License

MIT
