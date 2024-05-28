<script lang="ts">
  import Graph from "graphology";
  import { random } from "graphology-layout";
  import Sigma from "sigma";
  import { onMount } from "svelte";
  import { addNote, newNote, notes } from "../store/notes";
  import { get } from "svelte/store";

  let container: HTMLElement;
  let createNodeModal: HTMLDialogElement;

  let noteContent: string = "";

  onMount(() => {
    // Create a graph and assign nodes with random positions
    const graph = new Graph();
    graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
    graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });

    get(notes).forEach((note) =>
      graph.addNode(`${note.date.getTime()}`, { label: `Node ${note.date.getTime()}`, size: 15, color: "red" })
    );
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
    newNote.subscribe((note) => {
      if (note) {
        const coordinates = {
          x: Math.random(),
          y: Math.random(),
        };
        graph.addNode(note.id, {
          ...coordinates,
          size: 10,
          color: "red",
          label: note.date,
        });
      }
    });

    document.addEventListener("keypress", (event) => {
      console.log("key pressed");
      if (event.key === "c") {
        createNodeModal.showModal();
      }
      console.log("should be read only ? ", !createNodeModal.open);
    });
  });
</script>

<dialog id="my_modal_1" class="modal" bind:this={createNodeModal}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">Nouvelle note</h3>
    <textarea placeholder="Note" class="textarea textarea-bordered textarea-sm w-full mt-4" bind:value={noteContent}
    ></textarea>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn" on:click={() => addNote(noteContent)}>Enregistrer</button>
      </form>
    </div>
  </div>
</dialog>

<div id="graph-container" bind:this={container} class="container"></div>

<style>
  .container {
    height: 100%;
    width: 100%;
  }
</style>
