<script lang="ts">
  import Button from '../elements/Button.svelte';
import { localize, localizedMarkdown } from '../locales';
  
  
  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      
      {@html localizedMarkdown("helpText")}
      
      <div class="actions">
        <Button onclick={() => close()} contents={localize("close")} />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: min(240px, 90vw);
    max-width: 800px;
    max-height: 90vh;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    gap: 10px;
    background-color: light-dark(var(--light-bg), var(--dark-bg));

    overflow-y: scroll;
  }

  .contents :global(p) { text-align: justify; }


</style>