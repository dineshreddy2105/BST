import { useState } from "react";
import TreeVisualizer from "./components/TreeVisualizer";
import { createBinaryTreeData, insertNode, searchNode } from "./utils";
import { Container, Typography, Button, TextField, Paper } from "@mui/material";

const App = () => {
  const [tree, setTree] = useState(null); // Initialize with an empty tree
  const [inputValue, setInputValue] = useState("");
  const [foundNode, setFoundNode] = useState(null);

  // Handle node insertion
  const handleInsert = () => {
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue)) {
      setTree((prevTree) => insertNode(prevTree, newValue));
      setInputValue(""); // Clear input field after insertion
    } else {
      alert("Please enter a valid number.");
    }
  };

  // Handle node search
  const handleSearch = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      const result = searchNode(tree, value);
      setFoundNode(result);
    } else {
      alert("Please enter a valid number.");
    }
  };

  // Convert tree to format suitable for TreeVisualizer
  const treeData = createBinaryTreeData(tree);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Binary Tree Visualizer
      </Typography>
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Insert/Search a Node:</Typography>
        <TextField
          label="Value"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleInsert}>
          Insert
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearch}
          style={{ marginLeft: "10px" }}
        >
          Search
        </Button>
      </Paper>
      <TreeVisualizer treeData={treeData} />
      {foundNode && (
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Node {foundNode.value} found!
        </Typography>
      )}
    </Container>
  );
};

export default App;
