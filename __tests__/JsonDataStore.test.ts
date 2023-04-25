// src/JsonDataStore.test.ts
import * as fs from 'fs';
import JsonDataStore from '../src/index';

const testFileName = 'test-data-store';

const createTestInstance = (): JsonDataStore => {
  return new JsonDataStore(testFileName);
};

const deleteTestFile = (): void => {
  const filePath = `./data/${testFileName}.json`;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

describe('JsonDataStore', () => {
  afterEach(() => {
    deleteTestFile();
  });

  test('should initialize an empty store when the file does not exist', () => {
    const store = createTestInstance();
    expect(store.get('key')).toBeUndefined();
  });

  test('should set and get data correctly', () => {
    const store = createTestInstance();
    store.set('key', 'value');
    expect(store.get('key')).toBe('value');
  });

  test('should delete data correctly', () => {
    const store = createTestInstance();
    store.set('key', 'value');
    expect(store.get('key')).toBe('value');
    store.delete('key');
    expect(store.get('key')).toBeUndefined();
  });

  test('should persist data between instances', () => {
    const store1 = createTestInstance();
    store1.set('key', 'value');
    const store2 = createTestInstance();
    expect(store2.get('key')).toBe('value');
  });
});
// src/JsonDataStore.test.ts
// import fs from 'fs';
// import path from 'path';
// import JsonDataStore from '../src/index';

// const dataFileName = 'testData';

// const getTestFilePath = () => path.join('./testData.json');

// const deleteTestFile = () => {
//   try {
//     fs.unlinkSync(getTestFilePath());
//   } catch (error: any) {
//     if (error.code !== 'ENOENT') {
//       throw error;
//     }
//   }
// };

// beforeEach(() => {
//   deleteTestFile();
// });

// afterAll(() => {
//   deleteTestFile();
// });

// describe('JsonDataStore', () => {
//   test('get, set and delete methods', () => {
//     const store = new JsonDataStore(dataFileName);

//     expect(store.get('key1')).toBeUndefined();

//     store.set('key1', 'value1');
//     expect(store.get('key1')).toBe('value1');

//     store.delete('key1');
//     expect(store.get('key1')).toBeUndefined();
//   });

//   test('persistence between instances', () => {
//     const store1 = new JsonDataStore(dataFileName);
//     store1.set('key1', 'value1');

//     const store2 = new JsonDataStore(dataFileName);
//     expect(store2.get('key1')).toBe('value1');
//   });
// });
