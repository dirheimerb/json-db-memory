// tests/BinarySearchTree.test.ts
import BinarySearchTree, { TreeNode } from '../src/BinarySearchTree';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree;

  beforeEach(() => {
    bst = new BinarySearchTree();
  });

 
 test('insert and get', () => {
    bst.insert('a', 1);
    bst.insert('b', 2);
    bst.insert('c', 3);

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBe(2);
    expect(bst.get('c')).toBe(3);
  });

  test('get non-existing key', () => {
    expect(bst.get('non-existing')).toBeNull();
  });

  test('delete node with no children', () => {
    bst.insert('a', 1);
    bst.insert('b', 2);
    bst.delete('b');

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBeNull();
  });

  test('delete node with one child', () => {
    bst.insert('a', 1);
    bst.insert('b', 2);
    bst.insert('c', 3);
    bst.delete('b');

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBeNull();
    expect(bst.get('c')).toBe(3);
  });

  test('delete node with two children', () => {
    bst.insert('b', 2);
    bst.insert('a', 1);
    bst.insert('c', 3);
    bst.delete('b');

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBeNull();
    expect(bst.get('c')).toBe(3);
  });

  test('delete node with two children and a left subtree', () => {
    bst.insert('d', 4);
    bst.insert('b', 2);
    bst.insert('f', 6);
    bst.insert('a', 1);
    bst.insert('c', 3);
    bst.insert('e', 5);
    bst.insert('g', 7);
    bst.delete('b');

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBeNull();
    expect(bst.get('c')).toBe(3);
    expect(bst.get('d')).toBe(4);
    expect(bst.get('e')).toBe(5);
    expect(bst.get('f')).toBe(6);
    expect(bst.get('g')).toBe(7);
  });


  test('delete non-existing key', () => {
    bst.insert('a', 1);
    bst.insert('b', 2);
    bst.insert('c', 3);
    bst.delete('non-existing');

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBe(2);
    expect(bst.get('c')).toBe(3);
  });
  test('delete root node with two children', () => {
    bst.insert('b', 2);
    bst.insert('a', 1);
    bst.insert('d', 4);
    bst.insert('c', 3);
    bst.insert('e', 5);
    bst.delete('b');

    expect(bst.get('a')).toBe(1);
    expect(bst.get('b')).toBeNull();
    expect(bst.get('c')).toBe(3);
    expect(bst.get('d')).toBe(4);
    expect(bst.get('e')).toBe(5);
  });

  
  test('delete root node with no children', () => {
    bst.insert('a', 1);
    bst.delete('a');

    expect(bst.get('a')).toBeNull();
  });
});
