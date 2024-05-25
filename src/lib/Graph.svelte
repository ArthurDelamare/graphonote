<script lang="ts">
  import Graph from "graphology";
  import { random } from "graphology-layout";
  import Sigma from "sigma";
  //   import type { NodeDisplayData } from "sigma/types";
  import { onMount } from "svelte";

  let container: HTMLElement;

  onMount(() => {
    // Create a graph and assign nodes with random positions
    const graph = new Graph();
    graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
    graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
    for (let i = 3; i < 10; i++) {
      graph.addNode(`${i}`, { label: `Node ${i}`, size: 15, color: "red" });
    }
    random.assign(graph);

    // Render the graph - binded on its container
    const renderer = new Sigma(graph, container);

    // Create node on click
    renderer.addListener("clickStage", ({ event }) => {
      const coordForGraph = renderer.viewportToGraph({ x: event.x, y: event.y });
      graph.addNode(Math.random() * 100 + event.x + event.y, {
        ...coordForGraph,
        size: 10,
        color: "red",
      });
    });

    // sigmaInstance.setSetting("nodeReducer", (node, data) => {
    //   const res: Partial<NodeDisplayData> = { ...data };
    //   if (node === "1") {
    //     res.color = "#BDBDBD";
    //   }
    //   return res;
    // });
  });
</script>

<div id="graph-container" bind:this={container} class="container"></div>

<style>
  .container {
    height: 100%;
    width: 100%;
  }
</style>
