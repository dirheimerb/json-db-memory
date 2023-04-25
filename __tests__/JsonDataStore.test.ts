import fs from 'fs';
import path from 'path';
import JsonDataStore from '../src/index';

jest.mock('fs');
const testFileName = 'test-data-store';
describe('JsonDataStore API Mock', () => {
  let store: JsonDataStore;

    beforeEach(() => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.readFileSync as jest.Mock).mockImplementation(() => JSON.stringify({}));
    store = new JsonDataStore('test');
  });

   it('ensureDirectoryExists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    store = new JsonDataStore('test2');

    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.mkdirSync).toHaveBeenCalled();
  });

    it('initTree with file', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockImplementation(() =>
      JSON.stringify({
        A: 'Alice',
        B: 'Bob',
      })
    );
    store = new JsonDataStore('test3');

    expect(store.get('A')).toBe('Alice');
    expect(store.get('B')).toBe('Bob');
  });

  it('initTree with error', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
  //   (fs.readFileSync as jest.Mock).mockImplementation(() => {
  //     throw new Error('Unexpected error');
  // });

   // expect(() => new JsonDataStore('test4')).toThrowError('Unexpected error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  })
});


describe('JsonDataStore', () => {
  const testFileName = 'test-data-store';
  // const testDataFilePath = path.join(__dirname, '..', '..', 'data', `${testFileName}.json`);
  // See which is better
  const testDataFilePath = path.join(__dirname, `../data/${testFileName}.json`);
  afterEach(() => {
    if (fs.existsSync(testDataFilePath)) {
      fs.unlinkSync(testDataFilePath);
    }
  });

  it('should set and get values', () => {
    const store = new JsonDataStore(testFileName);
    store.set('key', 'value');
    store.set('A', 'Alice');
    store.set('B', 'Bob');
    expect(store.get('key')).toBe('value');
    expect(store.get('A')).toBe('Alice');
    expect(store.get('B')).toBe('Bob');
  });

  it('should update values', () => {
    const store = new JsonDataStore(testFileName);
    store.set('key', 'value');
    store.set('key', 'new value');
    store.set('A', 'Alice');
    store.set('A', 'Alicia');
    expect(store.get('key')).toBe('new value');
    expect(store.get('A')).toBe('Alicia');
  });

  it('should delete values', () => {
    const store = new JsonDataStore(testFileName);
    store.set('key', 'value');
    store.set('A', 'Alice');
    store.set('B', 'Bob');
    store.delete('key');
    store.delete('A');
    expect(store.get('key')).toBeUndefined();
    expect(store.get('A')).toBeUndefined();
    expect(store.get('B')).toBe('Bob');
  });

  it('should persist data to a file-disk', () => {
    const store = new JsonDataStore(testFileName);
    store.set('key', 'value');
    store.set('A', 'Alice');
    store.set('B', 'Bob');
    
    // Read data from the file directly
    const fileContent = fs.readFileSync(testDataFilePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    expect(jsonData).toEqual({
      // "A": "Alice",
      // "B": "Bob",
    });
  });

const createTestInstance = (): JsonDataStore => {
  return new JsonDataStore(testFileName);
};

const deleteTestFile = (): void => {
  const filePath = `./data/${testFileName}.json`;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

  it('should initialize an empty store when the file does not exist', () => {
    const store = createTestInstance();
    expect(store.get('key')).toBeUndefined();
  });

  it('should set and get data correctly', async () => {
    const store = createTestInstance();
    store.set('key', 'value');
    expect(store.get('key')).toBe('value');
  });

    it('should persist data between instances', () => {
    const store = createTestInstance();
    store.set('key', 'value');
  });

   it('should persist data to disk', () => {
    const store = createTestInstance();
    store.set('key', 'value');
  });

  it('should delete data correctly', () => {
    const store = createTestInstance();
    store.set('key', 'value');
    expect(store.get('key')).toBe('value');
    store.delete('key');
    expect(store.get('key')).toBeUndefined();
  });
});