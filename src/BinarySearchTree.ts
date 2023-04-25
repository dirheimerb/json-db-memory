// src/BinarySearchTree.ts
export class TreeNode {
  key: string;
  value: any;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  insert(key: string, value: any): void {
    if (this.root === null) {
      this.root = new TreeNode(key, value);
    } else {
      this.insertNode(this.root, key, value);
    }
  }

  private insertNode(node: TreeNode, key: string, value: any): void {
    if (key < node.key) {
      if (node.left === null) {
        node.left = new TreeNode(key, value);
      } else {
        this.insertNode(node.left, key, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TreeNode(key, value);
      } else {
        this.insertNode(node.right, key, value);
      }
    }
  }

  get(key: string): any {
    const node = this.search(this.root, key);
    return node ? node.value : null;
  }

  private search(node: TreeNode | null, key: string): TreeNode | null {
    if (node === null || node.key === key) {
      return node;
    } else if (key < node.key) {
      return this.search(node.left, key);
    } else {
      return this.search(node.right, key);
    }
  }

  delete(key: string): void {
    this.root = this.deleteNode(this.root, key);
  }

  private deleteNode(node: TreeNode | null, key: string): TreeNode | null {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      node.left = this.deleteNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.deleteNode(node.right, key);
      return node;
    } else {
      // Node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with two children
      // Get the inorder successor (smallest in the right subtree)
      const minValueNode = this.minValueNode(node.right);
      node.key = minValueNode.key;
      node.value = minValueNode.value;

      // Delete the inorder successor
      node.right = this.deleteNode(node.right, minValueNode.key);
      return node;
    }
  }

  private minValueNode(node: TreeNode): TreeNode {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}

export default BinarySearchTree;
