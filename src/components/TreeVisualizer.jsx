import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

// Styled Paper component for tree visualization
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
}));

const TreeVisualizer = ({ treeData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!treeData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const margin = { top: 40, right: 120, bottom: 40, left: 120 };

    const treeLayout = d3
      .tree()
      .size([
        height - margin.top - margin.bottom,
        width - margin.left - margin.right,
      ]);
    const root = d3.hierarchy(treeData);
    treeLayout(root);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        const sourceX = d.source.x;
        const sourceY = d.source.y;
        const targetX = d.target.x;
        const targetY = d.target.y;
        return `M${sourceX},${sourceY}
                C${sourceX},${(sourceY + targetY) / 2}
                ${targetX},${(sourceY + targetY) / 2}
                ${targetX},${targetY}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#7D4C6F")
      .attr("stroke-width", 2);

    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", 12)
      .attr("fill", "#FFC107")
      .attr("stroke", "#FF5722")
      .attr("stroke-width", 2);

    node
      .append("text")
      .attr("dy", 4)
      .attr("x", (d) => (d.children ? -15 : 15))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text((d) => d.data.name);
  }, [treeData]);

  return (
    <StyledPaper elevation={3}>
      <svg ref={svgRef} width="100%" height="600px"></svg>
    </StyledPaper>
  );
};

export default TreeVisualizer;
