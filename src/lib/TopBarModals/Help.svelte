<script lang="ts">
  import { localized, localizedMarkdown } from '../locales';
  
  
  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2 style="margin-top: 0;">{localized("help")}</h2>
      
      {@html localizedMarkdown("helpText")}
      
      <div class="actions">
        <button onclick={() => close()}>{localized("close")}</button>
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
    min-width: 240px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    gap: 10px;
    background-color: light-dark(var(--light-bg), var(--dark-bg));
  }


</style>