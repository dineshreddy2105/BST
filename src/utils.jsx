// Converts the binary tree to a format suitable for visualization
export const createBinaryTreeData = (root) => {
  return convertToHierarchy(root);
};

// Helper function to convert binary tree node to D3 hierarchy format
const convertToHierarchy = (node) => {
  if (!node) return null;
  return {
    name: node.value,
    children: [
      convertToHierarchy(node.left),
      convertToHierarchy(node.right),
    ].filter(Boolean), // Remove null children
  };
};

// Inserts a new value into the binary search tree
export const insertNode = (root, value) => {
  if (!root) {
    return { value, left: null, right: null };
  }

  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else if (value > root.value) {
    root.right = insertNode(root.right, value);
  }
  return root;
};

// Searches for a value in the binary search tree
export const searchNode = (root, value) => {
  if (!root) return null;
  if (root.value === value) return root;
  if (value < root.value) return searchNode(root.left, value);
  return searchNode(root.right, value);
};
