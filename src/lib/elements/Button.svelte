<script lang="ts">
  const {
    onclick,
    contents = null,
    htmlContents = null,
    color = "light-dark(var(--light-text), var(--dark-text))",
    isSquare = false,
    title = null,
    height = null,
  } = $props();

  function buildStyleString() {
    let s = "";
    if (color) {
      s += `--color: ${color};`;
    }
    if (height) {
      s += `height: ${height};`;
      s += `--height: ${height};`;
    }
    return s;
  }
</script>

<button
  {onclick}
  style={buildStyleString()}
  class={{"squareButton":isSquare, "htmlContents": htmlContents!== null}}
  title={title}
>
  {#if contents}
    {contents}
  {:else if htmlContents}
    {@html htmlContents}
  {/if}
</button>

<style>
  button:hover {
    border-color: var(--color);
    color: var(--color);
    box-shadow: 0 0 10px 0px var(--color);
  }

  .squareButton {
    flex: none;
    aspect-ratio: 1 / 1;
    padding: calc(var(--height) * 0.18);
  }
  
  .htmlContents:hover {
    border-width: 3px;
  }
  
</style>
