<script lang="ts">
  import Button from '../elements/Button.svelte';
  import { localize } from '../locales';
  import { timers } from '../state.svelte';
  
  let timersURL : string | null = $state(null)
  
  const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><line class="cls-1" x1="6.27" y1="13.91" x2="13.91" y2="13.91"/><line class="cls-1" x1="6.27" y1="10.09" x2="13.91" y2="10.09"/><line class="cls-1" x1="6.27" y1="17.73" x2="13.91" y2="17.73"/><polygon class="cls-1" points="16.77 8.18 16.77 22.5 3.41 22.5 3.41 5.32 16.77 5.32 16.77 8.18"/><polyline class="cls-1" points="16.77 18.68 20.59 18.68 20.59 4.36 20.59 1.5 7.23 1.5 7.23 5.32"/></svg>`
  
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
      <h2 style="margin-top: 0;">{localize("share")}</h2>
      
      <div class="items">
        <p>{localize("timersURL")}</p>
        
        <div style="display: flex; gap: 10px;">
          <span class="code">{timersURL}</span>
          <Button isSquare height="2em" title={localize("copy")} onclick={() => {if (timersURL) {navigator.clipboard.writeText(timersURL);}}} htmlContents={copyIcon}/>
        </div>
        
      </div>
      
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
    font-family: monospace;
    overflow: scroll;
    white-space: nowrap;
    background-color: rgba(0,0,0,0.2);
  }


</style>