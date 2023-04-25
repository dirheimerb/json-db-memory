// src/index.ts
import * as fs from 'fs';
import * as path from 'path';
import BinarySearchTree, { TreeNode } from './BinarySearchTree';

/**
 * @example
 * import JsonDataStore from './index';
 * const store = new JsonDataStore('example');
 * Set key-value pairs
 * store.set('C', 'Charlie');
 * store.set('A', 'Alice');
 * store.set('B', 'Bob');
 * store.set('D', 'David');
 * Get values
 * console.log(store.get('A')); // Output: 'Alice'
 * console.log(store.get('B')); // Output: 'Bob'
 * console.log(store.get('C')); // Output: 'Charlie'
 * console.log(store.get('D')); // Output: 'David'
 */
class JsonDataStore {
  private data: Map<string, any>;
  private tree: BinarySearchTree;
  private filePath: string;

  constructor(fileName: string) {
    const dataDir = path.join(__dirname, '..', 'data');
    this.ensureDirectoryExists(dataDir);
    this.filePath = path.join(dataDir, `${fileName}.json`);
    this.tree = this.initTree();
    this.data = this.treeToMap(this.tree);
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private initTree(): BinarySearchTree {
    const bst = new BinarySearchTree();
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      for (const [key, value] of Object.entries(jsonData)) {
        bst.insert(key, value);
      }
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // If the file does not exist, use an empty BinarySearchTree.
      } else {
        throw error;
      }
    }
    return bst;
  }

  private treeToMap(bst: BinarySearchTree): Map<string, any> {
    const map = new Map<string, any>();
    this.inOrderTraversal(bst.root, (node) => {
      map.set(node.key, node.value);
    });
    return map;
  }

  private bstToJson(bst: BinarySearchTree): Record<string, any> {
    const obj: Record<string, any> = {};
    this.inOrderTraversal(bst.root, (node) => {
      obj[node.key] = node.value;
    });
    return obj;
  }

  private inOrderTraversal(
    node: TreeNode | null,
    callback: (node: TreeNode) => void
  ): void {
    if (node !== null) {
      this.inOrderTraversal(node.left, callback);
      callback(node);
      this.inOrderTraversal(node.right, callback);
    }
  }

  public get(key: string): any {
    return this.data.get(key);
  }

  public set(key: string, value: any): void {
    this.data.set(key, value);
    this.tree.insert(key, value);
    this.save();
  }

  public delete(key: string): void {
    this.data.delete(key);
    this.tree.delete(key);
    this.save();
  }

  private save(): void {
    const jsonData = this.bstToJson(this.tree);
    fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2));
  }
}

export default JsonDataStore;
