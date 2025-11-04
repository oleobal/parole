<script lang="ts">
  import { localized } from '../locales';
  import { timers } from '../state.svelte';
  
  let timersURL : string | null = $state(null)
  
  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
  
  $effect(() => {
    if (isOpen && timersURL === null) {
      const encodedTimers = btoa(JSON.stringify(timers))
      
      timersURL = window.location.protocol + window.location.host + window.location.pathname + window.location.search + "#"+ encodedTimers
      
    }
    else if (!isOpen) {
      timersURL = null;
    }
  })
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2 style="margin-top: 0;">{localized("share")}</h2>
      
      <div class="items">
        <p>{localized("timersURL")}</p>
        
        <div class="code">{timersURL}</div>
        
      </div>
      
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
    max-width: 600px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    gap: 10px;
    background-color: light-dark(var(--light-bg), var(--dark-bg));
  }
  
  .items {
  }
  
  .code {
    font-family:'Courier New', Courier, monospace;
    overflow: scroll;
    white-space: nowrap;
    background-color: rgba(0,0,0,0.2);
  }


</style>