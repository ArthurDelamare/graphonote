<script lang="ts">
  import Graph from "graphology";
  import Sigma from "sigma";
  import { onMount } from "svelte";

  let container: HTMLElement;

  onMount(() => {
    const graph = new Graph();
    graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
    graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
    graph.addEdge("1", "2", { size: 5, color: "purple" });

    // Instantiate sigma.js and render the graph
    const sigmaInstance = new Sigma(graph, container);
  });
</script>

<div id="graph-container" bind:this={container} class="container"></div>

<style>
  .container {
    height: 100%;
    width: 100%;
  }
</style>
