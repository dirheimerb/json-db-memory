import JsonDataStore from '../src/index';

const store = new JsonDataStore('example');

store.set('key', 'value');
console.log(store.get('key'));
store.delete('key');

// Set key-value pairs
store.set('C', 'Charlie');
store.set('A', 'Alice');
store.set('B', 'Bob');
store.set('D', 'David');

// Get values
console.log(store.get('A')); // Output: 'Alice'
console.log(store.get('B')); // Output: 'Bob'
console.log(store.get('C')); // Output: 'Charlie'
console.log(store.get('D')); // Output: 'David'